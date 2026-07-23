import Script from "next/script";

/**
 * Analytics module.
 *
 * Providers are enabled by setting the corresponding environment variable
 * (see .env.example). With no variables set, this module renders nothing —
 * safe to keep mounted from day one.
 */
export const analyticsConfig = {
  googleAnalyticsId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
  microsoftClarityId: process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID,
};

function GoogleAnalytics({ id }: { id: string }) {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${id}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${id}');
        `}
      </Script>
    </>
  );
}

function MicrosoftClarity({ id }: { id: string }) {
  return (
    <Script id="microsoft-clarity" strategy="afterInteractive">
      {`
        (function(c,l,a,r,i,t,y){
          c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "${id}");
      `}
    </Script>
  );
}

export function Analytics() {
  const { googleAnalyticsId, microsoftClarityId } = analyticsConfig;

  return (
    <>
      {googleAnalyticsId && <GoogleAnalytics id={googleAnalyticsId} />}
      {microsoftClarityId && <MicrosoftClarity id={microsoftClarityId} />}
    </>
  );
}
