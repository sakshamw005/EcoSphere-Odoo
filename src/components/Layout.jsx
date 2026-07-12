import React, { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, Sprout, Users, Landmark, Trophy, BarChart3, Settings, User,
  Search, Bell, Plus, Sun, Moon, Command, Leaf, Menu, X, LogOut, CheckCheck,
  AlertTriangle, Award, Calendar, ShieldCheck, Gift, Heart
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useTheme } from "@/components/ThemeProvider";
import CommandPalette from "@/components/CommandPalette";
import { NOTIFICATIONS_DEMO } from "@/lib/demoData";
import { cn } from "@/utils";

const NAV = [
  { label: "Dashboard", path: "/", icon: LayoutDashboard },
  { label: "Environmental", path: "/environmental", icon: Sprout },
  { label: "Social", path: "/social", icon: Users },
  { label: "Governance", path: "/governance", icon: Landmark },
  { label: "Gamification", path: "/gamification", icon: Trophy },
  { label: "Reports", path: "/reports", icon: BarChart3 },
  { label: "Settings", path: "/settings", icon: Settings },
  { label: "Profile", path: "/profile", icon: User },
];

const NOTIF_ICONS = {
  badge: Award, policy: ShieldCheck, challenge: Calendar,
  compliance: AlertTriangle, csr: Heart, reward: Gift, system: Bell,
};

function Sidebar({ mobileOpen, setMobileOpen }) {
  return (
    <>
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 bg-black/40 z-40 lg:hidden backdrop-blur-sm"
          />
        )}
      </AnimatePresence>
      <motion.aside
        initial={false}
        className={cn(
          "fixed lg:sticky top-0 left-0 h-screen w-64 z-50 flex flex-col glass-strong border-r border-border transition-transform duration-300",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex items-center gap-2.5 px-5 h-16 border-b border-border">
          <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center shadow-lg">
            <Leaf className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="font-heading font-bold text-lg leading-none">EcoSphere</p>
            <p className="text-[10px] text-muted-foreground tracking-wide uppercase">ESG Platform</p>
          </div>
          <button className="ml-auto lg:hidden" onClick={() => setMobileOpen(false)}>
            <X className="w-5 h-5" />
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto scrollbar-thin px-3 py-4 space-y-1">
          {NAV.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group relative",
                  isActive
                    ? "gradient-primary text-white shadow-md"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )
              }
            >
              {({ isActive }) => (
                <>
                  <item.icon className="w-[18px] h-[18px]" />
                  <span>{item.label}</span>
                  {isActive && (
                    <motion.div layoutId="navIndicator" className="ml-auto w-1.5 h-1.5 rounded-full bg-white" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>
        <div className="p-3 border-t border-border">
          <div className="rounded-xl bg-gradient-to-br from-emerald-500/10 to-green-600/10 p-3">
            <p className="text-xs font-semibold">ESG Score</p>
            <p className="text-2xl font-bold text-gradient">78<span className="text-sm text-muted-foreground">/100</span></p>
            <div className="h-1.5 rounded-full bg-muted mt-1.5 overflow-hidden">
              <div className="h-full gradient-primary rounded-full" style={{ width: "78%" }} />
            </div>
          </div>
        </div>
      </motion.aside>
    </>
  );
}

function NotificationsPanel() {
  const [items, setItems] = useState(NOTIFICATIONS_DEMO);
  const unread = items.filter((n) => !n.read).length;
  const markAll = () => setItems((prev) => prev.map((n) => ({ ...n, read: true })));
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="relative w-9 h-9 rounded-xl hover:bg-accent flex items-center justify-center transition-colors">
          <Bell className="w-[18px] h-[18px]" />
          {unread > 0 && (
            <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-red-500 text-white text-[9px] font-bold flex items-center justify-center">
              {unread}
            </span>
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80 p-0 rounded-2xl">
        <div className="flex items-center justify-between px-4 py-3 border-b border-border">
          <p className="font-semibold text-sm">Notifications</p>
          <button onClick={markAll} className="text-xs text-primary flex items-center gap-1 hover:underline">
            <CheckCheck className="w-3 h-3" /> Mark all read
          </button>
        </div>
        <div className="max-h-80 overflow-y-auto scrollbar-thin">
          {items.map((n, i) => {
            const Icon = NOTIF_ICONS[n.type] || Bell;
            return (
              <div key={i} className={cn("flex gap-3 px-4 py-3 border-b border-border/50 hover:bg-accent/50 transition-colors", !n.read && "bg-emerald-500/5")}>
                <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-500/15 flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium leading-tight">{n.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{n.message}</p>
                  <p className="text-[10px] text-muted-foreground mt-1">{n.time}</p>
                </div>
                {!n.read && <span className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 shrink-0" />}
              </div>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default function Layout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const { theme, toggle } = useTheme();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex bg-background">
      <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-30 h-16 glass-strong border-b border-border flex items-center gap-3 px-4 lg:px-6">
          <button className="lg:hidden" onClick={() => setMobileOpen(true)}>
            <Menu className="w-5 h-5" />
          </button>
          <button
            onClick={() => setPaletteOpen(true)}
            className="flex items-center gap-2 h-9 px-3 rounded-xl bg-muted/60 hover:bg-muted text-sm text-muted-foreground w-full max-w-xs transition-colors"
          >
            <Search className="w-4 h-4" />
            <span>Search...</span>
            <kbd className="ml-auto flex items-center gap-0.5 text-[10px] bg-background border border-border rounded px-1.5 py-0.5">
              <Command className="w-2.5 h-2.5" />K
            </kbd>
          </button>
          <div className="ml-auto flex items-center gap-1.5">
            <Button size="sm" className="gradient-primary text-white hidden sm:flex gap-1.5 rounded-xl" onClick={() => navigate("/reports")}>
              <Plus className="w-4 h-4" /> Quick Add
            </Button>
            <button onClick={() => setPaletteOpen(true)} className="w-9 h-9 rounded-xl hover:bg-accent flex items-center justify-center transition-colors sm:hidden">
              <Search className="w-[18px] h-[18px]" />
            </button>
            <button onClick={toggle} className="w-9 h-9 rounded-xl hover:bg-accent flex items-center justify-center transition-colors">
              <AnimatePresence mode="wait" initial={false}>
                {theme === "dark" ? (
                  <motion.div key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                    <Sun className="w-[18px] h-[18px]" />
                  </motion.div>
                ) : (
                  <motion.div key="moon" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                    <Moon className="w-[18px] h-[18px]" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
            <NotificationsPanel />
            <button onClick={() => navigate("/profile")} className="ml-1">
              <Avatar className="w-9 h-9 ring-2 ring-border">
                <AvatarFallback className="gradient-primary text-white text-xs font-semibold">AD</AvatarFallback>
              </Avatar>
            </button>
          </div>
        </header>
        <main className="flex-1 p-4 lg:p-6 max-w-[1600px] w-full mx-auto">
          <Outlet />
        </main>
      </div>
      <CommandPalette open={paletteOpen} setOpen={setPaletteOpen} />
    </div>
  );
}