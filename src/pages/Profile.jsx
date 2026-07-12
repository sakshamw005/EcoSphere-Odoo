import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  User, Mail, Building2, Calendar, Award, Zap, Trophy, Flame, Target, Leaf,
  TrendingUp, Edit3, Settings as SettingsIcon, Bell, Shield, Save
} from "lucide-react";
import { GlassCard, KPICard, ProgressBar, SectionTitle, PageHeader } from "@/components/shared";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/AuthContext";

const ACTIVITY = [
  { action: "Earned 'Carbon Crusher' badge", time: "2 hours ago", icon: Award, color: "text-amber-500" },
  { action: "Joined 'Zero Plastic Week' challenge", time: "5 hours ago", icon: Target, color: "text-emerald-500" },
  { action: "Logged 180 volunteer hours", time: "1 day ago", icon: Leaf, color: "text-green-500" },
  { action: "Completed 'Energy Audit' training", time: "2 days ago", icon: Shield, color: "text-blue-500" },
  { action: "Redeemed 'Coffee Voucher' reward", time: "3 days ago", icon: Zap, color: "text-purple-500" },
];

const SKILLS = [
  { name: "Environmental", value: 82 },
  { name: "Social Impact", value: 88 },
  { name: "Governance", value: 75 },
  { name: "Data Analysis", value: 70 },
];

