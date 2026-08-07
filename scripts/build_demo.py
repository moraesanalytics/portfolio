"""Rebuild the NorthWind HTML dashboards as standalone demo pages.

Replicates what the 'HTML Page' / 'HTML Page Mobile' DAX measures do inside
Power BI: builds the JSON payload from the source data and injects it into
the HTML template extracted from each measure. Also injects HTML slicers
(Category, Sales Channel, Year/Month) equivalent to the native Power BI ones.

Usage:  python scripts/build_demo.py [path-to-NDA-repo]
Output: public/demo/index.html  and  public/demo/mobile/index.html
"""

import json
import re
import sys
from pathlib import Path

import pandas as pd

ROOT = Path(__file__).resolve().parent.parent
NDA = Path(sys.argv[1]) if len(sys.argv) > 1 else Path(
    r"C:\NDA\northwind-distribution-analytics-main"
)
MEASURES = NDA / "powerbi" / "HTML Measures"
XLSX = NDA / "data" / "NorthWind_DataBase.xlsx"

MONTH_SHORT = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
               "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

# ---------------------------------------------------------------- payload
def build_payload() -> str:
    sheets = pd.read_excel(
        XLSX,
        sheet_name=["Products", "Warehouses", "SalesHeader", "SalesRep",
                    "Customers", "SalesItems"],
    )
    products = sheets["Products"]
    header = sheets["SalesHeader"]
    items = sheets["SalesItems"]

    facts = items.merge(header, on="SaleID").merge(
        products[["ProductID", "UnitCost"]], on="ProductID"
    )
    facts["Date"] = pd.to_datetime(facts["Date"])
    facts["ymd"] = (facts["Date"].dt.year * 10000
                    + facts["Date"].dt.month * 100
                    + facts["Date"].dt.day)
    # Net Sales = Gross - Gross * Discount/100 ; Cost = Quantity * UnitCost
    facts["sales"] = (facts["Quantity"] * facts["UnitPrice"]
                      * (1 - facts["Discount"] / 100))
    facts["cost"] = facts["Quantity"] * facts["UnitCost"]
    facts = facts.sort_values("SaleItemID")

    f_str = "|".join(
        f"{r.ymd},{r.ProductID},{r.CustomerID},{r.SalesRepID},{r.WarehouseID},"
        f"{r.sales:.2f},{r.cost:.2f},{r.Quantity},{r.SaleID},"
        f"{r.SalesChannel},{r.PaymentMethod}"
        for r in facts.itertuples()
    )

    clean = lambda s: str(s).replace('"', "'")
    P = [[int(r.ProductID), clean(r.ProductName), clean(r.Category), clean(r.Brand)]
         for r in products.itertuples()]
    C = [[int(r.CustomerID), clean(r.CustomerName), clean(r.Segment)]
         for r in sheets["Customers"].itertuples()]
    R = [[int(r.SalesRepID), clean(r.SalesRepName)]
         for r in sheets["SalesRep"].itertuples()]
    W = [[int(r.WarehouseID), clean(r.WarehouseName)]
         for r in sheets["Warehouses"].itertuples()]

    dates = pd.to_datetime(header["Date"])
    months = sorted({(d.year, d.month) for d in dates})
    M = [[y * 100 + m, MONTH_SHORT[m - 1], y] for y, m in months]
    B = [y * 100 + m for y, m in months]
    gmax = dates.max()
    g = gmax.year * 10000 + gmax.month * 100 + gmax.day

    print(f"payload: {len(facts)} fact rows, {len(M)} months")
    return json.dumps(
        {"f": f_str, "P": P, "C": C, "R": R, "W": W, "M": M, "B": B, "g": g},
        separators=(",", ":"), ensure_ascii=False,
    )

