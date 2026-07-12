// Central demo data for EcoSphere — realistic enterprise ESG sample data

export const KPIS = {
  esgScore: 78,
  carbonSaved: 1240,
  employeesEngaged: 86,
  compliance: 94,
  goalsAchieved: 12,
  volunteerHours: 3450,
};

export const ESG_TREND = [
  { month: "Jan", environmental: 68, social: 72, governance: 70, overall: 70 },
  { month: "Feb", environmental: 70, social: 74, governance: 73, overall: 72 },
  { month: "Mar", environmental: 72, social: 76, governance: 75, overall: 74 },
  { month: "Apr", environmental: 71, social: 78, governance: 78, overall: 76 },
  { month: "May", environmental: 74, social: 80, governance: 80, overall: 78 },
  { month: "Jun", environmental: 76, social: 82, governance: 82, overall: 80 },
  { month: "Jul", environmental: 78, social: 84, governance: 85, overall: 82 },
];

export const CARBON_BY_DEPT = [
  { name: "Manufacturing", value: 420, color: "#1B5E20" },
  { name: "Logistics", value: 310, color: "#43A047" },
  { name: "Operations", value: 240, color: "#00C853" },
  { name: "Sales", value: 150, color: "#16A34A" },
  { name: "HR", value: 90, color: "#4ADE80" },
];

export const EMISSIONS_MONTHLY = [
  { month: "Jan", emissions: 580, offset: 120 },
  { month: "Feb", emissions: 560, offset: 140 },
  { month: "Mar", emissions: 610, offset: 160 },
  { month: "Apr", emissions: 540, offset: 180 },
  { month: "May", emissions: 510, offset: 200 },
  { month: "Jun", emissions: 480, offset: 220 },
  { month: "Jul", emissions: 445, offset: 245 },
];

export const DEPARTMENTS = [
  { name: "Manufacturing", head: "Robert Chen", employees: 32, esg: 82, carbon: 420, color: "#1B5E20" },
  { name: "Operations", head: "Maria Garcia", employees: 24, esg: 79, carbon: 240, color: "#43A047" },
  { name: "Logistics", head: "James Wilson", employees: 18, esg: 74, carbon: 310, color: "#00C853" },
  { name: "Sales", head: "Priya Sharma", employees: 16, esg: 88, carbon: 150, color: "#16A34A" },
  { name: "HR", head: "David Kim", employees: 10, esg: 91, carbon: 90, color: "#4ADE80" },
];

export const LEADERBOARD = [
  { name: "Priya Sharma", dept: "Sales", xp: 4820, level: 12, rank: "Sustainability Champion", avatar: "PS", color: "#1B5E20" },
  { name: "Maria Garcia", dept: "Operations", xp: 4310, level: 11, rank: "Eco Warrior", avatar: "MG", color: "#43A047" },
  { name: "Alex Turner", dept: "Manufacturing", xp: 3950, level: 10, rank: "Green Advocate", avatar: "AT", color: "#00C853" },
  { name: "Sara Ahmed", dept: "HR", xp: 3680, level: 9, rank: "Planet Guardian", avatar: "SA", color: "#16A34A" },
  { name: "James Wilson", dept: "Logistics", xp: 3210, level: 9, rank: "Carbon Cutter", avatar: "JW", color: "#4ADE80" },
];

export const CHALLENGES = [
  { title: "Zero Plastic Week", category: "Waste", xp: 250, participants: 64, progress: 72, deadline: "2026-07-20", difficulty: "Medium", status: "Active" },
  { title: "Bike to Work Month", category: "Transport", xp: 400, participants: 38, progress: 45, deadline: "2026-07-31", difficulty: "Hard", status: "Active" },
  { title: "Tree Plantation Drive", category: "Community", xp: 300, participants: 89, progress: 90, deadline: "2026-07-15", difficulty: "Easy", status: "Active" },
  { title: "Energy Audit Challenge", category: "Energy", xp: 350, participants: 22, progress: 30, deadline: "2026-08-10", difficulty: "Hard", status: "Active" },
  { title: "Meditation Marathon", category: "Wellness", xp: 150, participants: 51, progress: 60, deadline: "2026-07-25", difficulty: "Easy", status: "Active" },
];

