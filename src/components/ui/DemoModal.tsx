"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Monitor, Smartphone, X } from "lucide-react";
import { cn } from "@/lib/utils";

type DeviceMode = "desktop" | "mobile";

interface DemoModalProps {
  open: boolean;
  onClose: () => void;
  url: string;
  mobileUrl: string;
  title: string;
}

const modeButton =
  "flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors duration-300";

export function DemoModal({ open, ...dialogProps }: DemoModalProps) {
  return (
    <AnimatePresence>
      {open && <DemoDialog {...dialogProps} />}
    </AnimatePresence>
  );
}

function DemoDialog({
  onClose,
  url,
  mobileUrl,
  title,
}: Omit<DemoModalProps, "open">) {
  // Mounted fresh on every open — visitors on a phone start in mobile mode.
  const [mode, setMode] = useState<DeviceMode>(() =>
    window.matchMedia("(max-width: 767px)").matches ? "mobile" : "desktop"
  );

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-2 md:p-5">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />

      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={`${title} — interactive demo`}
        initial={{ opacity: 0, scale: 0.97, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97, y: 16 }}
        transition={{ duration: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="relative flex h-full w-full max-w-[1700px] flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-soft-lg"
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-3 md:px-6">
          <p className="min-w-0 truncate text-sm font-semibold text-body">
            {title}
            <span className="ml-2 hidden text-xs font-normal text-muted sm:inline">
              Interactive demo
            </span>
          </p>

          <div className="hidden items-center rounded-full border border-line p-1 md:flex">
            <button
              type="button"
              onClick={() => setMode("desktop")}
              className={cn(
                modeButton,
                mode === "desktop"
                  ? "bg-accent text-white"
                  : "text-muted hover:text-heading"
              )}
            >
              <Monitor className="size-3.5" strokeWidth={1.75} />
              Desktop
            </button>
            <button
              type="button"
              onClick={() => setMode("mobile")}
              className={cn(
                modeButton,
                mode === "mobile"
                  ? "bg-accent text-white"
                  : "text-muted hover:text-heading"
              )}
            >
              <Smartphone className="size-3.5" strokeWidth={1.75} />
              Mobile
            </button>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close demo"
            className="flex size-8 items-center justify-center rounded-full text-muted transition-colors duration-300 hover:bg-accent-soft hover:text-heading"
          >
            <X className="size-4" strokeWidth={1.75} />
          </button>
        </div>

        {/* Stage */}
        <div className="flex flex-1 justify-center overflow-hidden bg-background p-2 md:p-4">
          <div
            className={cn(
              "h-full overflow-hidden bg-white transition-all duration-500",
              mode === "mobile"
                ? "w-full rounded-xl border border-line md:w-[390px] md:rounded-[2rem] md:border-8 md:border-body/90 md:shadow-soft-lg"
                : "w-full rounded-xl border border-line"
            )}
          >
            <iframe
              src={mode === "mobile" ? mobileUrl : url}
              title={`${title} — interactive demo (${mode})`}
              className="h-full w-full"
              loading="lazy"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
