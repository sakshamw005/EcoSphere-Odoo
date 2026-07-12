import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  AreaChart, Area, LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadialBarChart, RadialBar, Legend
} from "recharts";
import {
  Sprout, Users, Landmark, Trophy, Leaf, TrendingUp, TrendingDown, Award,
  Bell, Cloud, Sun, Droplets, Wind, ArrowRight, Sparkles, Target, Zap,
  Flame, TreePine, Bike, Lightbulb, ShieldCheck, AlertTriangle, Heart
} from "lucide-react";
import { GlassCard, KPICard, ProgressBar, SectionTitle, PageHeader } from "@/components/shared";

import {
  KPIS, ESG_TREND, CARBON_BY_DEPT, EMISSIONS_MONTHLY, DEPARTMENTS,
  LEADERBOARD, COMPLIANCE_ISSUES, CSR_ACTIVITIES, AI_INSIGHTS, GOALS, RADAR_DATA
} from "@/lib/demoData";
import { useNavigate } from "react-router-dom";
import { db } from "@/api/authClient";

const ESG_RING = [{ name: "ESG", value: 78, fill: "#1B5E20" }];

function ScoreRing() {
  return (
    <div className="relative w-44 h-44 mx-auto">
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart innerRadius="72%" outerRadius="100%" data={ESG_RING} startAngle={90} endAngle={-270}>
          <RadialBar background dataKey="value" cornerRadius={20} fill="#1B5E20" />
        </RadialBarChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span
          initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.3, type: "spring" }}
          className="text-4xl font-bold text-gradient"
        >78</motion.span>
        <span className="text-xs text-muted-foreground">ESG Score</span>
        <span className="text-[10px] text-emerald-600 font-semibold mt-0.5">↑ 4 this month</span>
      </div>
    </div>
  );
}

