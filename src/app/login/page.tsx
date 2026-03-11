"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { loginAction } from "./actions";
import { motion } from "framer-motion";
import { ArrowRight, Loader2, Activity, Users, Zap, TrendingUp, AlertCircle } from "lucide-react";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <motion.button
      type="submit"
      disabled={pending}
      whileTap={{ scale: pending ? 1 : 0.97 }}
      className="w-full mt-6 group flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-400 text-white font-medium py-3 rounded-lg transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
    >
      {pending ? (
        <>
          <Loader2 className="w-5 h-5 animate-spin" />
          Loading...
        </>
      ) : (
        <>
          Enter Dashboard
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </>
      )}
    </motion.button>
  );
}

export default function LoginPage() {
  const [state, formAction] = useActionState(loginAction, null);

  return (
    <div className="flex min-h-screen bg-[#0F172A] text-slate-200 overflow-hidden font-sans">
      
      {/* LEFT SIDE - Animated SaaS Background */}
      <div className="relative hidden lg:flex flex-1 flex-col justify-center items-center bg-gradient-to-br from-[#0F172A] to-[#111827] overflow-hidden p-12">
        
        {/* Abstract Glows */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-[100px]" />

        {/* Animated Dashboard Widgets */}
        <div className="relative z-10 w-full max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-8"
          >
            <h1 className="text-4xl font-light tracking-tight text-white mb-2">
              Next-Gen Operating System
            </h1>
            <p className="text-slate-400 text-lg max-w-md">
              High-performance infrastructure for modern digital agencies.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 gap-6 relative">
            
            {/* Background Line Chart Effect */}
            <motion.div 
              className="absolute -right-24 -top-20 opacity-30 pointer-events-none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ opacity: 0.3 }}
              transition={{ duration: 1 }}
            >
              <svg width="400" height="200" viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                <motion.path 
                  d="M0 200 Q 50 180, 100 150 T 200 120 T 300 80 T 400 20" 
                  stroke="#22C55E" 
                  strokeWidth="3"
                  strokeLinecap="round"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 3, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
                />
                <motion.circle cx="100" cy="150" r="4" fill="#22C55E" animate={{ opacity: [0,1,0] }} transition={{ duration: 2, repeat: Infinity, delay: 0.5 }} />
                <motion.circle cx="200" cy="120" r="4" fill="#22C55E" animate={{ opacity: [0,1,0] }} transition={{ duration: 2, repeat: Infinity, delay: 1 }} />
                <motion.circle cx="300" cy="80" r="4" fill="#22C55E" animate={{ opacity: [0,1,0] }} transition={{ duration: 2, repeat: Infinity, delay: 1.5 }} />
              </svg>
            </motion.div>

            {/* Card 1 */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl shadow-xl flex items-center justify-between"
            >
              <div>
                <p className="text-sm text-slate-400 mb-1 flex items-center gap-2"><TrendingUp className="w-4 h-4 text-green-400" /> Revenue</p>
                <motion.p 
                  className="text-2xl font-semibold text-white tracking-wide"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
                >
                  ₹24,500 <span className="text-green-400 text-sm font-normal">↑</span>
                </motion.p>
              </div>
            </motion.div>

            {/* Card 2 */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl shadow-xl flex items-center justify-between mt-8"
            >
              <div>
                <p className="text-sm text-slate-400 mb-1 flex items-center gap-2"><Users className="w-4 h-4 text-blue-400" /> Active Clients</p>
                <div className="text-2xl font-semibold text-white tracking-wide">18</div>
              </div>
            </motion.div>

            {/* Card 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl shadow-xl col-span-2 flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-slate-400 mb-1">Automation Tasks</p>
                  <div className="text-lg font-medium text-white">46 <span className="text-blue-400 text-sm ml-1">running automatically</span></div>
                </div>
              </div>
              <Activity className="w-6 h-6 text-slate-500 animate-pulse" />
            </motion.div>
          </div>
        </div>

        {/* Branding Footer */}
        <div className="absolute bottom-8 left-12 text-sm text-slate-500 tracking-wide">
          Velora Nexus v1
        </div>
      </div>

      {/* RIGHT SIDE - Login Panel */}
      <div className="flex-1 flex flex-col justify-center items-center p-8 bg-[#0F172A] relative z-20 shadow-[-20px_0_40px_-10px_rgba(0,0,0,0.5)]">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-[420px]"
        >
          {/* Form Card */}
          <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 p-10 rounded-[14px] shadow-2xl">
            <div className="mb-8">
              <h2 className="text-3xl font-semibold text-white tracking-tight mb-1">Velora Nexus</h2>
              <p className="text-slate-400 text-sm mb-6 uppercase tracking-wider font-semibold">Business Operating System</p>
              <div className="h-[1px] w-full bg-gradient-to-r from-blue-500/50 to-transparent mb-6"></div>
              <h3 className="text-xl font-medium text-slate-200">Secure Login</h3>
            </div>

            <form action={formAction} className="space-y-5">
              {state?.error && (
                <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm p-3 rounded-lg flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <p>{state.error}</p>
                </div>
              )}

              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider ml-1">
                  User ID
                </label>
                <div className="relative group">
                  <input 
                    name="userId"
                    type="text"
                    required
                    placeholder="0001"
                    className="w-full bg-[#0F172A]/50 border border-slate-700/50 rounded-lg px-4 py-3 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all font-mono"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider ml-1">
                  Password
                </label>
                <div className="relative">
                  <input 
                    name="password"
                    type="password"
                    required
                    placeholder="••••••"
                    className="w-full bg-[#0F172A]/50 border border-slate-700/50 rounded-lg px-4 py-3 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all font-mono tracking-widest"
                  />
                </div>
              </div>

              <SubmitButton />
            </form>

            <div className="mt-8 pt-6 border-t border-slate-800 text-center">
              <p className="text-xs text-slate-500 uppercase tracking-widest font-semibold flex flex-col gap-1">
                <span>Authorized Users Only</span>
                <span className="text-slate-600">Velora Internal System</span>
              </p>
            </div>
          </div>
        </motion.div>
      </div>

    </div>
  );
}
