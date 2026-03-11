"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, Users, Briefcase, Target, Loader2, AlertCircle, Download } from "lucide-react";
import {
  BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";

type Row = {
  Month: string;
  Revenue: string;
  Clients: string;
  Leads: string;
  Projects: string;
};

type ParsedRow = {
  month: string;
  revenue: number;
  clients: number;
  leads: number;
  projects: number;
};

export default function AnalyticsPage() {
  const [data, setData] = useState<ParsedRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetch("/api/analytics");
        const json = await res.json();

        if (json.error) {
          setError(json.error);
          return;
        }

        const rows: Row[] = json.rows ?? [];
        const parsed: ParsedRow[] = rows.map((r) => ({
          month: r.Month ?? "",
          revenue: Number(r.Revenue) || 0,
          clients: Number(r.Clients) || 0,
          leads: Number(r.Leads) || 0,
          projects: Number(r.Projects) || 0,
        }));

        setData(parsed);
      } catch (err: any) {
        setError(err.message ?? "Failed to load analytics");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const totals = data.reduce(
    (acc, r) => ({
      revenue: acc.revenue + r.revenue,
      clients: acc.clients + r.clients,
      leads: acc.leads + r.leads,
      projects: acc.projects + r.projects,
    }),
    { revenue: 0, clients: 0, leads: 0, projects: 0 }
  );

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-slate-400">
          <Loader2 className="w-8 h-8 animate-spin text-blue-400" />
          <p className="text-sm">Loading analytics from Google Sheets...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-center max-w-md">
          <AlertCircle className="w-10 h-10 text-red-400" />
          <h2 className="text-lg font-semibold text-white">Failed to load analytics</h2>
          <p className="text-sm text-slate-400">{error}</p>
          <p className="text-xs text-slate-500">Make sure your Google Sheet is shared publicly (Anyone with link → Viewer).</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-8 p-6 md:p-10 min-h-screen bg-[#0F172A] text-slate-200 font-sans"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-white tracking-tight">Analytics</h1>
          <p className="text-slate-400 mt-1 text-sm">Live performance data from Google Sheets.</p>
        </div>
        <button
          onClick={() => window.print()}
          className="flex items-center gap-2 text-sm text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 px-4 py-2.5 rounded-lg transition-all"
        >
          <Download className="w-4 h-4" /> Export Report
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <SummaryCard icon={<TrendingUp className="w-5 h-5 text-green-400" />} label="Total Revenue" value={`₹${totals.revenue.toLocaleString()}`} color="green" />
        <SummaryCard icon={<Users className="w-5 h-5 text-blue-400" />} label="Total Clients" value={String(totals.clients)} color="blue" />
        <SummaryCard icon={<Target className="w-5 h-5 text-yellow-400" />} label="Total Leads" value={String(totals.leads)} color="yellow" />
        <SummaryCard icon={<Briefcase className="w-5 h-5 text-purple-400" />} label="Total Projects" value={String(totals.projects)} color="purple" />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Bar Chart */}
        <ChartCard title="Revenue Growth">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
              <XAxis dataKey="month" tick={{ fill: "#94A3B8", fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#94A3B8", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `₹${(v/1000).toFixed(0)}k`} />
              <Tooltip
                contentStyle={{ backgroundColor: "#1E293B", border: "1px solid #334155", borderRadius: "8px", color: "#F1F5F9" }}
                formatter={(v: number) => [`₹${v.toLocaleString()}`, "Revenue"]}
              />
              <Bar dataKey="revenue" fill="#3B82F6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Client Growth Line Chart */}
        <ChartCard title="Client Growth">
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
              <XAxis dataKey="month" tick={{ fill: "#94A3B8", fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#94A3B8", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ backgroundColor: "#1E293B", border: "1px solid #334155", borderRadius: "8px", color: "#F1F5F9" }} />
              <Line type="monotone" dataKey="clients" stroke="#22C55E" strokeWidth={2.5} dot={{ r: 4, fill: "#22C55E" }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Lead Generation Line Chart */}
        <ChartCard title="Lead Generation">
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
              <XAxis dataKey="month" tick={{ fill: "#94A3B8", fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#94A3B8", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ backgroundColor: "#1E293B", border: "1px solid #334155", borderRadius: "8px", color: "#F1F5F9" }} />
              <Line type="monotone" dataKey="leads" stroke="#F59E0B" strokeWidth={2.5} dot={{ r: 4, fill: "#F59E0B" }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Projects Bar Chart */}
        <ChartCard title="Projects Completed">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
              <XAxis dataKey="month" tick={{ fill: "#94A3B8", fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#94A3B8", fontSize: 11 }} axisLine={false} tickLine={false} allowDecimals={false} />
              <Tooltip contentStyle={{ backgroundColor: "#1E293B", border: "1px solid #334155", borderRadius: "8px", color: "#F1F5F9" }} />
              <Bar dataKey="projects" fill="#A855F7" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Combined Trends */}
      <ChartCard title="Combined Trends">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
            <XAxis dataKey="month" tick={{ fill: "#94A3B8", fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "#94A3B8", fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ backgroundColor: "#1E293B", border: "1px solid #334155", borderRadius: "8px", color: "#F1F5F9" }} />
            <Legend wrapperStyle={{ color: "#94A3B8", fontSize: 12 }} />
            <Line type="monotone" dataKey="clients" stroke="#22C55E" strokeWidth={2} dot={false} name="Clients" />
            <Line type="monotone" dataKey="leads" stroke="#F59E0B" strokeWidth={2} dot={false} name="Leads" />
            <Line type="monotone" dataKey="projects" stroke="#A855F7" strokeWidth={2} dot={false} name="Projects" />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>
    </motion.div>
  );
}

function SummaryCard({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: string; color: string }) {
  const border: Record<string, string> = {
    green: "hover:border-green-500/40",
    blue: "hover:border-blue-500/40",
    yellow: "hover:border-yellow-500/40",
    purple: "hover:border-purple-500/40",
  };
  return (
    <motion.div whileHover={{ scale: 1.02 }} className={`bg-white/[0.04] border border-white/10 ${border[color]} rounded-2xl p-5 transition-all`}>
      <div className="flex items-center gap-2 text-sm text-slate-400 mb-2">{icon} {label}</div>
      <div className="text-2xl font-semibold text-white">{value}</div>
    </motion.div>
  );
}

function ChartCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6">
      <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4">{title}</h3>
      {children}
    </div>
  );
}
