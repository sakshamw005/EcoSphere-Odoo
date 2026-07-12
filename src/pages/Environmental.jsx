import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";
import {
  Sprout, Flame, Factory, Target, Calculator, Leaf, TrendingDown, ArrowRight, Zap, Truck, Building2
} from "lucide-react";
import { GlassCard, KPICard, ProgressBar, SectionTitle, PageHeader } from "@/components/shared";
import { EMISSIONS_MONTHLY, CARBON_BY_DEPT, DEPARTMENTS, EMISSION_FACTORS, GOALS } from "@/lib/demoData";

const SCOPE_DATA = [
  { name: "Scope 1 (Direct)", value: 380, color: "#1B5E20" },
  { name: "Scope 2 (Energy)", value: 520, color: "#43A047" },
  { name: "Scope 3 (Value Chain)", value: 690, color: "#00C853" },
];

const HEATMAP = Array.from({ length: 7 }, () =>
  Array.from({ length: 12 }, () => Math.floor(Math.random() * 100))
);

const DEPT_COMPARE = DEPARTMENTS.map((d) => ({ name: d.name.split(" ")[0], emissions: d.carbon, offset: Math.round(d.carbon * 0.35) }));

export default function Environmental() {
  const [calc, setCalc] = useState({ electricity: "", gas: "", diesel: "", travel: "" });
  const [result, setResult] = useState(null);

  const calculate = () => {
    const e = (parseFloat(calc.electricity) || 0) * 0.82;
    const g = (parseFloat(calc.gas) || 0) * 2.04;
    const d = (parseFloat(calc.diesel) || 0) * 2.68;
    const t = (parseFloat(calc.travel) || 0) * 0.255;
    setResult(Math.round((e + g + d + t) * 100) / 100);
  };

  return (
    <div>
      <PageHeader title="Environmental" subtitle="Monitor carbon footprint, emissions, and sustainability goals across departments." icon={Sprout} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <KPICard icon={Flame} label="Total Emissions" value="1,590 t" delta="6.4%" deltaTone="danger" accent="from-orange-500 to-red-500" />
        <KPICard icon={Leaf} label="Carbon Offset" value="1,245 t" delta="12%" accent="from-emerald-500 to-green-600" />
        <KPICard icon={Target} label="Net Zero Progress" value="68%" delta="5 pts" accent="from-teal-500 to-emerald-600" />
        <KPICard icon={TrendingDown} label="Reduction YoY" value="-14%" delta="2.1%" accent="from-lime-500 to-green-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <GlassCard className="p-5 lg:col-span-2">
          <SectionTitle>Monthly Emissions vs Carbon Offset</SectionTitle>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={EMISSIONS_MONTHLY}>
              <defs>
                <linearGradient id="em" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#DC2626" stopOpacity={0.3} /><stop offset="95%" stopColor="#DC2626" stopOpacity={0} /></linearGradient>
                <linearGradient id="of" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#16A34A" stopOpacity={0.3} /><stop offset="95%" stopColor="#16A34A" stopOpacity={0} /></linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid hsl(var(--border))", background: "hsl(var(--card))", fontSize: 12 }} />
              <Area type="monotone" dataKey="emissions" stroke="#DC2626" strokeWidth={2.5} fill="url(#em)" name="Emissions" />
              <Area type="monotone" dataKey="offset" stroke="#16A34A" strokeWidth={2.5} fill="url(#of)" name="Offset" />
            </AreaChart>
          </ResponsiveContainer>
        </GlassCard>

        <GlassCard className="p-5">
          <SectionTitle>Emission Scopes</SectionTitle>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={SCOPE_DATA} dataKey="value" innerRadius={45} outerRadius={80} paddingAngle={3}>
                {SCOPE_DATA.map((d, i) => <Cell key={i} fill={d.color} />)}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid hsl(var(--border))", background: "hsl(var(--card))", fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {SCOPE_DATA.map((s) => (
              <div key={s.name} className="flex items-center gap-2 text-xs">
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: s.color }} />
                <span className="text-muted-foreground flex-1">{s.name}</span>
                <span className="font-semibold">{s.value} t</span>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <GlassCard className="p-5">
          <SectionTitle>Department Carbon Comparison</SectionTitle>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={DEPT_COMPARE}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid hsl(var(--border))", background: "hsl(var(--card))", fontSize: 12 }} />
              <Bar dataKey="emissions" fill="#DC2626" radius={[6, 6, 0, 0]} name="Emissions" />
              <Bar dataKey="offset" fill="#16A34A" radius={[6, 6, 0, 0]} name="Offset" />
            </BarChart>
          </ResponsiveContainer>
        </GlassCard>

        <GlassCard className="p-5">
          <SectionTitle>Emission Heatmap</SectionTitle>
          <div className="space-y-1">
            {HEATMAP.map((row, ri) => (
              <div key={ri} className="flex gap-1">
                {row.map((v, ci) => (
                  <motion.div
                    key={ci}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: (ri * 12 + ci) * 0.005 }}
                    className="flex-1 aspect-square rounded"
                    style={{ background: `hsl(${145 - v * 0.8} ${100 - v * 0.3}% ${75 - v * 0.4}%)` }}
                    title={`${v} tCO₂`}
                  />
                ))}
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between text-[10px] text-muted-foreground mt-2">
            <span>Low</span><span>Departments × Hours</span><span>High</span>
          </div>
        </GlassCard>
      </div>

      {/* Carbon Calculator */}
      <GlassCard className="p-5 mb-6">
        <SectionTitle action={<Calculator className="w-4 h-4 text-primary" />}>Carbon Calculator</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {[
            { key: "electricity", label: "Electricity (kWh)", icon: Zap },
            { key: "gas", label: "Natural Gas (m³)", icon: Flame },
            { key: "diesel", label: "Diesel (L)", icon: Truck },
            { key: "travel", label: "Air Travel (km)", icon: Building2 },
          ].map((f) => (
            <div key={f.key}>
              <label className="text-xs text-muted-foreground flex items-center gap-1.5 mb-1"><f.icon className="w-3 h-3" />{f.label}</label>
              <input
                type="number"
                value={calc[f.key]}
                onChange={(e) => setCalc({ ...calc, [f.key]: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-border bg-background text-sm outline-none focus:ring-2 focus:ring-primary/30"
                placeholder="0"
              />
            </div>
          ))}
          <div className="flex items-end">
            <button onClick={calculate} className="w-full gradient-primary text-white py-2 rounded-xl text-sm font-medium hover:opacity-90 transition-opacity">
              Calculate
            </button>
          </div>
        </div>
        {result !== null && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center text-white"><Leaf className="w-6 h-6" /></div>
            <div>
              <p className="text-xs text-muted-foreground">Estimated Carbon Footprint</p>
              <p className="text-2xl font-bold text-gradient">{result} <span className="text-sm text-muted-foreground">tCO₂</span></p>
            </div>
          </motion.div>
        )}
      </GlassCard>

      {/* Goals + Emission Factors */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <GlassCard className="p-5">
          <SectionTitle>Environmental Goals</SectionTitle>
          <div className="space-y-4">
            {GOALS.map((g) => {
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

        <GlassCard className="p-5">
          <SectionTitle>Emission Factors</SectionTitle>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-muted-foreground border-b border-border">
                  <th className="pb-2 font-medium">Activity</th>
                  <th className="pb-2 font-medium">Factor</th>
                  <th className="pb-2 font-medium">Scope</th>
                </tr>
              </thead>
              <tbody>
                {EMISSION_FACTORS.map((e, i) => (
                  <tr key={i} className="border-b border-border/50 hover:bg-accent/30">
                    <td className="py-2.5 font-medium">{e.activity}</td>
                    <td className="py-2.5">{e.factor} <span className="text-muted-foreground text-xs">{e.unit}</span></td>
                    <td className="py-2.5"><span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-500/15 text-primary font-medium">{e.scope}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}