export const COMPLIANCE_ISSUES = [
  { title: "E-waste disposal non-compliance", category: "Environmental", priority: "High", owner: "Robert Chen", due: "2026-07-18", status: "In Progress" },
  { title: "Policy ACK-2024 renewal", category: "Governance", priority: "Medium", owner: "David Kim", due: "2026-07-22", status: "Open" },
  { title: "Supplier diversity audit", category: "Social", priority: "Medium", owner: "Maria Garcia", due: "2026-08-01", status: "Open" },
  { title: "Carbon reporting gap Q2", category: "Environmental", priority: "Critical", owner: "James Wilson", due: "2026-07-14", status: "Overdue" },
  { title: "Data privacy refresher", category: "Data", priority: "Low", owner: "Priya Sharma", due: "2026-08-15", status: "In Progress" },
];

export const POLICIES = [
  { title: "Net Zero Carbon Policy", category: "Environmental", version: "v3.2", owner: "Robert Chen", reviewed: "2026-05-10", ack: 96, status: "Active" },
  { title: "Diversity & Inclusion Charter", category: "Social", version: "v2.0", owner: "David Kim", reviewed: "2026-04-22", ack: 92, status: "Active" },
  { title: "Anti-Corruption Framework", category: "Governance", version: "v4.1", owner: "Maria Garcia", reviewed: "2026-06-01", ack: 88, status: "Active" },
  { title: "Data Protection Policy", category: "Data", version: "v5.0", owner: "Priya Sharma", reviewed: "2026-06-15", ack: 94, status: "Active" },
  { title: "Renewable Energy Transition", category: "Environmental", version: "v1.3", owner: "James Wilson", reviewed: "2026-03-30", ack: 81, status: "Under Review" },
  { title: "Supplier Code of Conduct", category: "Governance", version: "v2.4", owner: "Maria Garcia", reviewed: "2026-05-20", ack: 85, status: "Active" },
];

export const CSR_ACTIVITIES = [
  { title: "Beach Cleanup Drive", category: "Environment", date: "2026-07-08", location: "Marina Beach", participants: 45, hours: 180, status: "Completed", impact: "1.2 tons waste removed" },
  { title: "Rural School Digital Lab", category: "Education", date: "2026-07-05", location: "Kolar District", participants: 22, hours: 220, status: "Completed", impact: "300 students benefited" },
  { title: "Free Health Camp", category: "Health", date: "2026-07-12", location: "Community Center", participants: 30, hours: 150, status: "Approved", impact: "500+ checkups" },
  { title: "Tree Plantation Drive", category: "Environment", date: "2026-07-15", location: "City Park", participants: 89, hours: 267, status: "Approved", impact: "500 saplings planted" },
  { title: "Animal Shelter Support", category: "Animal Welfare", date: "2026-07-03", location: "Paws Shelter", participants: 18, hours: 90, status: "Completed", impact: "120 animals cared" },
  { title: "Elderly Care Visit", category: "Community", date: "2026-07-18", location: "Sunshine Home", participants: 25, hours: 100, status: "Pending Approval", impact: "Pending" },
  { title: "Lake Restoration Project", category: "Environment", date: "2026-07-20", location: "Bellandur Lake", participants: 60, hours: 300, status: "Approved", impact: "2 acres restored" },
  { title: "Skills Workshop for Youth", category: "Education", date: "2026-07-10", location: "Tech Hub", participants: 40, hours: 160, status: "Completed", impact: "150 youth trained" },
];

export const BADGES = [
  { name: "Carbon Crusher", icon: "Leaf", rarity: "Epic", xp: 1000, earned: 34 },
  { name: "Eco Warrior", icon: "Swords", rarity: "Legendary", xp: 2500, earned: 12 },
  { name: "Team Planet", icon: "Users", rarity: "Rare", xp: 500, earned: 58 },
  { name: "Green Commuter", icon: "Bike", rarity: "Common", xp: 200, earned: 76 },
  { name: "Zero Waste Hero", icon: "Recycle", rarity: "Epic", xp: 1200, earned: 28 },
  { name: "Tree Hugger", icon: "TreePine", rarity: "Rare", xp: 600, earned: 45 },
];

