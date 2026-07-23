import Image from "next/image";
import { Play } from "lucide-react";
import dashboardShot from "@/assets/dashboard-preview.png";

interface DashboardPreviewProps {
  onLaunch?: () => void;
}

export function DashboardPreview({ onLaunch }: DashboardPreviewProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-surface shadow-soft-lg">
      {/* Window chrome */}
      <div className="flex items-center gap-2 border-b border-line px-5 py-3.5">
        <span className="size-2.5 rounded-full bg-line" />
        <span className="size-2.5 rounded-full bg-line" />
        <span className="size-2.5 rounded-full bg-line" />
        <span className="ml-3 text-xs text-muted">
          northwind-distribution-analytics — Executive Dashboard
        </span>
      </div>

      <button
        type="button"
        onClick={onLaunch}
        aria-label="Launch interactive demo"
        className="group relative block w-full cursor-pointer"
      >
        <Image
          src={dashboardShot}
          alt="NorthWind Distribution Analytics — executive dashboard rendered entirely as HTML from a single DAX measure"
          className="w-full"
          sizes="(max-width: 1152px) 100vw, 1152px"
          placeholder="blur"
          priority={false}
        />
        <span className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/30">
          <span className="flex translate-y-2 items-center gap-2 rounded-full bg-surface px-5 py-2.5 text-sm font-medium text-body opacity-0 shadow-soft-lg transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <Play className="size-4 text-accent" strokeWidth={1.75} />
            Launch Interactive Demo
          </span>
        </span>
      </button>
    </div>
  );
}
