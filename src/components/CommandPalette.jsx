import React, { useState, useEffect } from "react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";
import { LayoutDashboard, Sprout, Users, Landmark, Trophy, BarChart3, Settings, User, Search } from "lucide-react";

const PAGES = [
  { label: "Dashboard", path: "/", icon: LayoutDashboard, group: "Navigation" },
  { label: "Environmental", path: "/environmental", icon: Sprout, group: "Navigation" },
  { label: "Social", path: "/social", icon: Users, group: "Navigation" },
  { label: "Governance", path: "/governance", icon: Landmark, group: "Navigation" },
  { label: "Gamification", path: "/gamification", icon: Trophy, group: "Navigation" },
  { label: "Reports", path: "/reports", icon: BarChart3, group: "Navigation" },
  { label: "Settings", path: "/settings", icon: Settings, group: "Navigation" },
  { label: "Profile", path: "/profile", icon: User, group: "Navigation" },
];

export default function CommandPalette({ open, setOpen }) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [setOpen]);

  const go = (path) => {
    navigate(path);
    setOpen(false);
    setQuery("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="p-0 overflow-hidden max-w-xl gap-0">
        <Command shouldFilter className="rounded-2xl">
          <div className="flex items-center gap-2 px-4 border-b border-border">
            <Search className="w-4 h-4 text-muted-foreground" />
            <CommandInput
              value={query}
              onValueChange={setQuery}
              placeholder="Search pages, departments, policies..."
              className="flex h-12 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
          </div>
          <CommandList className="max-h-[320px] overflow-auto scrollbar-thin p-2">
            <CommandEmpty className="py-6 text-center text-sm text-muted-foreground">No results found.</CommandEmpty>
            <CommandGroup heading="Navigation" className="text-sm">
              {PAGES.map((p) => (
                <CommandItem
                  key={p.path}
                  value={p.label}
                  onSelect={() => go(p.path)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer aria-selected:bg-accent aria-selected:text-accent-foreground"
                >
                  <p.icon className="w-4 h-4 text-primary" />
                  <span>{p.label}</span>
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandGroup heading="Quick Actions" className="text-sm">
              <CommandItem onSelect={() => go("/reports")} className="flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer aria-selected:bg-accent">
                <BarChart3 className="w-4 h-4 text-primary" /> Generate ESG Report
              </CommandItem>
              <CommandItem onSelect={() => go("/gamification")} className="flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer aria-selected:bg-accent">
                <Trophy className="w-4 h-4 text-primary" /> View Leaderboard
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
}