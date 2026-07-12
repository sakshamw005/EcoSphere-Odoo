import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  BarChart3, FileText, Download, Filter, Calendar, Building2, User, Tag,
  Sprout, Users, Landmark, Layers, CheckCircle2, FileSpreadsheet, FileType
} from "lucide-react";
import { GlassCard, KPICard, ProgressBar, SectionTitle, PageHeader } from "@/components/shared";
import { ESG_TREND, CARBON_BY_DEPT, DEPARTMENTS } from "@/lib/demoData";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";
import { toast } from "sonner";
import { exportReport } from "@/lib/reportExport";

const REPORT_TYPES = [
  { id: "environmental", label: "Environmental Report", icon: Sprout, color: "from-emerald-500 to-green-700", desc: "Carbon emissions, offsets, goals" },
  { id: "social", label: "Social Report", icon: Users, color: "from-pink-500 to-rose-600", desc: "CSR, diversity, volunteer hours" },
  { id: "governance", label: "Governance Report", icon: Landmark, color: "from-blue-500 to-indigo-600", desc: "Policies, compliance, audits" },
  { id: "summary", label: "ESG Summary", icon: Layers, color: "from-teal-500 to-emerald-600", desc: "Combined overview dashboard" },
];

export default function Reports() {
  const [selected, setSelected] = useState("summary");
  const [dept, setDept] = useState("All");
  const [dateRange, setDateRange] = useState("Q2 2026");
  const [generating, setGenerating] = useState(false);

  const handleExport = (format) => {
    setGenerating(true);
    setTimeout(() => {
      try {
        const reportLabel = REPORT_TYPES.find((r) => r.id === selected).label;
        exportReport(format, {
          selected,
          reportLabel,
          dept,
          dateRange,
          esgTrend: ESG_TREND,
          carbonByDept: CARBON_BY_DEPT,
          departments: DEPARTMENTS,
        });
        toast.success(`${reportLabel} exported as ${format}`, {
          description: `Department: ${dept} • Period: ${dateRange}`
        });
      } catch (e) {
        toast.error("Export failed", { description: e.message });
      } finally {
        setGenerating(false);
      }
    }, 800);
  };

  return (
    <div>
      <PageHeader
        title="Reports"
        subtitle="Generate, customize, and export comprehensive ESG reports."
        icon={BarChart3}
        actions={
          <button onClick={() => handleExport("PDF")} disabled={generating}
            className="gradient-primary text-white px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2 hover:opacity-90 disabled:opacity-50">
            <Download className="w-4 h-4" /> {generating ? "Generating..." : "Export Report"}
          </button>
        }
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <KPICard icon={FileText} label="Reports Generated" value="142" delta="18" accent="from-emerald-500 to-green-700" />
        <KPICard icon={Download} label="Exports This Month" value="37" delta="12" accent="from-blue-500 to-indigo-600" />
        <KPICard icon={Calendar} label="Scheduled" value="8" delta="2" accent="from-amber-500 to-orange-600" />
        <KPICard icon={CheckCircle2} label="Compliance Ready" value="95%" delta="4 pts" accent="from-teal-500 to-emerald-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        {/* Report Builder */}
        <GlassCard className="p-5">
          <SectionTitle>Report Type</SectionTitle>
          <div className="space-y-2">
            {REPORT_TYPES.map((r) => (
              <button key={r.id} onClick={() => setSelected(r.id)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all text-left ${selected === r.id ? "border-primary bg-emerald-500/5" : "border-border hover:bg-accent/30"}`}>
                <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${r.color} flex items-center justify-center text-white`}><r.icon className="w-4 h-4" /></div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{r.label}</p>
                  <p className="text-[10px] text-muted-foreground">{r.desc}</p>
                </div>
                {selected === r.id && <CheckCircle2 className="w-4 h-4 text-primary" />}
              </button>
            ))}
          </div>

          <div className="mt-5 space-y-3">
            <div>
              <label className="text-xs text-muted-foreground flex items-center gap-1.5 mb-1.5"><Building2 className="w-3 h-3" /> Department</label>
              <select value={dept} onChange={(e) => setDept(e.target.value)} className="w-full px-3 py-2 rounded-xl border border-border bg-background text-sm outline-none focus:ring-2 focus:ring-primary/30">
                {["All", ...DEPARTMENTS.map((d) => d.name)].map((d) => <option key={d}>{d}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs text-muted-foreground flex items-center gap-1.5 mb-1.5"><Calendar className="w-3 h-3" /> Date Range</label>
              <select value={dateRange} onChange={(e) => setDateRange(e.target.value)} className="w-full px-3 py-2 rounded-xl border border-border bg-background text-sm outline-none focus:ring-2 focus:ring-primary/30">
                {["This Month", "Q2 2026", "Q1 2026", "YTD 2026", "Last 12 Months"].map((d) => <option key={d}>{d}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs text-muted-foreground flex items-center gap-1.5 mb-1.5"><Tag className="w-3 h-3" /> Category</label>
              <select className="w-full px-3 py-2 rounded-xl border border-border bg-background text-sm outline-none focus:ring-2 focus:ring-primary/30">
                {["All Categories", "Energy", "Waste", "Transport", "Community", "Compliance"].map((d) => <option key={d}>{d}</option>)}
              </select>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-border">
            <p className="text-xs text-muted-foreground mb-2">Export Format</p>
            <div className="grid grid-cols-3 gap-2">
              {[{ f: "PDF", i: FileText }, { f: "Excel", i: FileSpreadsheet }, { f: "CSV", i: FileType }].map(({ f, i: Icon }) => (
                <button key={f} onClick={() => handleExport(f)} disabled={generating}
                  className="flex flex-col items-center gap-1.5 p-2.5 rounded-xl border border-border hover:bg-accent/30 disabled:opacity-50 transition-colors">
                  <Icon className="w-4 h-4 text-primary" />
                  <span className="text-[10px] font-medium">{f}</span>
                </button>
              ))}
            </div>
          </div>
        </GlassCard>

        {/* Report Preview */}
        <GlassCard className="p-5 lg:col-span-2">
          <SectionTitle action={<span className="text-xs text-muted-foreground">{dateRange}</span>}>Report Preview</SectionTitle>
          <div className="rounded-xl border border-border overflow-hidden">
            <div className="gradient-primary p-4 text-white">
              <p className="text-xs opacity-80 uppercase tracking-wide">EcoSphere ESG Report</p>
              <p className="text-lg font-bold">{REPORT_TYPES.find((r) => r.id === selected).label}</p>
              <p className="text-xs opacity-80">{dept} • {dateRange}</p>
            </div>
            <div className="p-4 space-y-4">
              <div className="grid grid-cols-3 gap-3">
                {[{ l: "ESG Score", v: "78" }, { l: "Emissions", v: "1,590 t" }, { l: "Compliance", v: "94%" }].map((s) => (
                  <div key={s.l} className="rounded-lg bg-muted/50 p-3 text-center">
                    <p className="text-[10px] text-muted-foreground uppercase">{s.l}</p>
                    <p className="text-lg font-bold mt-0.5">{s.v}</p>
                  </div>
                ))}
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={ESG_TREND}>
                  <defs>
                    <linearGradient id="rp" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#1B5E20" stopOpacity={0.3} /><stop offset="95%" stopColor="#1B5E20" stopOpacity={0} /></linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} domain={[60, 100]} />
                  <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid hsl(var(--border))", background: "hsl(var(--card))", fontSize: 12 }} />
                  <Area type="monotone" dataKey="overall" stroke="#1B5E20" strokeWidth={2.5} fill="url(#rp)" name="ESG Score" />
                </AreaChart>
              </ResponsiveContainer>
              <div>
                <p className="text-xs font-semibold mb-2">Key Findings</p>
                <ul className="space-y-1.5 text-xs text-muted-foreground">
                  <li className="flex gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" /> Overall ESG score improved by 4 points this period.</li>
                  <li className="flex gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" /> Carbon emissions reduced by 14% year-over-year.</li>
                  <li className="flex gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" /> Employee engagement in CSR reached 86%.</li>
                  <li className="flex gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" /> 2 critical compliance items require attention.</li>
                </ul>
              </div>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Recent Reports */}
      <GlassCard className="p-5">
        <SectionTitle>Recent Reports</SectionTitle>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-muted-foreground border-b border-border">
                <th className="pb-2 font-medium">Report Name</th>
                <th className="pb-2 font-medium">Type</th>
                <th className="pb-2 font-medium">Period</th>
                <th className="pb-2 font-medium">Generated</th>
                <th className="pb-2 font-medium">Status</th>
                <th className="pb-2 font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: "Q2 ESG Summary", type: "Summary", period: "Q2 2026", date: "Jul 1", status: "Ready" },
                { name: "Environmental Impact Q2", type: "Environmental", period: "Q2 2026", date: "Jun 30", status: "Ready" },
                { name: "CSR Participation June", type: "Social", period: "Jun 2026", date: "Jun 28", status: "Ready" },
                { name: "Governance Audit Report", type: "Governance", period: "H1 2026", date: "Jun 25", status: "Draft" },
              ].map((r, i) => (
                <tr key={i} className="border-b border-border/50 hover:bg-accent/30">
                  <td className="py-2.5 font-medium flex items-center gap-2"><FileText className="w-4 h-4 text-primary" /> {r.name}</td>
                  <td className="py-2.5 text-muted-foreground">{r.type}</td>
                  <td className="py-2.5 text-muted-foreground">{r.period}</td>
                  <td className="py-2.5 text-muted-foreground">{r.date}</td>
                  <td className="py-2.5"><span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${r.status === "Ready" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400" : "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400"}`}>{r.status}</span></td>
                  <td className="py-2.5 text-right"><button onClick={() => handleExport("PDF")} className="text-primary hover:underline text-xs">Download</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
}