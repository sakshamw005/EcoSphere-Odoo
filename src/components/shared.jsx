import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils";

export function GlassCard({ className, children, hover = false, ...props }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      whileHover={hover ? { y: -4, transition: { duration: 0.2 } } : undefined}
      className={cn("glass rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.06)]", className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function PageHeader({ title, subtitle, icon: Icon, actions }) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
      <div className="flex items-center gap-3">
        {Icon && (
          <div className="w-11 h-11 rounded-xl gradient-primary flex items-center justify-center text-white shadow-lg">
            <Icon className="w-5 h-5" />
          </div>
        )}
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
          {subtitle && <p className="text-sm text-muted-foreground mt-0.5">{subtitle}</p>}
        </div>
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}

export function StatChip({ label, value, tone = "default" }) {
  const tones = {
    default: "bg-muted text-muted-foreground",
    success: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400",
    warning: "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400",
    danger: "bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-400",
    info: "bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-400",
  };
  return (
    <span className={cn("inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium", tones[tone])}>
      {label}: <span className="ml-1 font-semibold">{value}</span>
    </span>
  );
}

export function ProgressBar({ value, className, tone = "primary" }) {
  const colors = {
    primary: "gradient-primary",
    accent: "gradient-accent",
    success: "bg-emerald-500",
    warning: "bg-amber-500",
    danger: "bg-red-500",
  };
  return (
    <div className={cn("h-2 w-full rounded-full bg-muted overflow-hidden", className)}>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${Math.min(value, 100)}%` }}
        transition={{ duration: 1, ease: "easeOut" }}
        className={cn("h-full rounded-full", colors[tone])}
      />
    </div>
  );
}

export function KPICard({ icon: Icon, label, value, delta, deltaTone = "success", accent = "from-emerald-500 to-green-600", children }) {
  return (
    <GlassCard hover className="p-5 relative overflow-hidden">
      <div className={cn("absolute -right-6 -top-6 w-24 h-24 rounded-full bg-gradient-to-br opacity-10 blur-2xl", accent)} />
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{label}</p>
          <p className="text-2xl font-bold mt-1.5">{value}</p>
        </div>
        <div className={cn("w-10 h-10 rounded-xl bg-gradient-to-br flex items-center justify-center text-white shadow-md", accent)}>
          {Icon && <Icon className="w-5 h-5" />}
        </div>
      </div>
      {delta !== undefined && (
        <div className="mt-3 flex items-center gap-1.5 text-xs">
          <span className={cn("font-semibold", deltaTone === "success" ? "text-emerald-600" : "text-red-500")}>
            {deltaTone === "success" ? "↑" : "↓"} {delta}
          </span>
          <span className="text-muted-foreground">vs last month</span>
        </div>
      )}
      {children}
    </GlassCard>
  );
}

export function SectionTitle({ children, action }) {
  return (
    <div className="flex items-center justify-between mb-3">
      <h3 className="font-semibold text-base">{children}</h3>
      {action}
    </div>
  );
}

export function EmptyState({ icon: Icon, title, description }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center mb-3">
        {Icon && <Icon className="w-6 h-6 text-muted-foreground" />}
      </div>
      <p className="font-medium">{title}</p>
      {description && <p className="text-sm text-muted-foreground mt-1 max-w-xs">{description}</p>}
    </div>
  );
}