# ------------------------------------------------------------- slicers
# The visuals reserve .pg-slot for Power BI's native slicers, which don't
# exist standalone. This script is injected inside boot()'s closure so it
# drives SEL/BASE + renderAll() directly.
SLICERS = r"""
/* ---------- external slicers (standalone demo only) ---------- */
(function(){
  var slot=document.querySelector('.pg-slot');
  if(!slot) return;
  slot.style.display='flex';slot.style.justifyContent='flex-end';
  slot.style.alignItems='center';slot.style.gap='10px';slot.style.flexWrap='wrap';

  var catKeys=(function(){var o={};(D.P||[]).forEach(function(p){o[p[2]]=1;});return Object.keys(o).sort();})();
  var chanKeys=(function(){var o={};F.forEach(function(r){o[r[CHN]]=1;});return Object.keys(o).sort();})();
  var mSel={};

  function setBase(keys){
    var ks=keys.length?keys:MONTHS.map(function(m){return m.k;});
    BASE={};ks.forEach(function(k){BASE[k]=1;});
    BASEK=ks.slice().sort(function(a,b){return a-b;});
    INBASE=F.filter(function(r){return BASE[ym(r)];});
    renderAll();
  }

  function mkSlicer(label,render,onPick,summary){
    var el=document.createElement('div');el.className='slc';
    el.innerHTML="<button type='button' class='slc-btn'><b>"+label+"</b><s></s><i>▾</i></button><div class='slc-pop'></div>";
    var btn=el.querySelector('.slc-btn'),pop=el.querySelector('.slc-pop');
    btn.addEventListener('click',function(e){
      e.stopPropagation();
      var was=el.classList.contains('open');
      document.querySelectorAll('.slc.open').forEach(function(s){s.classList.remove('open');});
      if(!was){render(pop);el.classList.add('open');}
    });
    pop.addEventListener('click',function(e){e.stopPropagation();onPick(e,pop);});
    el.update=function(){btn.querySelector('s').textContent=summary();};
    el.update();
    slot.appendChild(el);
    return el;
  }

  function checklist(pop,keys,sel,fmt){
    var all=!cnt(sel);
    var h="<div class='slc-it' data-k='*'><span class='slc-cb"+(all?" on":"")+"'></span>All</div>";
    keys.forEach(function(k){
      h+="<div class='slc-it' data-k='"+String(k).replace(/'/g,'&#39;')+"'><span class='slc-cb"+(sel[k]?" on":"")+"'></span>"+(fmt?fmt(k):k)+"</div>";
    });
    pop.innerHTML=h;
  }
  function pickFrom(e,sel){
    var it=e.target.closest('.slc-it');if(!it)return false;
    var k=it.getAttribute('data-k');
    if(k==='*'){for(var x in sel)delete sel[x];}
    else if(sel[k])delete sel[k];else sel[k]=1;
    return true;
  }
  function sum(sel,total){var n=cnt(sel);return (!n||n===total)?'All':n+' selected';}

  var sCat=mkSlicer('Category',
    function(pop){checklist(pop,catKeys,SEL.Category);},
    function(e,pop){if(pickFrom(e,SEL.Category)){renderAll();checklist(pop,catKeys,SEL.Category);refresh();}},
    function(){return sum(SEL.Category,catKeys.length);});

  var sChan=mkSlicer('Sales Channel',
    function(pop){checklist(pop,chanKeys,SEL.Channel);},
    function(e,pop){if(pickFrom(e,SEL.Channel)){renderAll();checklist(pop,chanKeys,SEL.Channel);refresh();}},
    function(){return sum(SEL.Channel,chanKeys.length);});

  function yearMonths(y){return MONTHS.filter(function(m){return m.y===y;});}
  function renderMonths(pop){
    var h="<div class='slc-it' data-k='*'><span class='slc-cb"+(!cnt(mSel)?" on":"")+"'></span>All</div>",py=null;
    MONTHS.forEach(function(m){
      if(m.y!==py){
        py=m.y;
        var yrAll=yearMonths(m.y).every(function(x){return mSel[x.k];});
        h+="<div class='slc-it slc-yri' data-y='"+m.y+"'><span class='slc-cb"+(yrAll?" on":"")+"'></span><b>"+m.y+"</b></div>";
      }
      h+="<div class='slc-it slc-mi' data-k='"+m.k+"'><span class='slc-cb"+(mSel[m.k]?" on":"")+"'></span>"+m.m+"</div>";
    });
    pop.innerHTML=h;
  }
  var sMon=mkSlicer('Year / Month',
    renderMonths,
    function(e,pop){
      var it=e.target.closest('.slc-it');if(!it)return;
      var y=it.getAttribute('data-y');
      if(y){
        // year row toggles every month of that year at once
        var ms=yearMonths(+y);
        var all=ms.every(function(m){return mSel[m.k];});
        ms.forEach(function(m){if(all)delete mSel[m.k];else mSel[m.k]=1;});
      }else if(!pickFrom(e,mSel)){
        return;
      }
      setBase(Object.keys(mSel).map(Number));renderMonths(pop);refresh();
    },
    function(){return cnt(mSel)?cnt(mSel)+' selected':'All';});

  function refresh(){sCat.update();sChan.update();sMon.update();}
  document.addEventListener('click',function(){
    document.querySelectorAll('.slc.open').forEach(function(s){s.classList.remove('open');});
    setTimeout(refresh,60);
  });
})();
"""

