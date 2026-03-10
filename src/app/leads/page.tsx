"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, MoreHorizontal } from "lucide-react";
import { motion } from "framer-motion";
import { mockLeadsAndClients } from "@/lib/mockData";

const STAGES = ["New Inquiry", "Discovery Call Booked", "Proposal Sent", "Negotiation", "Closed Won", "Closed Lost"];

export default function LeadsPage() {
  const board = STAGES.map(stage => {
    const items = mockLeadsAndClients.filter(lead => lead.dealStage === stage);
    return {
      title: stage,
      count: items.length,
      items: items.map(item => ({
        id: item.id,
        name: item.businessName,
        contact: item.clientName,
        value: item.estimatedDealValue || item.finalDealValue
      }))
    };
  });
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-full flex flex-col gap-4"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Leads Pipeline</h1>
          <p className="text-muted-foreground">Manage and track prospective clients.</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Lead
        </Button>
      </div>

      <div className="flex-1 flex gap-4 overflow-x-auto pb-4">
        {board.map((column, idx) => (
          <div key={idx} className="flex-shrink-0 w-80 flex flex-col gap-3">
            <div className="flex items-center justify-between font-semibold">
              <div className="flex items-center gap-2">
                <span>{column.title}</span>
                <Badge variant="secondary" className="rounded-full">{column.count}</Badge>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex flex-col gap-3 min-h-[500px] p-2 bg-muted/50 rounded-xl border border-dashed border-border">
              {column.items.map((item) => (
                <Card key={item.id} className="cursor-grab active:cursor-grabbing hover:border-primary/50 transition-colors">
                  <CardHeader className="p-4 pb-2">
                    <CardTitle className="text-base flex justify-between">
                      {item.name}
                      <span className="text-sm font-normal text-muted-foreground">{item.value}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-sm text-muted-foreground">{item.contact}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
