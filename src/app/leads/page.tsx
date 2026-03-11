"use client";

import { useEffect, useState, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X, Loader2, CheckCircle, AlertCircle } from "lucide-react";

type Lead = {
  id: string;
  company: string;
  contact: string;
  phone: string;
  email: string;
  stage: string;
  value: number;
};

const STAGES = [
  "New Inquiry",
  "Discovery Call Booked",
  "Proposal Sent",
  "Negotiation",
  "Closed Won",
  "Closed Lost",
];

const stageColors: Record<string, string> = {
  "New Inquiry": "border-slate-600",
  "Discovery Call Booked": "border-blue-500/50",
  "Proposal Sent": "border-purple-500/50",
  "Negotiation": "border-yellow-500/50",
  "Closed Won": "border-green-500/50",
  "Closed Lost": "border-red-500/50",
};

const empty = { company: "", contact: "", phone: "", email: "", stage: "New Inquiry", value: 0 };

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ ...empty });
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState<{ type: "success" | "error"; msg: string } | null>(null);

  const fetchLeads = useCallback(async () => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error && data) setLeads(data);
    setLoading(false);
  }, []);

  useEffect(() => { fetchLeads(); }, [fetchLeads]);

  const showToast = (type: "success" | "error", msg: string) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 3500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.company.trim()) return;
    setSubmitting(true);
    const supabase = createClient();
    const { error } = await supabase.from("leads").insert([{ ...form }]);
    setSubmitting(false);
    if (error) {
      showToast("error", "Failed to add lead: " + error.message);
    } else {
      showToast("success", `${form.company} added to pipeline!`);
      setShowModal(false);
      setForm({ ...empty });
      fetchLeads();
    }
  };

  const board = STAGES.map(stage => ({
    stage,
    items: leads.filter(l => l.stage === stage),
  }));

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

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-semibold text-white tracking-tight">Leads Pipeline</h1>
          <p className="text-slate-400 mt-1 text-sm">Track and manage prospective clients across the pipeline.</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-blue-500 hover:bg-blue-400 text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-all"
        >
          <Plus className="w-4 h-4" /> Add Lead
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><Loader2 className="w-7 h-7 text-blue-400 animate-spin" /></div>
      ) : (
        <div className="flex gap-4 overflow-x-auto pb-6">
          {board.map(({ stage, items }) => (
            <div key={stage} className="flex-shrink-0 w-72 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-300">{stage}</span>
                <span className="text-xs bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full">{items.length}</span>
              </div>
              <div className={`flex flex-col gap-3 min-h-[400px] p-3 bg-white/[0.02] rounded-xl border border-dashed ${stageColors[stage]}`}>
                {items.map((lead, i) => (
                  <motion.div
                    key={lead.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="bg-[#1E293B] border border-slate-700 rounded-xl p-4 hover:border-blue-500/40 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <p className="font-semibold text-white text-sm leading-snug">{lead.company}</p>
                      {lead.value > 0 && (
                        <span className="text-xs text-green-400 font-medium whitespace-nowrap ml-2">₹{Number(lead.value).toLocaleString()}</span>
                      )}
                    </div>
                    {lead.contact && <p className="text-xs text-slate-400">{lead.contact}</p>}
                  </motion.div>
                ))}
                {items.length === 0 && (
                  <div className="flex-1 flex items-center justify-center text-xs text-slate-600">No leads here</div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Lead Modal */}
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
              className="bg-[#1E293B] border border-slate-700 rounded-2xl shadow-2xl w-full max-w-md p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-white">Add Lead</h2>
                <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <Field label="Company *" required value={form.company} onChange={v => setForm(f => ({ ...f, company: v }))} />
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Contact Name" value={form.contact} onChange={v => setForm(f => ({ ...f, contact: v }))} />
                  <Field label="Phone" type="tel" value={form.phone} onChange={v => setForm(f => ({ ...f, phone: v }))} />
                </div>
                <Field label="Email" type="email" value={form.email} onChange={v => setForm(f => ({ ...f, email: v }))} />
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Stage</label>
                    <select
                      value={form.stage}
                      onChange={e => setForm(f => ({ ...f, stage: e.target.value }))}
                      className="bg-[#0F172A] border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    >
                      {STAGES.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <Field label="Deal Value (₹)" type="number" value={String(form.value)} onChange={v => setForm(f => ({ ...f, value: Number(v) }))} />
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
                    {submitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</> : "Add Lead"}
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
        type={type} value={value} required={required}
        onChange={e => onChange(e.target.value)}
        className="bg-[#0F172A] border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
      />
    </div>
  );
}