export const REWARDS = [
  { name: "Coffee Voucher", category: "Voucher", xp_cost: 500, icon: "Coffee" },
  { name: "Half Day Off", category: "Time Off", xp_cost: 1500, icon: "Clock" },
  { name: "Eco Merch Kit", category: "Merch", xp_cost: 2000, icon: "ShoppingBag" },
  { name: "Tree Planted in Your Name", category: "Donation", xp_cost: 800, icon: "TreePine" },
  { name: "Wellness Retreat Day", category: "Experience", xp_cost: 3000, icon: "Sparkles" },
  { name: "Movie Tickets", category: "Voucher", xp_cost: 700, icon: "Ticket" },
];

export const AI_INSIGHTS = [
  { type: "warning", title: "Manufacturing emissions surged", text: "Manufacturing emissions increased 14% this month, driven by extended production shifts. Consider scheduling an energy audit.", icon: "TrendingUp" },
  { type: "success", title: "Sales leads ESG performance", text: "Sales department has the highest ESG score (88) this quarter, up 6 points from strong CSR participation.", icon: "Award" },
  { type: "info", title: "CSR engagement climbing", text: "HR participation in CSR activities improved by 23% — momentum suggests Q3 volunteer targets will be exceeded.", icon: "Users" },
  { type: "success", title: "Compliance improving", text: "Open compliance issues reduced by 40% compared to last month. 2 critical items still require attention.", icon: "ShieldCheck" },
];

export const GOALS = [
  { title: "Reduce Carbon Footprint", target: 30, current: 22, unit: "%", status: "On Track" },
  { title: "Employee Volunteer Hours", target: 5000, current: 3450, unit: "hrs", status: "On Track" },
  { title: "Renewable Energy Usage", target: 80, current: 54, unit: "%", status: "At Risk" },
  { title: "Zero-Waste Certification", target: 100, current: 65, unit: "%", status: "On Track" },
  { title: "Diversity Hiring Target", target: 45, current: 41, unit: "%", status: "On Track" },
];

export const NOTIFICATIONS_DEMO = [
  { title: "Badge Unlocked!", message: "You earned the 'Carbon Crusher' badge", type: "badge", read: false, time: "2m ago" },
  { title: "Policy Reminder", message: "Data Protection Policy v5.0 acknowledgement due", type: "policy", read: false, time: "1h ago" },
  { title: "Challenge Deadline", message: "Tree Plantation Drive ends in 3 days", type: "challenge", read: false, time: "3h ago" },
  { title: "Critical Compliance Issue", message: "Carbon reporting gap Q2 is overdue", type: "compliance", read: false, time: "5h ago" },
  { title: "CSR Approval Needed", message: "Elderly Care Visit awaiting approval", type: "csr", read: true, time: "1d ago" },
  { title: "Reward Redeemed", message: "Maria Garcia redeemed 'Half Day Off'", type: "reward", read: true, time: "2d ago" },
];

export const DIVERSITY = [
  { group: "Women", value: 44 },
  { group: "Men", value: 52 },
  { group: "Non-binary", value: 4 },
];

export const RADAR_DATA = [
  { metric: "Environmental", current: 78, target: 90 },
  { metric: "Social", current: 84, target: 90 },
  { metric: "Governance", current: 85, target: 95 },
  { metric: "Innovation", current: 72, target: 85 },
  { metric: "Community", current: 80, target: 88 },
  { metric: "Compliance", current: 94, target: 98 },
];

export const EMISSION_FACTORS = [
  { activity: "Electricity (Grid)", factor: 0.82, unit: "kgCO₂/kWh", scope: "Scope 2" },
  { activity: "Natural Gas", factor: 2.04, unit: "kgCO₂/m³", scope: "Scope 1" },
  { activity: "Diesel (Fleet)", factor: 2.68, unit: "kgCO₂/L", scope: "Scope 1" },
  { activity: "Business Travel (Air)", factor: 0.255, unit: "kgCO₂/km", scope: "Scope 3" },
  { activity: "Office Paper", factor: 0.84, unit: "kgCO₂/kg", scope: "Scope 3" },
  { activity: "Water Supply", factor: 0.149, unit: "kgCO₂/m³", scope: "Scope 3" },
];