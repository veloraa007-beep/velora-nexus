"use client";

import { useEffect, useState, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Search, X, Loader2, CheckCircle, AlertCircle } from "lucide-react";

type Client = {
  id: string;
  client_id: string;
  company_name: string;
  contact_name: string;
  phone: string;
  email: string;
  status: string;
  mrr: number;
  join_date: string;
  deadline: string;
  notes: string;
};

const STATUSES = ["Active", "At Risk", "Inactive", "Churned"];

const statusColor: Record<string, string> = {
  Active: "bg-green-500/15 text-green-400 border-green-500/30",
  "At Risk": "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
  Inactive: "bg-slate-500/15 text-slate-400 border-slate-500/30",
  Churned: "bg-red-500/15 text-red-400 border-red-500/30",
};

const empty = {
  client_id: "", company_name: "", contact_name: "", phone: "",
  email: "", status: "Active", mrr: 0, join_date: "", deadline: "", notes: "",
};

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [filtered, setFiltered] = useState<Client[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ ...empty });
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState<{ type: "success" | "error"; msg: string } | null>(null);

  const fetchClients = useCallback(async () => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("clients")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error && data) {
      setClients(data);
      setFiltered(data);
    }
    setLoading(false);
  }, []);

  useEffect(() => { fetchClients(); }, [fetchClients]);

  useEffect(() => {
    const q = search.toLowerCase();
    setFiltered(
      q ? clients.filter(c =>
        c.company_name?.toLowerCase().includes(q) ||
        c.contact_name?.toLowerCase().includes(q) ||
        c.email?.toLowerCase().includes(q)
      ) : clients
    );
  }, [search, clients]);

  const showToast = (type: "success" | "error", msg: string) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 3500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.company_name.trim()) return;
    setSubmitting(true);
    const supabase = createClient();
    const { error } = await supabase.from("clients").insert([{ ...form }]);
    setSubmitting(false);
    if (error) {
      showToast("error", "Failed to add client: " + error.message);
    } else {
      showToast("success", `${form.company_name} added successfully!`);
      setShowModal(false);
      setForm({ ...empty });
      fetchClients();
    }
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-200 font-sans p-6 md:p-10">
      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            className={`fixed top-5 right-5 z-50 flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium shadow-xl border ${
              toast.type === "success" ? "bg-green-500/10 border-green-500/30 text-green-400" : "bg-red-500/10 border-red-500/30 text-red-400"
            }`}
          >
            {toast.type === "success" ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
            {toast.msg}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-semibold text-white tracking-tight">Clients</h1>
          <p className="text-slate-400 mt-1 text-sm">Manage your agency's active and historical client relationships.</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-blue-500 hover:bg-blue-400 text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-all"
        >
          <Plus className="w-4 h-4" /> New Client
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-6 max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search clients..."
          className="w-full bg-slate-800/50 border border-slate-700/50 rounded-lg pl-9 pr-4 py-2.5 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
        />
      </div>

      {/* Table */}
      {loading ? (
        <div className="flex justify-center py-20"><Loader2 className="w-7 h-7 text-blue-400 animate-spin" /></div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 text-slate-500">
          {search ? "No clients match your search." : "No clients yet. Click 'New Client' to add one."}
        </div>
      ) : (
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 text-xs text-slate-400 uppercase tracking-wider">
                <th className="text-left px-6 py-4">Company</th>
                <th className="text-left px-6 py-4 hidden md:table-cell">Contact</th>
                <th className="text-left px-6 py-4 hidden lg:table-cell">Email</th>
                <th className="text-left px-6 py-4">Status</th>
                <th className="text-right px-6 py-4 hidden sm:table-cell">MRR</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c, i) => (
                <motion.tr
                  key={c.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="border-b border-white/5 hover:bg-white/[0.03] transition-colors"
                >
                  <td className="px-6 py-4 font-medium text-white">{c.company_name}</td>
                  <td className="px-6 py-4 text-slate-300 hidden md:table-cell">{c.contact_name}</td>
                  <td className="px-6 py-4 text-slate-400 hidden lg:table-cell">{c.email}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${statusColor[c.status] ?? statusColor["Inactive"]}`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right text-green-400 font-medium hidden sm:table-cell">
                    {c.mrr ? `₹${Number(c.mrr).toLocaleString()}` : "—"}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* New Client Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 flex items-center justify-center p-4"
            onClick={e => { if (e.target === e.currentTarget) setShowModal(false); }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="bg-[#1E293B] border border-slate-700 rounded-2xl shadow-2xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-white">New Client</h2>
                <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Company Name *" required value={form.company_name} onChange={v => setForm(f => ({ ...f, company_name: v }))} />
                  <Field label="Client ID" value={form.client_id} onChange={v => setForm(f => ({ ...f, client_id: v }))} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Contact Name" value={form.contact_name} onChange={v => setForm(f => ({ ...f, contact_name: v }))} />
                  <Field label="Phone" type="tel" value={form.phone} onChange={v => setForm(f => ({ ...f, phone: v }))} />
                </div>
                <Field label="Email" type="email" value={form.email} onChange={v => setForm(f => ({ ...f, email: v }))} />
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Status</label>
                    <select
                      value={form.status}
                      onChange={e => setForm(f => ({ ...f, status: e.target.value }))}
                      className="bg-[#0F172A] border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    >
                      {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <Field label="MRR (₹)" type="number" value={String(form.mrr)} onChange={v => setForm(f => ({ ...f, mrr: Number(v) }))} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Join Date" type="date" value={form.join_date} onChange={v => setForm(f => ({ ...f, join_date: v }))} />
                  <Field label="Deadline" type="date" value={form.deadline} onChange={v => setForm(f => ({ ...f, deadline: v }))} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Notes</label>
                  <textarea
                    rows={3}
                    value={form.notes}
                    onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
                    className="bg-[#0F172A] border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none"
                    placeholder="Additional notes..."
                  />
                </div>
                <div className="flex justify-end gap-3 pt-2">
                  <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2.5 text-sm text-slate-400 hover:text-white transition-colors">
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex items-center gap-2 bg-blue-500 hover:bg-blue-400 disabled:opacity-60 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-all"
                  >
                    {submitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</> : "Add Client"}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Field({ label, value, onChange, type = "text", required = false }: {
  label: string; value: string; onChange: (v: string) => void; type?: string; required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs text-slate-400 uppercase tracking-wider font-semibold">{label}</label>
      <input
        type={type}
        value={value}
        required={required}
        onChange={e => onChange(e.target.value)}
        className="bg-[#0F172A] border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
      />
    </div>
  );
}
