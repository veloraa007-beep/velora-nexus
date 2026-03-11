"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { motion } from "framer-motion";
import { Loader2, LogOut, LayoutDashboard, Activity, TrendingUp, Users, Zap } from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const checkSession = async () => {
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        // No valid session → redirect back to login
        router.replace("/login");
        return;
      }

      setUserEmail(session.user.email ?? null);
      setLoading(false);
    };

    checkSession();
  }, [router]);

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
          <div className="flex items-center gap-3">
            <LayoutDashboard className="w-5 h-5 text-blue-400" />
            <span className="text-lg font-semibold text-white tracking-tight">Velora Nexus</span>
            <span className="text-xs text-slate-500 border border-slate-700 px-2 py-0.5 rounded-full uppercase tracking-wider">Dashboard</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs text-slate-400 hidden sm:block">{userEmail}</span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-sm text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 px-3 py-2 rounded-lg transition-all"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Body */}
      <main className="max-w-7xl mx-auto px-6 py-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="text-3xl font-semibold text-white mb-2">Welcome back 👋</h1>
          <p className="text-slate-400 mb-10">Here's your Velora business overview.</p>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <StatCard icon={<TrendingUp className="w-5 h-5 text-green-400" />} label="Total Revenue" value="₹24,500" change="+12.5%" positive />
            <StatCard icon={<Users className="w-5 h-5 text-blue-400" />} label="Active Clients" value="18" change="+2 this month" positive />
            <StatCard icon={<Zap className="w-5 h-5 text-yellow-400" />} label="Automation Tasks" value="46 running" change="All healthy" positive />
          </div>

          {/* Activity Feed */}
          <div className="mt-10 bg-white/[0.03] border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <Activity className="w-4 h-4 text-slate-400" />
              <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">Recent Activity</h2>
            </div>
            <div className="space-y-3">
              {["New client onboarded: ArcoTech", "Invoice #1042 sent", "Automation workflow updated", "Revenue report generated"].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-sm text-slate-400 py-2 border-b border-slate-800 last:border-0">
                  <span className="w-2 h-2 rounded-full bg-blue-400 shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}

function StatCard({ icon, label, value, change, positive }: { icon: React.ReactNode; label: string; value: string; change: string; positive: boolean }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white/[0.04] border border-white/10 rounded-2xl p-6 flex flex-col gap-2 hover:border-blue-500/30 transition-all"
    >
      <div className="flex items-center gap-2 text-sm text-slate-400">{icon} {label}</div>
      <div className="text-2xl font-semibold text-white">{value}</div>
      <div className={`text-xs font-medium ${positive ? "text-green-400" : "text-red-400"}`}>{change}</div>
    </motion.div>
  );
}
