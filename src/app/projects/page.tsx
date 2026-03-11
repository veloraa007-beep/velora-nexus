"use client";

import { useEffect, useState, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X, Loader2, CheckCircle, AlertCircle, Clock } from "lucide-react";

type Project = {
  id: string;
  project_name: string;
  client: string;
  service_type: string;
  status: string;
  progress: number;
  deadline: string;
};

const STATUSES = ["Planning", "In Progress", "On Track", "At Risk", "Completed", "On Hold"];
const SERVICE_TYPES = [
  "Website Development", "Mobile App Development", "SEO Optimization",
  "Instagram Management", "WhatsApp Automation", "Lead Funnels",
  "NFC Business Cards", "Digital Identity", "Logo Design", "Branding",
];

const statusStyle: Record<string, string> = {
  "In Progress": "bg-blue-500/15 text-blue-400 border-blue-500/30",
  "On Track": "bg-green-500/15 text-green-400 border-green-500/30",
  "Planning": "bg-slate-500/15 text-slate-400 border-slate-500/30",
  "At Risk": "bg-red-500/15 text-red-400 border-red-500/30",
  "Completed": "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  "On Hold": "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
};

const progressColor: Record<string, string> = {
  "At Risk": "bg-red-500",
  "Completed": "bg-emerald-500",
  default: "bg-blue-500",
};

const empty = { project_name: "", client: "", service_type: SERVICE_TYPES[0], status: "Planning", progress: 0, deadline: "" };

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ ...empty });
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState<{ type: "success" | "error"; msg: string } | null>(null);

  const fetchProjects = useCallback(async () => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error && data) setProjects(data);
    setLoading(false);
  }, []);

  useEffect(() => { fetchProjects(); }, [fetchProjects]);

  const showToast = (type: "success" | "error", msg: string) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 3500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.project_name.trim()) return;
    setSubmitting(true);
    const supabase = createClient();
    const { error } = await supabase.from("projects").insert([{ ...form }]);
    setSubmitting(false);
    if (error) {
      showToast("error", "Failed to add project: " + error.message);
    } else {
      showToast("success", `${form.project_name} created!`);
      setShowModal(false);
      setForm({ ...empty });
      fetchProjects();
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

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-semibold text-white tracking-tight">Projects</h1>
          <p className="text-slate-400 mt-1 text-sm">Track and manage your agency's active project deliverables.</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-blue-500 hover:bg-blue-400 text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-all"
        >
          <Plus className="w-4 h-4" /> New Project
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><Loader2 className="w-7 h-7 text-blue-400 animate-spin" /></div>
      ) : projects.length === 0 ? (
        <div className="text-center py-20 text-slate-500">No projects yet. Click 'New Project' to get started.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 hover:border-blue-500/30 hover:bg-white/[0.05] transition-all"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold text-white text-base mb-0.5">{project.project_name}</h3>
                  <p className="text-sm text-slate-400">{project.client}</p>
                </div>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border whitespace-nowrap ${statusStyle[project.status] ?? statusStyle["Planning"]}`}>
                  {project.status}
                </span>
              </div>

              {project.service_type && (
                <p className="text-xs text-slate-500 mb-4">{project.service_type}</p>
              )}

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Progress</span>
                  <span className="font-medium text-white">{project.progress ?? 0}%</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-1.5">
                  <div
                    className={`h-1.5 rounded-full transition-all ${progressColor[project.status] ?? progressColor["default"]}`}
                    style={{ width: `${project.progress ?? 0}%` }}
                  />
                </div>
              </div>

              {project.deadline && (
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <Clock className="w-3.5 h-3.5" />
                  {new Date(project.deadline).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}

      {/* New Project Modal */}
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
                <h2 className="text-lg font-semibold text-white">New Project</h2>
                <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <Field label="Project Name *" required value={form.project_name} onChange={v => setForm(f => ({ ...f, project_name: v }))} />
                <Field label="Client" value={form.client} onChange={v => setForm(f => ({ ...f, client: v }))} />

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Service Type</label>
                  <select
                    value={form.service_type}
                    onChange={e => setForm(f => ({ ...f, service_type: e.target.value }))}
                    className="bg-[#0F172A] border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  >
                    {SERVICE_TYPES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>

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
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Progress (%)</label>
                    <input
                      type="number" min={0} max={100}
                      value={form.progress}
                      onChange={e => setForm(f => ({ ...f, progress: Number(e.target.value) }))}
                      className="bg-[#0F172A] border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    />
                  </div>
                </div>

                <Field label="Deadline" type="date" value={form.deadline} onChange={v => setForm(f => ({ ...f, deadline: v }))} />

                <div className="flex justify-end gap-3 pt-2">
                  <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2.5 text-sm text-slate-400 hover:text-white transition-colors">
                    Cancel
                  </button>
                  <button
                    type="submit" disabled={submitting}
                    className="flex items-center gap-2 bg-blue-500 hover:bg-blue-400 disabled:opacity-60 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-all"
                  >
                    {submitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</> : "Create Project"}
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
