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
      <div className="flex min-h-screen items-center justify-center bg-[#0F172A]">
        <Loader2 className="w-8 h-8 text-blue-400 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-200 font-sans">
      {/* Header */}
      <header className="border-b border-slate-800 bg-[#0F172A]/90 backdrop-blur sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <LayoutDashboard className="w-5 h-5 text-blue-400" />
            <span className="text-lg font-semibold text-white tracking-tight">Velora Nexus</span>
          </Link>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-1">
            {[{href:"/clients",label:"Clients"},{href:"/leads",label:"Leads"},{href:"/projects",label:"Projects"}].map(({href,label}) => (
              <Link key={href} href={href} className="px-3 py-1.5 text-sm text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-all">{label}</Link>
            ))}
          </nav>

          {/* User Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(p => !p)}
              className="flex items-center gap-2 text-sm text-slate-300 hover:text-white bg-slate-800/60 hover:bg-slate-700/60 px-3 py-2 rounded-lg transition-all"
            >
              <div className="w-6 h-6 rounded-full bg-blue-500/30 flex items-center justify-center">
                <User className="w-3.5 h-3.5 text-blue-400" />
              </div>
              <span className="hidden sm:block max-w-[160px] truncate">{userEmail}</span>
              <ChevronDown className={`w-3.5 h-3.5 text-slate-500 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-2 w-52 bg-[#1E293B] border border-slate-700 rounded-xl shadow-2xl overflow-hidden z-50"
                >
                  <div className="px-4 py-3 border-b border-slate-700">
                    <p className="text-xs text-slate-400 truncate">{userEmail}</p>
                  </div>
                  <div className="py-1">
                    <Link href="/settings" className="flex items-center gap-2 px-4 py-2 text-sm text-slate-300 hover:bg-slate-700/50 hover:text-white transition-all">
                      <Settings className="w-4 h-4" /> Settings
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 transition-all"
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
      <main className="max-w-7xl mx-auto px-6 py-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="text-3xl font-semibold text-white mb-2">Welcome back 👋</h1>
          <p className="text-slate-400 mb-10">Here's your Velora business overview.</p>

          {/* Live Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard icon={<Users className="w-5 h-5 text-blue-400" />} label="Active Clients" value={String(stats.clientCount)} sub="Total onboarded" />
            <StatCard icon={<TrendingUp className="w-5 h-5 text-green-400" />} label="Total MRR" value={`₹${stats.totalMrr.toLocaleString()}`} sub="Monthly recurring" />
            <StatCard icon={<Users className="w-5 h-5 text-yellow-400" />} label="Leads" value={String(stats.leadsCount)} sub="In pipeline" />
            <StatCard icon={<Briefcase className="w-5 h-5 text-purple-400" />} label="Projects" value={String(stats.projectsCount)} sub="Active projects" />
          </div>

          {/* Quick Links */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { href: "/clients", label: "Manage Clients", desc: "View and add clients", color: "blue" },
              { href: "/leads", label: "Leads Pipeline",  desc: "Track your leads", color: "yellow" },
              { href: "/projects", label: "Projects", desc: "Monitor project progress", color: "purple" },
            ].map(({ href, label, desc, color }) => (
              <Link
                key={href}
                href={href}
                className={`group bg-white/[0.03] border border-white/10 hover:border-${color}-500/40 rounded-2xl p-6 transition-all hover:bg-white/[0.05]`}
              >
                <p className="font-semibold text-white mb-1">{label}</p>
                <p className="text-sm text-slate-400">{desc}</p>
              </Link>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
}

function StatCard({ icon, label, value, sub }: { icon: React.ReactNode; label: string; value: string; sub: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white/[0.04] border border-white/10 rounded-2xl p-6 flex flex-col gap-1 hover:border-blue-500/30 transition-all"
    >
      <div className="flex items-center gap-2 text-sm text-slate-400 mb-1">{icon} {label}</div>
      <div className="text-2xl font-semibold text-white">{value}</div>
      <div className="text-xs text-slate-500">{sub}</div>
    </motion.div>
  );
}


