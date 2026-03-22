import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface KpiCardProps {
  title: string;
  value: string;
  subtitle?: string;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  icon: React.ReactNode;
  accentColor?: "blue" | "green" | "amber" | "red" | "slate";
  delay?: number;
}

const accentMap = {
  blue:  "bg-blue-50 text-blue-600",
  green: "bg-emerald-50 text-emerald-600",
  amber: "bg-amber-50 text-amber-600",
  red:   "bg-red-50 text-red-600",
  slate: "bg-slate-100 text-slate-600",
};

export function KpiCard({ title, value, subtitle, trend, trendValue, icon, accentColor = "blue", delay = 0 }: KpiCardProps) {
  const TrendIcon = trend === "up" ? TrendingUp : trend === "down" ? TrendingDown : Minus;
  const trendColor = trend === "up" ? "text-success" : trend === "down" ? "text-destructive" : "text-muted-foreground";

  return (
    <div
      className="bg-card rounded-xl border border-border p-5 card-shadow hover:card-shadow-hover transition-all duration-300 animate-fade-in-up group"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center", accentMap[accentColor])}>
          {icon}
        </div>
        {trend && trendValue && (
          <div className={cn("flex items-center gap-1 text-xs font-medium", trendColor)}>
            <TrendIcon className="w-3 h-3" />
            {trendValue}
          </div>
        )}
      </div>
      <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">{title}</p>
      <p className="text-2xl font-bold text-foreground tracking-tight tabular-nums">{value}</p>
      {subtitle && <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>}
    </div>
  );
}
