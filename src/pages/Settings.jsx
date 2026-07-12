import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Settings, Building2, Tags, Flame, Gift, Bell, Palette, Save, Plus, Trash2, Sun, Moon, Leaf
} from "lucide-react";
import { GlassCard, SectionTitle, PageHeader } from "@/components/shared";
import { useTheme } from "@/components/ThemeProvider";

import { DEPARTMENTS, EMISSION_FACTORS, REWARDS } from "@/lib/demoData";
import { toast } from "sonner";

export default function SettingsPage() {
  const { theme, toggle } = useTheme();
  const [tab, setTab] = useState("organization");
  const [depts, setDepts] = useState(DEPARTMENTS);
  const [notif, setNotif] = useState({ badge: true, policy: true, challenge: true, compliance: true, csr: false, reward: true });

  const tabs = [
    { id: "organization", label: "Organization", icon: Building2 },
    { id: "categories", label: "Categories", icon: Tags },
    { id: "emissions", label: "Emission Factors", icon: Flame },
    { id: "rewards", label: "Rewards", icon: Gift },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "appearance", label: "Appearance", icon: Palette },
  ];

  const save = () => toast.success("Settings saved successfully");

  return (
    <div>
      <PageHeader
        title="Settings"
        subtitle="Configure your organization, categories, rewards, and preferences."
        icon={Settings}
        actions={<button onClick={save} className="gradient-primary text-white px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2 hover:opacity-90"><Save className="w-4 h-4" /> Save Changes</button>}
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <GlassCard className="p-3 lg:p-2 h-fit">
          <div className="flex lg:flex-col gap-1 overflow-x-auto no-scrollbar">
            {tabs.map((t) => (
              <button key={t.id} onClick={() => setTab(t.id)}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-colors w-full text-left ${tab === t.id ? "gradient-primary text-white" : "text-muted-foreground hover:bg-accent"}`}>
                <t.icon className="w-4 h-4" /> {t.label}
              </button>
            ))}
          </div>
        </GlassCard>

        <div className="lg:col-span-3">
          <GlassCard className="p-5">
            {tab === "organization" && (
              <div>
                <SectionTitle>Organization Configuration</SectionTitle>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div><label className="text-xs text-muted-foreground mb-1.5 block">Organization Name</label><input defaultValue="EcoSphere Industries" className="w-full px-3 py-2 rounded-xl border border-border bg-background text-sm outline-none focus:ring-2 focus:ring-primary/30" /></div>
                  <div><label className="text-xs text-muted-foreground mb-1.5 block">Industry</label><select className="w-full px-3 py-2 rounded-xl border border-border bg-background text-sm outline-none"><option>Manufacturing</option><option>Technology</option><option>Retail</option><option>Finance</option></select></div>
                  <div><label className="text-xs text-muted-foreground mb-1.5 block">Reporting Standard</label><select className="w-full px-3 py-2 rounded-xl border border-border bg-background text-sm outline-none"><option>GRI</option><option>SASB</option><option>TCFD</option><option>CSRD</option></select></div>
                  <div><label className="text-xs text-muted-foreground mb-1.5 block">Fiscal Year</label><select className="w-full px-3 py-2 rounded-xl border border-border bg-background text-sm outline-none"><option>Jan - Dec</option><option>Apr - Mar</option><option>Jul - Jun</option></select></div>
                </div>
                <SectionTitle>Departments</SectionTitle>
                <div className="space-y-2">
                  {depts.map((d, i) => (
                    <div key={i} className="flex items-center gap-3 p-2.5 rounded-xl border border-border">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold" style={{ background: d.color }}>{d.name.slice(0, 2).toUpperCase()}</div>
                      <input defaultValue={d.name} className="flex-1 px-2 py-1 rounded-lg border border-transparent hover:border-border bg-transparent text-sm outline-none focus:border-primary/30" />
                      <span className="text-xs text-muted-foreground">{d.employees} emp</span>
                      <button className="text-red-400 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  ))}
                  <button onClick={() => toast.success("New department added")} className="flex items-center gap-2 text-sm text-primary hover:underline mt-2"><Plus className="w-4 h-4" /> Add Department</button>
                </div>
              </div>
            )}

            {tab === "categories" && (
              <div>
                <SectionTitle>CSR Categories</SectionTitle>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                  {["Environment", "Education", "Health", "Community", "Animal Welfare", "Disaster Relief"].map((c) => (
                    <div key={c} className="flex items-center justify-between p-3 rounded-xl border border-border"><span className="text-sm">{c}</span><Tags className="w-3.5 h-3.5 text-muted-foreground" /></div>
                  ))}
                </div>
                <SectionTitle>Challenge Categories</SectionTitle>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {["Energy", "Waste", "Transport", "Community", "Wellness"].map((c) => (
                    <div key={c} className="flex items-center justify-between p-3 rounded-xl border border-border"><span className="text-sm">{c}</span><Tags className="w-3.5 h-3.5 text-muted-foreground" /></div>
                  ))}
                </div>
              </div>
            )}

            {tab === "emissions" && (
              <div>
                <SectionTitle action={<button className="text-sm text-primary hover:underline flex items-center gap-1"><Plus className="w-4 h-4" /> Add</button>}>Emission Factors</SectionTitle>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead><tr className="text-left text-xs text-muted-foreground border-b border-border"><th className="pb-2 font-medium">Activity</th><th className="pb-2 font-medium">Factor</th><th className="pb-2 font-medium">Unit</th><th className="pb-2 font-medium">Scope</th></tr></thead>
                    <tbody>
                      {EMISSION_FACTORS.map((e, i) => (
                        <tr key={i} className="border-b border-border/50 hover:bg-accent/30">
                          <td className="py-2.5 font-medium">{e.activity}</td>
                          <td className="py-2.5">{e.factor}</td>
                          <td className="py-2.5 text-muted-foreground">{e.unit}</td>
                          <td className="py-2.5"><span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-500/15 text-primary font-medium">{e.scope}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {tab === "rewards" && (
              <div>
                <SectionTitle action={<button className="text-sm text-primary hover:underline flex items-center gap-1"><Plus className="w-4 h-4" /> Add</button>}>Reward Catalog</SectionTitle>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {REWARDS.map((r, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-xl border border-border">
                      <div className="w-10 h-10 rounded-xl gradient-accent flex items-center justify-center text-white"><Gift className="w-5 h-5" /></div>
                      <div className="flex-1"><p className="text-sm font-medium">{r.name}</p><p className="text-[10px] text-muted-foreground">{r.category}</p></div>
                      <span className="text-sm font-bold text-amber-600">{r.xp_cost} XP</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {tab === "notifications" && (
              <div>
                <SectionTitle>Notification Preferences</SectionTitle>
                <div className="space-y-2">
                  {[
                    { key: "badge", label: "Badge Unlocked", desc: "When you earn a new badge" },
                    { key: "policy", label: "Policy Reminders", desc: "Acknowledgement due dates" },
                    { key: "challenge", label: "Challenge Deadlines", desc: "Upcoming challenge endings" },
                    { key: "compliance", label: "Compliance Alerts", desc: "Critical compliance issues" },
                    { key: "csr", label: "CSR Approvals", desc: "CSR activity approval requests" },
                    { key: "reward", label: "Reward Redemptions", desc: "When rewards are redeemed" },
                  ].map((n) => (
                    <div key={n.key} className="flex items-center justify-between p-3 rounded-xl border border-border">
                      <div><p className="text-sm font-medium">{n.label}</p><p className="text-[10px] text-muted-foreground">{n.desc}</p></div>
                      <button onClick={() => setNotif({ ...notif, [n.key]: !notif[n.key] })}
                        className={`w-11 h-6 rounded-full transition-colors relative ${notif[n.key] ? "gradient-primary" : "bg-muted"}`}>
                        <motion.div animate={{ x: notif[n.key] ? 22 : 2 }} className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {tab === "appearance" && (
              <div>
                <SectionTitle>Theme & Appearance</SectionTitle>
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {[{ id: "light", label: "Light", icon: Sun }, { id: "dark", label: "Dark", icon: Moon }].map((t) => (
                    <button key={t.id} onClick={() => { if (theme !== t.id) toggle(); }}
                      className={`p-4 rounded-xl border-2 transition-all ${theme === t.id ? "border-primary bg-emerald-500/5" : "border-border hover:bg-accent/30"}`}>
                      <t.icon className="w-6 h-6 mx-auto mb-2" />
                      <p className="text-sm font-medium">{t.label}</p>
                    </button>
                  ))}
                </div>
                <SectionTitle>Accent Color</SectionTitle>
                <div className="flex gap-3">
                  {["#1B5E20", "#43A047", "#00C853", "#0EA5E9", "#8B5CF6", "#EC4899"].map((c) => (
                    <button key={c} className="w-10 h-10 rounded-xl ring-2 ring-offset-2 ring-transparent hover:ring-border" style={{ background: c }} />
                  ))}
                </div>
              </div>
            )}
          </GlassCard>
        </div>
      </div>
    </div>
  );
}