import { cn } from "@/lib/utils";
import { ITicketStatus } from "@/interfaces/ticket";
import {
  AlertCircle,
  CheckCircle2,
  Timer,
  PauseCircle,
  XCircle,
  Boxes,
} from "lucide-react";
import { Card } from "./ui/card";
import { useState } from "react";

interface StatusCardProps {
  status: ITicketStatus | "TOTAL";
  count: number;
  total: number;
  className?: string;
}

const statusConfig = {
  OPEN: {
    icon: AlertCircle,
    color: "text-blue-400",
    bgColor: "bg-blue-950/50",
    borderColor: "border-blue-800",
    hoverBg: "hover:bg-blue-900/50",
    glowColor: "rgba(59, 130, 246, 0.5)",
  },
  PROGRESS: {
    icon: Timer,
    color: "text-amber-400",
    bgColor: "bg-amber-950/50",
    borderColor: "border-amber-800",
    hoverBg: "hover:bg-amber-900/50",
    glowColor: "rgba(245, 158, 11, 0.5)",
  },
  RESOLVED: {
    icon: CheckCircle2,
    color: "text-green-400",
    bgColor: "bg-green-950/50",
    borderColor: "border-green-800",
    hoverBg: "hover:bg-green-900/50",
    glowColor: "rgba(34, 197, 94, 0.5)",
  },
  CLOSED: {
    icon: XCircle,
    color: "text-slate-400",
    bgColor: "bg-slate-950/50",
    borderColor: "border-slate-800",
    hoverBg: "hover:bg-slate-900/50",
    glowColor: "rgba(148, 163, 184, 0.5)",
  },
  HOLD: {
    icon: PauseCircle,
    color: "text-purple-400",
    bgColor: "bg-purple-950/50",
    borderColor: "border-purple-800",
    hoverBg: "hover:bg-purple-900/50",
    glowColor: "rgba(168, 85, 247, 0.5)",
  },
  TOTAL: {
    icon: Boxes,
    color: "text-indigo-400",
    bgColor: "bg-indigo-950/50",
    borderColor: "border-indigo-800",
    hoverBg: "hover:bg-indigo-900/50",
    glowColor: "rgba(129, 140, 248, 0.5)",
  },
};

export function StatusCard({
  status,
  count,
  total,
  className,
}: StatusCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const config = statusConfig[status];
  const percentage =
    status === "TOTAL"
      ? 100
      : total === 0
      ? (0.0).toFixed(1)
      : ((count / total) * 100).toFixed(1);
  const Icon = config.icon;

  return (
    <Card
      className={cn(
        "relative overflow-hidden transition-all duration-300",
        "border backdrop-blur-sm animate-border-glow",
        "transform hover:scale-105 hover:-translate-y-1",
        config.borderColor,
        config.bgColor,
        config.hoverBg,
        className
      )}
      style={{ "--glow-color": config.glowColor } as React.CSSProperties}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <p className={cn("text-sm font-medium", config.color)}>{status}</p>
          <Icon className={cn("h-5 w-5", config.color)} />
        </div>
        <div className="space-y-2">
          <h3 className="text-3xl font-bold text-white transition-opacity duration-300">
            {isHovered && status !== "TOTAL" ? `${percentage}%` : count}
          </h3>
        </div>
      </div>
    </Card>
  );
}
