"use client";

import { motion } from "framer-motion";
import { Bot, Send, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ChatbotPage() {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col h-[calc(100vh-10rem)]"
    >
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">AI Assistant</h1>
        <p className="text-muted-foreground mt-1">Talk to your agency data, query CRM records, or generate insights.</p>
      </div>

      <div className="flex-1 rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden flex flex-col">
        <div className="flex-1 p-6 overflow-y-auto space-y-6">
          <div className="flex gap-4">
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center shrink-0">
              <Bot className="h-4 w-4 text-primary-foreground" />
            </div>
            <div className="bg-muted p-4 rounded-2xl rounded-tl-none max-w-[80%] text-sm">
              <p>Hello! I&apos;m your Velora Nexus AI. I have access to your contacts, active leads, and current projects. How can I assist your agency today?</p>
            </div>
          </div>
          
          <div className="flex gap-4 flex-row-reverse">
            <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center shrink-0 border">
              <span className="text-xs font-medium">HG</span>
            </div>
            <div className="bg-primary text-primary-foreground p-4 rounded-2xl rounded-tr-none max-w-[80%] text-sm">
              <p>Can you summarize the status of the Wayne Enterprises logistics project?</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center shrink-0">
              <Sparkles className="h-4 w-4 text-primary-foreground" />
            </div>
            <div className="bg-muted p-4 rounded-2xl rounded-tl-none max-w-[80%] text-sm">
              <p>Certainly. The <strong>Wayne Enterprises Logistics SaaS</strong> project is currently in the <strong>Setup</strong> phase. It was initiated on Nov 12, 2024, by John Doe. The estimated deal value is ₹18,000. Currently waiting on NDA finalization before moving into development sprints.</p>
            </div>
          </div>
        </div>

        <div className="p-4 border-t bg-muted/10">
          <form className="relative flex items-center" onSubmit={(e) => e.preventDefault()}>
            <Input 
              placeholder="Ask anything about your agency..." 
              className="pr-12 bg-background border-muted-foreground/20 focus-visible:ring-primary/50 shadow-sm"
            />
            <Button size="icon" type="submit" variant="ghost" className="absolute right-1 text-muted-foreground hover:text-primary">
              <Send className="h-4 w-4" />
            </Button>
          </form>
          <div className="text-center mt-2">
            <span className="text-[10px] text-muted-foreground">AI can make mistakes. Verify important business data.</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
