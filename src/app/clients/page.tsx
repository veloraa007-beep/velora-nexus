"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, MoreHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { mockLeadsAndClients } from "@/lib/mockData";

export default function ClientsPage() {
  const clients = mockLeadsAndClients
    .filter(lead => lead.dealStage === "Closed Won" || lead.businessName === "Oscorp") // Adding Oscorp to show different statuses
    .map(lead => ({
      id: lead.id,
      name: lead.businessName,
      contact: lead.clientName,
      status: lead.projectStatus === "In Progress" ? "Active" : lead.projectStatus === "Not Started" ? "At Risk" : "Active",
      mrr: lead.finalDealValue || lead.estimatedDealValue,
      joined: lead.startDate || lead.inquiryDate
    }));
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Clients</h1>
          <p className="text-muted-foreground">Manage your agency&apos;s active and historical client relationships.</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> New Client
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Filter clients..." className="pl-8" />
        </div>
        <Button variant="outline">Filters</Button>
      </div>

      <div className="border rounded-md bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Client ID</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Primary Contact</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>MRR</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {clients.map((client) => (
              <TableRow key={client.id}>
                <TableCell className="font-medium">{client.id}</TableCell>
                <TableCell className="font-semibold">{client.name}</TableCell>
                <TableCell>{client.contact}</TableCell>
                <TableCell>
                  <Badge variant={client.status === "Active" ? "default" : client.status === "At Risk" ? "destructive" : "secondary"}>
                    {client.status}
                  </Badge>
                </TableCell>
                <TableCell>{client.mrr}</TableCell>
                <TableCell className="text-muted-foreground">{client.joined}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </motion.div>
  );
}
