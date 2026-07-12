import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import {
  Trophy, Zap, Award, Gift, Star, Crown, Medal, Flame, Target, CheckCircle2, Sparkles, X,
  Sprout, Leaf, Swords, Users, Bike, Recycle, TreePine, Coffee, Clock, ShoppingBag, Ticket
} from "lucide-react";
import { GlassCard, KPICard, ProgressBar, SectionTitle, PageHeader } from "@/components/shared";
import { db } from "@/api/authClient";

import { CHALLENGES, LEADERBOARD, BADGES, REWARDS } from "@/lib/demoData";

const RANKS = [
  { name: "Eco Novice", min: 0, icon: Sprout, color: "#94a3b8" },
  { name: "Green Sprout", min: 1000, icon: Leaf, color: "#84cc16" },
  { name: "Eco Warrior", min: 2500, icon: Swords, color: "#43A047" },
  { name: "Sustainability Champion", min: 4000, icon: Trophy, color: "#1B5E20" },
  { name: "Planet Guardian", min: 6000, icon: Crown, color: "#00C853" },
];

const BADGE_ICON_MAP = { Leaf, Swords, Users, Bike, Recycle, TreePine };

const REWARD_ICON_MAP = { Coffee, Clock, ShoppingBag, TreePine, Sparkles, Ticket };

const RARITY_TONE = {
  Common: "border-slate-300 from-slate-100 to-slate-200",
  Rare: "border-blue-400 from-blue-100 to-cyan-100",
  Epic: "border-purple-400 from-purple-100 to-pink-100",
  Legendary: "border-amber-400 from-amber-100 to-orange-200",
};

