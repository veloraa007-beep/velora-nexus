"use client";

import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AnalyticsPage() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground mt-1">Deep dive into your agency&apos;s performance metrics.</p>
        </div>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" /> Export Report
        </Button>
      </div>

      <div className="h-[60vh] rounded-xl border border-dashed flex flex-col items-center justify-center bg-muted/20 text-muted-foreground p-8 text-center">
        <h2 className="text-xl font-semibold text-foreground mb-2">Advanced Analytics Module</h2>
        <p className="max-w-md">Connect your Google Analytics, Microsoft Clarity, or custom data warehouse to populate this space with comprehensive charts.</p>
        <Button className="mt-6" variant="secondary">Connect Data Source</Button>
      </div>
    </motion.div>
  );
}