export default function Profile() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    role: "",
    department: "",
    joined: "Jan 2025",
  });

  useEffect(() => {
    const storedProfile = typeof window !== "undefined"
      ? JSON.parse(window.localStorage.getItem("ecosphere-profile") || "null")
      : null;

    setProfile({
      name: storedProfile?.name || user?.name || user?.email?.split("@")[0] || "EcoSphere User",
      email: storedProfile?.email || user?.email || "",
      role: storedProfile?.role || user?.role || "Employee",
      department: storedProfile?.department || "Operations",
      joined: storedProfile?.joined || "Jan 2025",
    });
  }, [user]);

  const handleProfileSave = (event) => {
    event.preventDefault();
    if (typeof window !== "undefined") {
      window.localStorage.setItem("ecosphere-profile", JSON.stringify(profile));
    }
  };

  return (
    <div>
      <PageHeader title="Profile" subtitle="Your ESG journey, achievements, and activity." icon={User}
        actions={<button onClick={() => navigate("/settings")} className="px-4 py-2 rounded-xl border border-border text-sm font-medium flex items-center gap-2 hover:bg-accent/30"><Edit3 className="w-4 h-4" /> Edit Profile</button>}
      />

      {/* Hero card */}
      <GlassCard className="p-0 mb-6 overflow-hidden">
        <div className="h-32 gradient-primary relative">
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 20% 50%, white 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
        </div>
        <div className="px-5 pb-5 -mt-12">
          <div className="flex flex-col sm:flex-row sm:items-end gap-4">
            <div className="w-24 h-24 rounded-2xl gradient-primary flex items-center justify-center text-white text-3xl font-bold shadow-xl ring-4 ring-background">AD</div>
            <div className="flex-1 sm:pb-2">
              <h2 className="text-xl font-bold">{profile.name}</h2>
              <p className="text-sm text-muted-foreground">{profile.role}</p>
              <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> {profile.email}</span>
                <span className="flex items-center gap-1"><Building2 className="w-3 h-3" /> {profile.department}</span>
                <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> Joined {profile.joined}</span>
              </div>
            </div>
            <div className="flex gap-2 sm:pb-2">
              <span className="px-3 py-1.5 rounded-lg bg-amber-100 dark:bg-amber-500/15 text-amber-700 dark:text-amber-400 text-xs font-medium flex items-center gap-1"><Trophy className="w-3 h-3" /> Level 12</span>
              <span className="px-3 py-1.5 rounded-lg gradient-primary text-white text-xs font-medium flex items-center gap-1"><Zap className="w-3 h-3" /> 4,820 XP</span>
            </div>
          </div>
        </div>
      </GlassCard>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <KPICard icon={Award} label="Badges Earned" value="7" delta="2 new" accent="from-amber-500 to-orange-600" />
        <KPICard icon={Target} label="Challenges Done" value="8" delta="3" accent="from-emerald-500 to-green-700" />
        <KPICard icon={Leaf} label="Volunteer Hours" value="180" delta="24" accent="from-teal-500 to-emerald-600" />
        <KPICard icon={Flame} label="Day Streak" value="12" delta="active" accent="from-orange-500 to-red-600" />
      </div>

      <GlassCard className="p-5 mb-6">
        <SectionTitle>Profile Details</SectionTitle>
        <form onSubmit={handleProfileSave} className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <input value={profile.name} onChange={(event) => setProfile((current) => ({ ...current, name: event.target.value }))} placeholder="Full name" className="rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none" />
          <input value={profile.email} onChange={(event) => setProfile((current) => ({ ...current, email: event.target.value }))} placeholder="Email" className="rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none" />
          <input value={profile.role} onChange={(event) => setProfile((current) => ({ ...current, role: event.target.value }))} placeholder="Role" className="rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none" />
          <input value={profile.department} onChange={(event) => setProfile((current) => ({ ...current, department: event.target.value }))} placeholder="Department" className="rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none" />
          <div className="md:col-span-2 flex justify-end">
            <button type="submit" className="inline-flex items-center gap-2 rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground">
              <Save className="w-4 h-4" /> Save profile
            </button>
          </div>
        </form>
      </GlassCard>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Skills */}
        <GlassCard className="p-5">
          <SectionTitle>ESG Skills</SectionTitle>
          <div className="space-y-4">
            {SKILLS.map((s) => (
              <div key={s.name}>
                <div className="flex justify-between text-xs mb-1.5"><span className="font-medium">{s.name}</span><span className="text-muted-foreground">{s.value}%</span></div>
                <ProgressBar value={s.value} tone="primary" />
              </div>
            ))}
          </div>
          <div className="mt-5 pt-4 border-t border-border">
            <p className="text-xs text-muted-foreground mb-2">Next Rank</p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center text-white"><Leaf className="w-5 h-5" /></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Planet Guardian</p>
                <p className="text-[10px] text-muted-foreground">1,180 XP to go</p>
              </div>
            </div>
          </div>
        </GlassCard>

        {/* Badges */}
        <GlassCard className="p-5">
          <SectionTitle>Recent Badges</SectionTitle>
          <div className="grid grid-cols-3 gap-3">
            {[{ n: "Carbon Crusher", c: "from-purple-500 to-pink-500" }, { n: "Eco Warrior", c: "from-amber-500 to-orange-500" }, { n: "Team Planet", c: "from-blue-500 to-cyan-500" }, { n: "Green Commuter", c: "from-emerald-500 to-green-600" }, { n: "Zero Waste", c: "from-teal-500 to-emerald-600" }, { n: "Tree Hugger", c: "from-lime-500 to-green-600" }].map((b, i) => (
              <motion.div key={i} whileHover={{ y: -4, scale: 1.05 }} className="text-center">
                <div className={`w-14 h-14 mx-auto rounded-full bg-gradient-to-br ${b.c} flex items-center justify-center text-white shadow-lg`}><Award className="w-6 h-6" /></div>
                <p className="text-[10px] font-medium mt-1.5 leading-tight">{b.n}</p>
              </motion.div>
            ))}
          </div>
        </GlassCard>

        {/* Activity Timeline */}
        <GlassCard className="p-5">
          <SectionTitle>Activity Timeline</SectionTitle>
          <div className="relative pl-6">
            <div className="absolute left-2 top-1 bottom-1 w-0.5 bg-border" />
            {ACTIVITY.map((a, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }} className="relative mb-4 last:mb-0">
                <div className={`absolute -left-[18px] w-3 h-3 rounded-full ring-4 ring-background bg-primary`} />
                <div className="flex items-start gap-2.5">
                  <a.icon className={`w-4 h-4 ${a.color} mt-0.5 shrink-0`} />
                  <div>
                    <p className="text-sm">{a.action}</p>
                    <p className="text-[10px] text-muted-foreground">{a.time}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}