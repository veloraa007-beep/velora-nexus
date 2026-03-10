"use client";

import { motion } from "framer-motion";
import { Workflow, Play, Settings2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const automations = [
  { id: 1, name: "New Lead to CRM Sync", trigger: "Webflow Form", action: "Google Sheets & Slack", status: "Active", runs: 1254 },
  { id: 2, name: "Invoice Reminder Sequence", trigger: "Stripe Failed Payment", action: "Resend Email", status: "Active", runs: 89 },
  { id: 3, name: "Meeting Booking Notification", trigger: "Calendly", action: "Discord Channel", status: "Paused", runs: 0 },
];

export default function AutomationPage() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Automation</h1>
          <p className="text-muted-foreground mt-1">Manage external n8n and Zapier connected workflows.</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> New Workflow
        </Button>
      </div>

      <div className="grid gap-6">
        {automations.map((flow) => (
          <div key={flow.id} className="rounded-xl border bg-card text-card-foreground shadow-sm p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-primary/50 transition-colors">
            <div className="flex items-start gap-4">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mt-1 md:mt-0">
                <Workflow className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">{flow.name}</h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                  <span>{flow.trigger}</span>
                  <span className="text-border">→</span>
                  <span>{flow.action}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-right hidden md:block mr-4">
                <p className="text-sm font-medium">{flow.runs.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">Runs this month</p>
              </div>
              <Badge variant="outline" className={
                flow.status === 'Active' ? 'bg-primary/10 text-primary border-primary/20' : 'bg-muted text-muted-foreground'
              }>
                {flow.status}
              </Badge>
              <div className="flex gap-2">
                <Button variant="outline" size="icon">
                  <Play className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Settings2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
