import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  BarChart, Bar, PieChart, Pie, Cell, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";
import {
  Users, Heart, Clock, TrendingUp, Calendar, MapPin, CheckCircle2, Filter, Search, Award
} from "lucide-react";
import { GlassCard, KPICard, ProgressBar, SectionTitle, PageHeader } from "@/components/shared";
import { db } from "@/api/authClient";

import { CSR_ACTIVITIES, DIVERSITY } from "@/lib/demoData";

const PARTICIPATION_TREND = [
  { month: "Jan", hours: 320, participants: 45 },
  { month: "Feb", hours: 380, participants: 52 },
  { month: "Mar", hours: 410, participants: 58 },
  { month: "Apr", hours: 390, participants: 61 },
  { month: "May", hours: 480, participants: 68 },
  { month: "Jun", hours: 520, participants: 74 },
  { month: "Jul", hours: 560, participants: 79 },
];

const DIVERSITY_COLORS = ["#1B5E20", "#43A047", "#00C853"];

export default function Social() {
  const [activities, setActivities] = useState(CSR_ACTIVITIES);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  useEffect(() => {
    db.entities.CSRActivity.list("-date", 30)
      .then((d) => d.length && setActivities(d))
      .catch(() => {});
  }, []);

  const cats = ["All", "Environment", "Education", "Health", "Community", "Animal Welfare"];
  const filtered = activities.filter(
    (a) => (filter === "All" || a.category === filter) && a.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <PageHeader title="Social" subtitle="Track CSR activities, employee participation, diversity, and volunteer impact." icon={Users} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <KPICard icon={Heart} label="CSR Activities" value="30" delta="4 new" accent="from-pink-500 to-rose-500" />
        <KPICard icon={Clock} label="Volunteer Hours" value="3,450" delta="12%" accent="from-emerald-500 to-green-600" />
        <KPICard icon={Users} label="Participation" value="86%" delta="8%" accent="from-teal-500 to-emerald-600" />
        <KPICard icon={Award} label="Diversity Index" value="0.82" delta="3%" accent="from-indigo-500 to-blue-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <GlassCard className="p-5 lg:col-span-2">
          <SectionTitle>Participation Analytics</SectionTitle>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={PARTICIPATION_TREND}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid hsl(var(--border))", background: "hsl(var(--card))", fontSize: 12 }} />
              <Line type="monotone" dataKey="hours" stroke="#1B5E20" strokeWidth={2.5} dot={{ r: 3 }} name="Volunteer Hours" />
              <Line type="monotone" dataKey="participants" stroke="#00C853" strokeWidth={2.5} dot={{ r: 3 }} name="Participants" />
            </LineChart>
          </ResponsiveContainer>
        </GlassCard>

        <GlassCard className="p-5">
          <SectionTitle>Diversity Metrics</SectionTitle>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={DIVERSITY} dataKey="value" innerRadius={45} outerRadius={75} paddingAngle={3}>
                {DIVERSITY.map((d, i) => <Cell key={i} fill={DIVERSITY_COLORS[i]} />)}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid hsl(var(--border))", background: "hsl(var(--card))", fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {DIVERSITY.map((d, i) => (
              <div key={d.group} className="flex items-center gap-2 text-xs">
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: DIVERSITY_COLORS[i] }} />
                <span className="text-muted-foreground flex-1">{d.group}</span>
                <span className="font-semibold">{d.value}%</span>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* CSR Activities */}
      <GlassCard className="p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <SectionTitle>CSR Activities</SectionTitle>
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search..."
                className="pl-8 pr-3 py-1.5 rounded-lg border border-border bg-background text-xs outline-none focus:ring-2 focus:ring-primary/30 w-36"
              />
            </div>
            <div className="flex gap-1 overflow-x-auto no-scrollbar">
              {cats.map((c) => (
                <button
                  key={c}
                  onClick={() => setFilter(c)}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${filter === c ? "gradient-primary text-white" : "bg-muted text-muted-foreground hover:bg-accent"}`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {filtered.map((a, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
              whileHover={{ y: -4 }}
              className="rounded-xl border border-border p-4 hover:border-primary/30 transition-colors"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-500/15 flex items-center justify-center"><Heart className="w-5 h-5 text-primary" /></div>
                <span className={`text-[10px] px-2 py-1 rounded-full font-medium ${a.status === "Completed" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400" : a.status === "Approved" ? "bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-400" : "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400"}`}>{a.status}</span>
              </div>
              <p className="font-semibold text-sm mt-2.5">{a.title}</p>
              <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1"><MapPin className="w-3 h-3" /> {a.location}</p>
              <p className="text-xs text-muted-foreground flex items-center gap-1"><Calendar className="w-3 h-3" /> {a.date}</p>
              <div className="flex items-center gap-3 mt-3 text-xs">
                <span className="flex items-center gap-1 text-muted-foreground"><Users className="w-3 h-3" /> {a.participants}</span>
                <span className="flex items-center gap-1 text-muted-foreground"><Clock className="w-3 h-3" /> {a.volunteer_hours || a.hours}h</span>
              </div>
              <div className="mt-3 pt-3 border-t border-border">
                <p className="text-[10px] text-muted-foreground">Impact</p>
                <p className="text-xs font-medium text-emerald-600">{a.impact}</p>
              </div>
            </motion.div>
          ))}
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-12 text-sm text-muted-foreground">No activities match your filters.</div>
        )}
      </GlassCard>
    </div>
  );
}