import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Landmark, ShieldCheck, AlertTriangle, FileText, CheckCircle2, Clock, Filter, Search, Gavel, Building2, Plus, Sparkles
} from "lucide-react";
import { GlassCard, KPICard, ProgressBar, SectionTitle, PageHeader } from "@/components/shared";
import { db } from "@/api/authClient";

import { POLICIES, COMPLIANCE_ISSUES } from "@/lib/demoData";

const AUDIT_TIMELINE = [
  { title: "ISO 14001 Surveillance Audit", date: "2026-07-02", status: "Completed", auditor: "Bureau Veritas" },
  { title: "Internal ESG Compliance Review", date: "2026-06-20", status: "Completed", auditor: "Internal Team" },
  { title: "Data Privacy Audit (GDPR)", date: "2026-07-10", status: "In Progress", auditor: "Deloitte" },
  { title: "Supplier Code of Conduct Audit", date: "2026-07-22", status: "Scheduled", auditor: "EcoCert" },
  { title: "Annual Carbon Verification", date: "2026-08-05", status: "Scheduled", auditor: "TÜV Nord" },
];

export default function Governance() {
  const [policies, setPolicies] = useState(POLICIES);
  const [issues, setIssues] = useState(COMPLIANCE_ISSUES);
  const [departmentActivities, setDepartmentActivities] = useState([]);
  const [search, setSearch] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [activityForm, setActivityForm] = useState({
    department: "Manufacturing",
    category: "Environmental",
    title: "",
    details: "",
    owner: "",
    impact: "",
    status: "Planned",
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const policyItems = await db.entities.Policy.list();
        if (policyItems?.length) setPolicies(policyItems);
        const issueItems = await db.entities.ComplianceIssue.list();
        if (issueItems?.length) setIssues(issueItems);
        const activityItems = await db.entities.DepartmentESGActivity.list();
        if (activityItems?.length) setDepartmentActivities(activityItems);
      } catch {
        // keep local fallback data if the entity store is unavailable
      }
    };

    loadData();
  }, []);

  const filteredIssues = issues.filter(
    (i) => (priorityFilter === "All" || i.priority === priorityFilter) && i.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleActivitySubmit = async (event) => {
    event.preventDefault();
    if (!activityForm.title.trim()) return;

    const created = await db.entities.DepartmentESGActivity.create({
      ...activityForm,
      createdAt: new Date().toISOString(),
    });

    setDepartmentActivities((current) => [created, ...current]);
    setActivityForm({
      department: activityForm.department,
      category: activityForm.category,
      title: "",
      details: "",
      owner: "",
      impact: "",
      status: "Planned",
    });
  };

  const priorityTone = (p) => ({
    Critical: "bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-400",
    High: "bg-orange-100 text-orange-700 dark:bg-orange-500/15 dark:text-orange-400",
    Medium: "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400",
    Low: "bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-400",
  }[p]);

  const statusTone = (s) => ({
    Completed: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400",
    "In Progress": "bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-400",
    Scheduled: "bg-muted text-muted-foreground",
    Open: "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400",
    Overdue: "bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-400",
    Resolved: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400",
  }[s]);

  return (
    <div>
      <PageHeader title="Governance" subtitle="Manage policies, compliance issues, audits, and regulatory adherence." icon={Landmark} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <KPICard icon={ShieldCheck} label="Compliance Rate" value="94%" delta="3 pts" accent="from-emerald-500 to-green-700" />
        <KPICard icon={FileText} label="Active Policies" value="10" delta="2 new" accent="from-blue-500 to-indigo-600" />
        <KPICard icon={AlertTriangle} label="Open Issues" value="5" delta="-40%" accent="from-amber-500 to-orange-600" />
        <KPICard icon={Gavel} label="Audits This Qtr" value="5" delta="2 done" accent="from-teal-500 to-emerald-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        {/* Policies */}
        <GlassCard className="p-5">
          <SectionTitle action={<span className="text-xs text-muted-foreground">{policies.length} policies</span>}>Policies & Acknowledgements</SectionTitle>
          <div className="space-y-2.5">
            {policies.map((p, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                className="rounded-xl border border-border p-3 hover:bg-accent/30 transition-colors">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-500/15 flex items-center justify-center shrink-0"><FileText className="w-4 h-4 text-blue-600" /></div>
                    <div>
                      <p className="text-sm font-medium">{p.title}</p>
                      <p className="text-[10px] text-muted-foreground">{p.category} • {p.version} • Owner: {p.owner}</p>
                    </div>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium shrink-0 ${statusTone(p.status)}`}>{p.status}</span>
                </div>
                <div className="mt-2.5">
                  <div className="flex justify-between text-[10px] mb-1">
                    <span className="text-muted-foreground">Acknowledgement</span>
                    <span className="font-semibold">{p.acknowledgement_rate}%</span>
                  </div>
                  <ProgressBar value={p.acknowledgement_rate} tone={p.acknowledgement_rate > 90 ? "success" : "warning"} />
                </div>
              </motion.div>
            ))}
          </div>
        </GlassCard>

        {/* Compliance Issues */}
        <GlassCard className="p-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
            <SectionTitle>Compliance Issues</SectionTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search..." className="pl-7 pr-2 py-1 rounded-lg border border-border bg-background text-xs outline-none w-28" />
              </div>
              <select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)} className="px-2 py-1 rounded-lg border border-border bg-background text-xs outline-none">
                {["All", "Critical", "High", "Medium", "Low"].map((p) => <option key={p}>{p}</option>)}
              </select>
            </div>
          </div>
          <div className="space-y-2.5">
            {filteredIssues.map((c, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                className="rounded-xl border border-border p-3 hover:bg-accent/30 transition-colors">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-2.5">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${c.priority === "Critical" ? "bg-red-100 dark:bg-red-500/15" : c.priority === "High" ? "bg-orange-100 dark:bg-orange-500/15" : "bg-amber-100 dark:bg-amber-500/15"}`}>
                      <AlertTriangle className={`w-4 h-4 ${c.priority === "Critical" ? "text-red-600" : c.priority === "High" ? "text-orange-600" : "text-amber-600"}`} />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{c.title}</p>
                      <p className="text-[10px] text-muted-foreground">{c.category} • {c.owner}</p>
                    </div>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium shrink-0 ${priorityTone(c.priority)}`}>{c.priority}</span>
                </div>
                <div className="flex items-center justify-between mt-2 text-[10px]">
                  <span className={`px-2 py-0.5 rounded-full font-medium ${statusTone(c.status)}`}>{c.status}</span>
                  <span className="text-muted-foreground flex items-center gap-1"><Clock className="w-3 h-3" /> Due {c.due_date || c.due}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </GlassCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <GlassCard className="p-5">
          <SectionTitle action={<span className="text-xs text-muted-foreground">Add department activity</span>}>Department ESG Activity Log</SectionTitle>
          <form onSubmit={handleActivitySubmit} className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <select value={activityForm.department} onChange={(event) => setActivityForm((current) => ({ ...current, department: event.target.value }))} className="rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none">
                {['Manufacturing', 'Operations', 'Logistics', 'Sales', 'HR'].map((option) => <option key={option}>{option}</option>)}
              </select>
              <select value={activityForm.category} onChange={(event) => setActivityForm((current) => ({ ...current, category: event.target.value }))} className="rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none">
                {['Environmental', 'Social', 'Governance'].map((option) => <option key={option}>{option}</option>)}
              </select>
            </div>
            <input value={activityForm.title} onChange={(event) => setActivityForm((current) => ({ ...current, title: event.target.value }))} placeholder="Activity title" className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none" required />
            <textarea value={activityForm.details} onChange={(event) => setActivityForm((current) => ({ ...current, details: event.target.value }))} placeholder="Describe the ESG action and progress" rows="3" className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input value={activityForm.owner} onChange={(event) => setActivityForm((current) => ({ ...current, owner: event.target.value }))} placeholder="Owner" className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none" />
              <input value={activityForm.impact} onChange={(event) => setActivityForm((current) => ({ ...current, impact: event.target.value }))} placeholder="Impact" className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none" />
            </div>
            <div className="flex items-center justify-between gap-3">
              <select value={activityForm.status} onChange={(event) => setActivityForm((current) => ({ ...current, status: event.target.value }))} className="rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none">
                {['Planned', 'In Progress', 'Completed'].map((option) => <option key={option}>{option}</option>)}
              </select>
              <button type="submit" className="inline-flex items-center gap-2 rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground">
                <Plus className="w-4 h-4" /> Save activity
              </button>
            </div>
          </form>
        </GlassCard>

        <GlassCard className="p-5">
          <SectionTitle action={<span className="text-xs text-muted-foreground">Live entries</span>}>Recent Department Activities</SectionTitle>
          <div className="space-y-2.5">
            {departmentActivities.length === 0 ? (
              <div className="rounded-xl border border-dashed border-border p-4 text-sm text-muted-foreground">No department ESG activities recorded yet. Add one above to start tracking progress.</div>
            ) : departmentActivities.map((activity, index) => (
              <motion.div key={activity.id || index} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-border p-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-sm font-medium">{activity.title}</p>
                    <p className="text-[10px] text-muted-foreground">{activity.department} • {activity.category} • {activity.owner || 'Assigned internally'}</p>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${statusTone(activity.status)}`}>{activity.status}</span>
                </div>
                {activity.details && <p className="mt-2 text-xs text-muted-foreground">{activity.details}</p>}
                {activity.impact && <p className="mt-1 text-xs text-emerald-600">Impact: {activity.impact}</p>}
              </motion.div>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* Audit Timeline */}
      <GlassCard className="p-5">
        <SectionTitle>Audit Timeline</SectionTitle>
        <div className="relative pl-6">
          <div className="absolute left-2 top-2 bottom-2 w-0.5 bg-border" />
          {AUDIT_TIMELINE.map((a, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }} className="relative mb-4 last:mb-0">
              <div className={`absolute -left-[18px] w-3 h-3 rounded-full ring-4 ring-background ${a.status === "Completed" ? "bg-emerald-500" : a.status === "In Progress" ? "bg-blue-500" : "bg-muted-foreground/40"}`} />
              <div className="rounded-xl border border-border p-3 hover:bg-accent/30 transition-colors">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-sm font-medium">{a.title}</p>
                    <p className="text-[10px] text-muted-foreground">{a.auditor} • {a.date}</p>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${statusTone(a.status)}`}>{a.status}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}