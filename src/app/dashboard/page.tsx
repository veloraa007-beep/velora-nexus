"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Loader2, LogOut, LayoutDashboard, TrendingUp,
  Users, Briefcase, ChevronDown, User, Settings
} from "lucide-react";

type Stats = {
  clientCount: number;
  totalMrr: number;
  leadsCount: number;
  projectsCount: number;
};

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [stats, setStats] = useState<Stats>({ clientCount: 0, totalMrr: 0, leadsCount: 0, projectsCount: 0 });
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const init = async () => {
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { router.replace("/login"); return; }
      setUserEmail(session.user.email ?? null);

      // Fetch live stats
      const [{ count: clientCount }, { data: mrrData }, { count: leadsCount }, { count: projectsCount }] = await Promise.all([
        supabase.from("clients").select("*", { count: "exact", head: true }),
        supabase.from("clients").select("mrr"),
        supabase.from("leads").select("*", { count: "exact", head: true }),
        supabase.from("projects").select("*", { count: "exact", head: true }),
      ]);

      const totalMrr = (mrrData ?? []).reduce((sum: number, c: any) => sum + (c.mrr ?? 0), 0);
      setStats({
        clientCount: clientCount ?? 0,
        totalMrr,
        leadsCount: leadsCount ?? 0,
        projectsCount: projectsCount ?? 0,
      });
      setLoading(false);
    };
    init();
  }, [router]);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.replace("/login");
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white dark:bg-[#020617]">
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-slate-50 dark:bg-gradient-to-br dark:from-[#020617] dark:via-[#020617] dark:to-[#0F172A] text-slate-900 dark:text-slate-200 font-sans selection:bg-blue-500/30">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-500/10 blur-[120px] rounded-full opacity-50 pointer-events-none" />

      {/* Header */}
      <header className="border-b border-slate-200 dark:border-white/5 bg-white/50 dark:bg-[#020617]/50 backdrop-blur-xl sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <LayoutDashboard className="w-5 h-5 text-blue-500" />
            <span className="text-lg font-semibold text-slate-900 dark:text-white tracking-tight">Velora Nexus</span>
          </Link>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-2">
            {[
              {href:"/clients", label:"Clients"},
              {href:"/leads", label:"Leads"},
              {href:"/projects", label:"Projects"},
              {href:"/analytics", label:"Analytics"},
              {href:"/finance", label:"Finance"}
            ].map(({href,label}) => (
              <Link key={href} href={href} className="px-3 py-1.5 text-sm text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-lg transition-all">
                {label}
              </Link>
            ))}
          </nav>

          {/* User Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(p => !p)}
              className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 border border-slate-200 dark:border-white/5 px-3 py-2 rounded-xl transition-all"
            >
              <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-500/20 flex items-center justify-center">
                <User className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              </div>
              <span className="hidden sm:block max-w-[160px] truncate font-medium">{userEmail}</span>
              <ChevronDown className={`w-3.5 h-3.5 text-slate-500 dark:text-slate-400 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -5 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -5 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-3 w-56 bg-white/90 dark:bg-[#0F172A]/90 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-xl shadow-2xl shadow-black/5 dark:shadow-black/50 overflow-hidden z-50"
                >
                  <div className="px-4 py-3 border-b border-slate-200 dark:border-white/5">
                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{userEmail}</p>
                    <p className="text-[10px] text-blue-600 dark:text-blue-400 mt-0.5 uppercase tracking-wider font-semibold">Workspace Owner</p>
                  </div>
                  <div className="py-1">
                    <Link href="/settings" className="flex items-center gap-2 px-4 py-2.5 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white transition-all">
                      <Settings className="w-4 h-4 text-slate-400" /> Settings
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all"
                    >
                      <LogOut className="w-4 h-4" /> Logout
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </header>

      {/* Body */}
      <main className="max-w-7xl mx-auto px-6 py-12 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="flex items-center justify-between mb-10">
            <div>
              <h1 className="text-3xl font-semibold text-slate-900 dark:text-white tracking-tight mb-2">Welcome back 👋</h1>
              <p className="text-slate-500 dark:text-slate-400">Here's your Velora business overview for today.</p>
            </div>
          </div>

          {/* Live Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <StatCard 
              icon={<TrendingUp className="w-5 h-5 text-blue-600 dark:text-blue-400" />} 
              label="Total MRR" 
              value={`₹${stats.totalMrr.toLocaleString()}`} 
              sub="Monthly recurring revenue" 
              trend="+12%" 
            />
            <StatCard 
              icon={<Users className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />} 
              label="Active Clients" 
              value={String(stats.clientCount)} 
              sub="Total onboarded" 
              trend="+2" 
            />
            <StatCard 
              icon={<Users className="w-5 h-5 text-amber-600 dark:text-amber-400" />} 
              label="Pipeline Leads" 
              value={String(stats.leadsCount)} 
              sub="Active inquiries" 
              trend="+5" 
            />
            <StatCard 
              icon={<Briefcase className="w-5 h-5 text-purple-600 dark:text-purple-400" />} 
              label="Active Projects" 
              value={String(stats.projectsCount)} 
              sub="Currently in progress" 
              trend="100%" 
            />
          </div>

          {/* Quick Links */}
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mt-12 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { href: "/clients", label: "Manage Clients", desc: "View and onboard new clients", icon: <Users className="w-5 h-5 text-emerald-600 dark:text-emerald-400" /> },
              { href: "/leads", label: "Leads Pipeline",  desc: "Track and organize inquiries", icon: <Users className="w-5 h-5 text-amber-600 dark:text-amber-400" /> },
              { href: "/projects", label: "Active Projects", desc: "Monitor project workflows", icon: <Briefcase className="w-5 h-5 text-purple-600 dark:text-purple-400" /> },
            ].map(({ href, label, desc, icon }) => (
              <Link
                key={href}
                href={href}
                className="group bg-white dark:bg-white/5 backdrop-blur-xl border border-slate-200 dark:border-white/10 hover:border-blue-500/30 rounded-2xl p-6 transition-all shadow-lg hover:shadow-blue-500/10"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-slate-50 dark:bg-white/5 rounded-lg group-hover:bg-slate-100 dark:group-hover:bg-white/10 transition-colors">
                    {icon}
                  </div>
                  <p className="font-semibold text-slate-900 dark:text-white">{label}</p>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400">{desc}</p>
              </Link>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
}

function StatCard({ icon, label, value, sub, trend }: { icon: React.ReactNode; label: string; value: string; sub: string; trend: string }) {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      className="bg-white dark:bg-gradient-to-br dark:from-white/10 dark:to-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-6 flex flex-col gap-2 shadow-xl shadow-black/5 dark:shadow-black/20 backdrop-blur-xl transition-all hover:border-blue-500/30 group"
    >
      <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400 mb-2">
        <span className="flex items-center gap-2 font-medium">{icon} {label}</span>
        <span className="text-xs font-semibold bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-500/20">{trend}</span>
      </div>
      <div className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">{value}</div>
      <div className="text-xs text-slate-500 dark:text-slate-500 font-medium">{sub}</div>
    </motion.div>
  );
}