const AI_ICONS = { TrendingUp, Award, Users, ShieldCheck, AlertTriangle };
const QUICK_ACTIONS = [
  { label: "Log Emission", icon: Flame, color: "from-orange-500 to-red-500" },
  { label: "Add CSR", icon: Heart, color: "from-pink-500 to-rose-500" },
  { label: "New Policy", icon: ShieldCheck, color: "from-blue-500 to-indigo-500" },
  { label: "Create Challenge", icon: Trophy, color: "from-emerald-500 to-green-600" },
];
export default function Dashboard() {
  const navigate = useNavigate();
  const [csr, setCsr] = useState(CSR_ACTIVITIES.slice(0, 4));

  useEffect(() => {
    db.entities.CSRActivity.list("-date", 4)
      .then((d) => d.length && setCsr(d.slice(0, 4)))
      .catch(() => {});
  }, []);

  return (
    <div>
      <PageHeader
        title="Dashboard"
        subtitle="Welcome back, Admin — here's your organization's ESG pulse today."
        icon={Sprout}
        actions={
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-sm font-medium">
            <Sparkles className="w-4 h-4" /> All systems healthy
          </div>
        }
      />

      {/* KPI Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <KPICard icon={Leaf} label="Overall ESG" value="78 / 100" delta="4 pts" accent="from-emerald-500 to-green-700" />
        <KPICard icon={TrendingDown} label="Carbon Saved" value="1,240 t" delta="8.2%" accent="from-teal-500 to-emerald-600" />
        <KPICard icon={Users} label="Engaged Employees" value="86%" delta="12%" accent="from-lime-500 to-green-600" />
        <KPICard icon={ShieldCheck} label="Compliance" value="94%" delta="3 pts" deltaTone="success" accent="from-green-500 to-emerald-700" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        {/* ESG Score + Trend */}
        <GlassCard className="p-5 lg:col-span-2">
          <SectionTitle action={<button onClick={() => navigate("/reports")} className="text-xs text-primary hover:underline flex items-center gap-1">View report <ArrowRight className="w-3 h-3" /></button>}>
            Monthly ESG Trend
          </SectionTitle>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={ESG_TREND}>
              <defs>
                <linearGradient id="gOverall" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1B5E20" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#1B5E20" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gEnv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00C853" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#00C853" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} domain={[60, 100]} />
              <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid hsl(var(--border))", background: "hsl(var(--card))", fontSize: 12 }} />
              <Area type="monotone" dataKey="overall" stroke="#1B5E20" strokeWidth={2.5} fill="url(#gOverall)" name="Overall" />
              <Area type="monotone" dataKey="environmental" stroke="#00C853" strokeWidth={2} fill="url(#gEnv)" name="Environmental" />
              <Area type="monotone" dataKey="social" stroke="#43A047" strokeWidth={1.5} fill="none" name="Social" />
            </AreaChart>
          </ResponsiveContainer>
        </GlassCard>

        {/* Score Ring + breakdown */}
        <GlassCard className="p-5">
          <SectionTitle>ESG Score</SectionTitle>
          <ScoreRing />
          <div className="space-y-2.5 mt-4">
            {[
              { label: "Environmental", val: 78, color: "bg-emerald-500" },
              { label: "Social", val: 84, color: "bg-green-500" },
              { label: "Governance", val: 85, color: "bg-teal-500" },
            ].map((s) => (
              <div key={s.label}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-muted-foreground">{s.label}</span>
                  <span className="font-semibold">{s.val}</span>
                </div>
                <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${s.val}%` }} transition={{ duration: 1 }} className={`h-full rounded-full ${s.color}`} />
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* Carbon + Departments */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <GlassCard className="p-5">
          <SectionTitle action={<button onClick={() => navigate("/environmental")} className="text-xs text-primary hover:underline">Details</button>}>Carbon by Department</SectionTitle>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={CARBON_BY_DEPT} dataKey="value" innerRadius={50} outerRadius={85} paddingAngle={3}>
                {CARBON_BY_DEPT.map((d, i) => <Cell key={i} fill={d.color} />)}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid hsl(var(--border))", background: "hsl(var(--card))", fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1.5 mt-2">
            {CARBON_BY_DEPT.map((d) => (
              <div key={d.name} className="flex items-center gap-2 text-xs">
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: d.color }} />
                <span className="text-muted-foreground flex-1">{d.name}</span>
                <span className="font-semibold">{d.value} t</span>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="p-5 lg:col-span-2">
          <SectionTitle action={<button onClick={() => navigate("/environmental")} className="text-xs text-primary hover:underline">View all</button>}>Emissions vs Offset</SectionTitle>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={EMISSIONS_MONTHLY} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid hsl(var(--border))", background: "hsl(var(--card))", fontSize: 12 }} />
              <Bar dataKey="emissions" fill="#DC2626" radius={[6, 6, 0, 0]} name="Emissions (t)" />
              <Bar dataKey="offset" fill="#16A34A" radius={[6, 6, 0, 0]} name="Offset (t)" />
            </BarChart>
          </ResponsiveContainer>
        </GlassCard>
      </div>

      {/* Department Rankings */}
      <GlassCard className="p-5 mb-6">
        <SectionTitle action={<span className="text-xs text-muted-foreground">Sorted by ESG score</span>}>Department Rankings</SectionTitle>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {DEPARTMENTS.map((d, i) => (
            <motion.div
              key={d.name}
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
              whileHover={{ y: -4 }}
              className="rounded-xl border border-border p-3.5 relative overflow-hidden"
            >
              <div className="absolute top-2 right-2 text-xs font-bold text-muted-foreground/40">#{i + 1}</div>
              <div className="w-9 h-9 rounded-lg flex items-center justify-center text-white text-xs font-bold" style={{ background: d.color }}>
                {d.name.slice(0, 2).toUpperCase()}
              </div>
              <p className="font-semibold text-sm mt-2 truncate">{d.name}</p>
              <p className="text-xs text-muted-foreground">{d.employees} employees</p>
              <div className="flex items-end justify-between mt-2">
                <span className="text-2xl font-bold" style={{ color: d.color }}>{d.esg}</span>
                <span className="text-[10px] text-muted-foreground">ESG</span>
              </div>
            </motion.div>
          ))}
        </div>
      </GlassCard>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        {/* Goals */}
        <GlassCard className="p-5">
          <SectionTitle>Goal Progress</SectionTitle>
          <div className="space-y-4">
            {GOALS.slice(0, 4).map((g) => {
              const pct = Math.round((g.current / g.target) * 100);
              return (
                <div key={g.title}>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="font-medium">{g.title}</span>
                    <span className={g.status === "At Risk" ? "text-amber-600 font-semibold" : "text-emerald-600 font-semibold"}>{g.status}</span>
                  </div>
                  <ProgressBar value={pct} tone={g.status === "At Risk" ? "warning" : "primary"} />
                  <p className="text-[10px] text-muted-foreground mt-1">{g.current} / {g.target} {g.unit}</p>
                </div>
              );
            })}
          </div>
        </GlassCard>

        {/* Leaderboard */}
        <GlassCard className="p-5">
          <SectionTitle action={<button onClick={() => navigate("/gamification")} className="text-xs text-primary hover:underline">View all</button>}>Top Employees</SectionTitle>
          <div className="space-y-2.5">
            {LEADERBOARD.slice(0, 5).map((e, i) => (
              <div key={e.name} className="flex items-center gap-3">
                <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold ${i === 0 ? "bg-amber-100 text-amber-700" : i === 1 ? "bg-slate-200 text-slate-700" : i === 2 ? "bg-orange-100 text-orange-700" : "bg-muted text-muted-foreground"}`}>{i + 1}</span>
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[10px] font-bold" style={{ background: e.color }}>{e.avatar}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{e.name}</p>
                  <p className="text-[10px] text-muted-foreground">{e.dept} • Lvl {e.level}</p>
                </div>
                <span className="text-sm font-bold text-primary">{e.xp.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Weather */}
        <GlassCard className="p-5">
          <SectionTitle>Sustainability Weather</SectionTitle>
          <div className="rounded-xl gradient-primary p-4 text-white relative overflow-hidden">
            <div className="absolute -right-4 -top-4 opacity-20"><Sun className="w-24 h-24" /></div>
            <div className="flex items-center gap-2"><Cloud className="w-5 h-5" /><span className="text-sm opacity-90">Bengaluru</span></div>
            <p className="text-4xl font-bold mt-2">24°C</p>
            <p className="text-xs opacity-80">Partly cloudy • Good air quality</p>
            <div className="grid grid-cols-3 gap-2 mt-4 text-center">
              <div className="bg-white/15 rounded-lg py-2"><Droplets className="w-4 h-4 mx-auto" /><p className="text-xs mt-1">62%</p><p className="text-[9px] opacity-70">Humidity</p></div>
              <div className="bg-white/15 rounded-lg py-2"><Wind className="w-4 h-4 mx-auto" /><p className="text-xs mt-1">12 km/h</p><p className="text-[9px] opacity-70">Wind</p></div>
              <div className="bg-white/15 rounded-lg py-2"><Leaf className="w-4 h-4 mx-auto" /><p className="text-xs mt-1">42</p><p className="text-[9px] opacity-70">AQI</p></div>
            </div>
          </div>
          <div className="mt-3 text-xs text-muted-foreground flex items-start gap-2">
            <Lightbulb className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            <span>Ideal day for outdoor CSR activities. Solar generation expected +18%.</span>
          </div>
        </GlassCard>
      </div>

      {/* AI Insights */}
      <GlassCard className="p-5 mb-6">
        <SectionTitle action={<span className="text-xs flex items-center gap-1 text-primary"><Sparkles className="w-3 h-3" /> AI Powered</span>}>AI Sustainability Insights</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {AI_INSIGHTS.map((ins, i) => {
            const Icon = AI_ICONS[ins.icon] || Sparkles;
            const tones = {
              warning: "from-amber-500/10 to-orange-500/10 border-amber-500/20",
              success: "from-emerald-500/10 to-green-600/10 border-emerald-500/20",
              info: "from-blue-500/10 to-indigo-500/10 border-blue-500/20",
            };
            const iconTones = {
              warning: "bg-amber-500", success: "bg-emerald-500", info: "bg-blue-500",
            };
            return (
              <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}
                className={`rounded-xl border bg-gradient-to-br p-4 ${tones[ins.type]}`}>
                <div className="flex items-start gap-3">
                  <div className={`w-9 h-9 rounded-lg ${iconTones[ins.type]} flex items-center justify-center text-white shrink-0`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{ins.title}</p>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{ins.text}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </GlassCard>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        {/* Recent CSR */}
        <GlassCard className="p-5">
          <SectionTitle action={<button onClick={() => navigate("/social")} className="text-xs text-primary hover:underline">View all</button>}>Recent CSR Activities</SectionTitle>
          <div className="space-y-2.5">
            {csr.map((a, i) => (
              <div key={i} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-accent/50 transition-colors">
                <div className="w-9 h-9 rounded-lg bg-emerald-100 dark:bg-emerald-500/15 flex items-center justify-center"><Heart className="w-4 h-4 text-primary" /></div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{a.title}</p>
                  <p className="text-[10px] text-muted-foreground">{a.participants} participants • {a.volunteer_hours || a.hours} hrs</p>
                </div>
                <span className={`text-[10px] px-2 py-1 rounded-full font-medium ${a.status === "Completed" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400" : a.status === "Approved" ? "bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-400" : "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400"}`}>{a.status}</span>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Compliance Issues */}
        <GlassCard className="p-5">
          <SectionTitle action={<button onClick={() => navigate("/governance")} className="text-xs text-primary hover:underline">View all</button>}>Recent Compliance Issues</SectionTitle>
          <div className="space-y-2.5">
            {COMPLIANCE_ISSUES.slice(0, 5).map((c, i) => (
              <div key={i} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-accent/50 transition-colors">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${c.priority === "Critical" ? "bg-red-100 dark:bg-red-500/15" : c.priority === "High" ? "bg-orange-100 dark:bg-orange-500/15" : "bg-amber-100 dark:bg-amber-500/15"}`}>
                  <AlertTriangle className={`w-4 h-4 ${c.priority === "Critical" ? "text-red-600" : c.priority === "High" ? "text-orange-600" : "text-amber-600"}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{c.title}</p>
                  <p className="text-[10px] text-muted-foreground">{c.owner} • Due {c.due}</p>
                </div>
                <span className={`text-[10px] px-2 py-1 rounded-full font-medium ${c.status === "Overdue" ? "bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-400" : c.status === "In Progress" ? "bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-400" : "bg-muted text-muted-foreground"}`}>{c.status}</span>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* Quick Actions */}
      <GlassCard className="p-5">
        <SectionTitle>Quick Actions</SectionTitle>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {QUICK_ACTIONS.map((a, i) => (
            <motion.button
              key={a.label}
              whileHover={{ y: -4, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate("/reports")}
              className="flex flex-col items-center gap-2 p-4 rounded-xl border border-border hover:border-primary/30 transition-colors"
            >
              <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${a.color} flex items-center justify-center text-white shadow-md`}>
                <a.icon className="w-5 h-5" />
              </div>
              <span className="text-xs font-medium">{a.label}</span>
            </motion.button>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}