SLICER_CSS = """
.slc{position:relative;font-family:'Segoe UI',system-ui,sans-serif}
.slc-btn{display:flex;align-items:center;gap:7px;background:#fff;border:1px solid #E9EDF3;border-radius:10px;padding:8px 12px;font-size:12px;color:#0F172A;cursor:pointer;box-shadow:0 2px 8px rgba(15,23,42,.05);white-space:nowrap}
.slc-btn b{font-weight:600}
.slc-btn s{text-decoration:none;color:#94A3B8}
.slc-btn i{font-style:normal;color:#94A3B8;font-size:10px}
.slc-pop{position:absolute;top:calc(100% + 6px);right:0;z-index:99;min-width:190px;max-height:300px;overflow:auto;background:#fff;border:1px solid #E9EDF3;border-radius:12px;box-shadow:0 12px 32px rgba(15,23,42,.14);padding:7px;display:none}
.slc.open .slc-pop{display:block}
.slc-it{display:flex;align-items:center;gap:9px;padding:6px 9px;border-radius:8px;font-size:12px;color:#0F172A;cursor:pointer;user-select:none}
.slc-it:hover{background:#F4F6FA}
.slc-cb{width:14px;height:14px;flex:none;border:1.5px solid #CBD5E1;border-radius:4px;background:#fff}
.slc-cb.on{background:#6366F1;border-color:#6366F1;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='4' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M20 6 9 17l-5-5'/%3E%3C/svg%3E");background-size:10px;background-position:center;background-repeat:no-repeat}
.slc-it.slc-yri{margin-top:3px;border-top:1px solid #F1F5F9;padding-top:7px}
.slc-it.slc-yri b{font-size:11px;font-weight:700;color:#475569;letter-spacing:.04em}
.slc-it.slc-mi{margin-left:14px}
"""

# The desktop page targets a fixed 1600px-wide Power BI visual: scale to fit.
DESKTOP_SHIM = f"""
<style>
html{{overflow-x:hidden!important;overflow-y:auto!important;background:#F8FAFC!important}}
body{{overflow:hidden!important;background:#F8FAFC!important}}
.pg{{width:1600px!important;transform-origin:top left}}
{SLICER_CSS}
</style>
<script>
(function(){{
  function fit(){{
    var pg=document.querySelector('.pg');
    if(!pg)return;
    var s=Math.min(1,document.documentElement.clientWidth/1600);
    pg.style.transform='scale('+s+')';
    document.body.style.height=(pg.scrollHeight*s)+'px';
  }}
  window.addEventListener('resize',fit);
  window.addEventListener('load',function(){{fit();setTimeout(fit,600);}});
  fit();
}})();
</script>
"""

# The mobile page is a fluid single-column layout (~400px design): no scaling
# needed, just restore scrolling and cap the width when opened on wide screens.
MOBILE_SHIM = f"""
<style>
html{{overflow-x:hidden!important;overflow-y:auto!important;background:#F8FAFC!important}}
body{{overflow:visible!important;background:#F8FAFC!important}}
.pg{{max-width:480px;margin:0 auto}}
/* keep the three slicers on a single centered row */
.pg-slot{{height:auto!important;padding:2px 0;justify-content:center!important;flex-wrap:nowrap!important;gap:6px!important}}
{SLICER_CSS}
.slc-btn{{padding:5px 8px;font-size:10px;gap:4px;border-radius:8px}}
.slc-btn i{{font-size:9px}}
.slc-pop{{max-height:260px}}
</style>
"""

INJECT_ANCHOR = "renderAll();\n}\nif(document.readyState"


def build_page(dax_name: str, out_rel: str, shim: str, payload: str) -> None:
    dax = (MEASURES / dax_name).read_text(encoding="utf-8")
    # The template literal starts at the final RETURN's opening quote.
    tpl = dax[dax.index('"<!DOCTYPE') + 1:]
    tpl = tpl[: tpl.rindex('"')]

    before, after = re.split(r'"\s*&\s*payload\s*&\s*"', tpl)
    html = (before + payload + after).replace('""', '"').replace("\r\n", "\n")

    assert INJECT_ANCHOR in html, f"{dax_name}: boot renderAll anchor not found"
    html = html.replace(INJECT_ANCHOR, SLICERS + "\n" + INJECT_ANCHOR)
    html = html.replace("</body>", shim + "</body>")

    out = ROOT / out_rel
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(html, encoding="utf-8")
    print(f"{dax_name} -> {out_rel} ({len(html):,} chars)")


if __name__ == "__main__":
    payload = build_payload()
    build_page("HTML Page.dax", "public/demo/index.html", DESKTOP_SHIM, payload)
    build_page("HTML Page Mobile.dax", "public/demo/mobile/index.html", MOBILE_SHIM, payload)