export default function Gamification() {
  const [challenges, setChallenges] = useState(CHALLENGES);
  const [showAchievement, setShowAchievement] = useState(null);

  useEffect(() => {
    db.entities.Challenge.list().then((d) => d.length && setChallenges(d)).catch(() => {});
  }, []);

  const celebrate = (challenge) => {
    confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 }, colors: ["#1B5E20", "#43A047", "#00C853"] });
    setShowAchievement(challenge);
    setTimeout(() => setShowAchievement(null), 4000);
  };

  const catColor = { Energy: "#F59E0B", Waste: "#10B981", Transport: "#3B82F6", Community: "#EC4899", Wellness: "#8B5CF6" };

  return (
    <div>
      <PageHeader title="Gamification" subtitle="Engage employees with challenges, XP, badges, and sustainable rewards." icon={Trophy} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <KPICard icon={Zap} label="Total XP Distributed" value="48,250" delta="18%" accent="from-amber-500 to-orange-600" />
        <KPICard icon={Trophy} label="Active Challenges" value="5" delta="2 new" accent="from-emerald-500 to-green-700" />
        <KPICard icon={Award} label="Badges Earned" value="253" delta="34" accent="from-purple-500 to-indigo-600" />
        <KPICard icon={Gift} label="Rewards Redeemed" value="89" delta="12" accent="from-pink-500 to-rose-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        {/* Player Card */}
        <GlassCard className="p-5 relative overflow-hidden">
          <div className="absolute inset-0 gradient-primary opacity-5" />
          <div className="relative">
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center text-white text-xl font-bold shadow-lg">AD</div>
              <div>
                <p className="font-bold">Admin User</p>
                <p className="text-xs text-muted-foreground">Sustainability Champion</p>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-3">
              <span className="text-3xl font-bold text-gradient">Lvl 12</span>
              <span className="text-xs text-muted-foreground">4,820 XP</span>
            </div>
            <div className="mt-3">
              <div className="flex justify-between text-[10px] text-muted-foreground mb-1">
                <span>Level 12</span><span>5,000 XP</span>
              </div>
              <ProgressBar value={96} tone="accent" />
            </div>
            <div className="grid grid-cols-3 gap-2 mt-4 text-center">
              <div className="rounded-lg bg-muted/50 p-2"><Trophy className="w-4 h-4 mx-auto text-amber-500" /><p className="text-sm font-bold mt-1">7</p><p className="text-[9px] text-muted-foreground">Badges</p></div>
              <div className="rounded-lg bg-muted/50 p-2"><Flame className="w-4 h-4 mx-auto text-orange-500" /><p className="text-sm font-bold mt-1">12</p><p className="text-[9px] text-muted-foreground">Streak</p></div>
              <div className="rounded-lg bg-muted/50 p-2"><Target className="w-4 h-4 mx-auto text-emerald-500" /><p className="text-sm font-bold mt-1">8</p><p className="text-[9px] text-muted-foreground">Done</p></div>
            </div>
          </div>
        </GlassCard>

        {/* Leaderboard */}
        <GlassCard className="p-5 lg:col-span-2">
          <SectionTitle action={<span className="text-xs text-muted-foreground">This month</span>}>Leaderboard</SectionTitle>
          <div className="space-y-2">
            {LEADERBOARD.map((e, i) => (
              <motion.div key={e.name} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}
                className={`flex items-center gap-3 p-2.5 rounded-xl ${i === 0 ? "bg-amber-500/10 border border-amber-500/20" : "hover:bg-accent/50"}`}>
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${i === 0 ? "bg-amber-400 text-white" : i === 1 ? "bg-slate-300 text-slate-700" : i === 2 ? "bg-orange-400 text-white" : "bg-muted text-muted-foreground"}`}>
                  {i === 0 ? <Crown className="w-4 h-4" /> : i + 1}
                </div>
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ background: e.color }}>{e.avatar}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{e.name}</p>
                  <p className="text-[10px] text-muted-foreground">{e.dept} • {e.rank}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-primary">{e.xp.toLocaleString()}</p>
                  <p className="text-[10px] text-muted-foreground">Lvl {e.level}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* Challenges */}
      <GlassCard className="p-5 mb-6">
        <SectionTitle action={<span className="text-xs text-muted-foreground">{challenges.length} active</span>}>Active Challenges</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {challenges.map((c, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} whileHover={{ y: -4 }}
              className="rounded-xl border border-border p-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 rounded-full blur-2xl opacity-20" style={{ background: catColor[c.category] }} />
              <div className="flex items-start justify-between">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white" style={{ background: catColor[c.category] }}><Target className="w-5 h-5" /></div>
                <span className="text-xs font-bold text-amber-600 flex items-center gap-0.5"><Zap className="w-3 h-3" />{c.xp_reward || c.xp}</span>
              </div>
              <p className="font-semibold text-sm mt-2.5">{c.title}</p>
              <p className="text-[10px] text-muted-foreground">{c.category} • {c.difficulty}</p>
              <div className="mt-3">
                <div className="flex justify-between text-[10px] mb-1">
                  <span className="text-muted-foreground">{c.participants} joined</span>
                  <span className="font-semibold">{c.progress}%</span>
                </div>
                <ProgressBar value={c.progress} tone="accent" />
              </div>
              <div className="flex items-center justify-between mt-3">
                <span className="text-[10px] text-muted-foreground">Ends {c.deadline}</span>
                <button onClick={() => celebrate(c)} className="text-[10px] gradient-primary text-white px-2.5 py-1 rounded-lg font-medium hover:opacity-90">Join</button>
              </div>
            </motion.div>
          ))}
        </div>
      </GlassCard>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Badges */}
        <GlassCard className="p-5">
          <SectionTitle>Badges</SectionTitle>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {BADGES.map((b, i) => {
              const Icon = BADGE_ICON_MAP[b.icon] || Award;
              return (
                <motion.div key={i} whileHover={{ y: -4, scale: 1.03 }} className={`rounded-xl border-2 bg-gradient-to-br p-3 text-center ${RARITY_TONE[b.rarity]}`}>
                  <div className="w-12 h-12 mx-auto rounded-full bg-white dark:bg-card shadow flex items-center justify-center"><Icon className="w-6 h-6 text-primary" /></div>
                  <p className="text-xs font-semibold mt-2">{b.name}</p>
                  <p className="text-[9px] text-muted-foreground">{b.rarity} • {b.earned_by} earned</p>
                </motion.div>
              );
            })}
          </div>
        </GlassCard>

        {/* Rewards */}
        <GlassCard className="p-5">
          <SectionTitle>Reward Store</SectionTitle>
          <div className="space-y-2.5">
            {REWARDS.map((r, i) => {
              const Icon = REWARD_ICON_MAP[r.icon] || Gift;
              return (
                <div key={i} className="flex items-center gap-3 p-2.5 rounded-xl border border-border hover:bg-accent/30 transition-colors">
                  <div className="w-10 h-10 rounded-xl gradient-accent flex items-center justify-center text-white"><Icon className="w-5 h-5" /></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{r.name}</p>
                    <p className="text-[10px] text-muted-foreground">{r.category}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-amber-600 flex items-center gap-0.5"><Zap className="w-3 h-3" />{r.xp_cost}</p>
                    <button className="text-[10px] text-primary hover:underline mt-0.5">Redeem</button>
                  </div>
                </div>
              );
            })}
          </div>
        </GlassCard>
      </div>

      {/* Achievement Popup */}
      <AnimatePresence>
        {showAchievement && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.8 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 50, scale: 0.8 }}
            className="fixed bottom-6 right-6 z-50 glass-strong rounded-2xl border-2 border-amber-400 p-4 shadow-2xl max-w-xs"
          >
            <button onClick={() => setShowAchievement(null)} className="absolute top-2 right-2"><X className="w-4 h-4 text-muted-foreground" /></button>
            <div className="flex items-center gap-3">
              <motion.div animate={{ rotate: [0, -10, 10, 0], scale: [1, 1.2, 1] }} transition={{ duration: 0.5 }}
                className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white shadow-lg">
                <Trophy className="w-7 h-7" />
              </motion.div>
              <div>
                <p className="text-xs text-amber-600 font-semibold uppercase tracking-wide">Challenge Joined!</p>
                <p className="font-bold text-sm">{showAchievement.title}</p>
                <p className="text-xs text-muted-foreground">+{showAchievement.xp_reward || showAchievement.xp} XP pending</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}