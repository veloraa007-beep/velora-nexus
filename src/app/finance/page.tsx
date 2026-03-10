"use client";

import { motion } from "framer-motion";
import { Receipt, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { mockLeadsAndClients } from "@/lib/mockData";
import { Badge } from "@/components/ui/badge";

export default function FinancePage() {
  const invoices = mockLeadsAndClients
    .filter(c => c.invoiceNumber)
    .map(c => ({
      id: c.invoiceNumber,
      client: c.businessName,
      amount: c.finalDealValue || c.estimatedDealValue,
      status: c.paymentStatus,
      method: c.paymentMethod,
    }));

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Finance</h1>
          <p className="text-muted-foreground mt-1">Manage invoicing, Stripe payments, and MRR tracking.</p>
        </div>
        <Button>
          <Receipt className="mr-2 h-4 w-4" /> Create Invoice
        </Button>
      </div>

      <div className="rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden">
        <div className="p-6 border-b bg-muted/20">
          <h2 className="font-semibold text-lg flex items-center gap-2">
            <FileText className="h-5 w-5 text-muted-foreground" />
            Recent Invoices
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted/50 text-muted-foreground font-medium border-b">
              <tr>
                <th className="px-6 py-4 whitespace-nowrap">Invoice #</th>
                <th className="px-6 py-4 whitespace-nowrap">Client</th>
                <th className="px-6 py-4 whitespace-nowrap">Amount</th>
                <th className="px-6 py-4 whitespace-nowrap">Method</th>
                <th className="px-6 py-4 whitespace-nowrap">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {invoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-muted/20 transition-colors">
                  <td className="px-6 py-4 font-medium">{inv.id}</td>
                  <td className="px-6 py-4">{inv.client}</td>
                  <td className="px-6 py-4 font-medium">{inv.amount}</td>
                  <td className="px-6 py-4 text-muted-foreground">{inv.method}</td>
                  <td className="px-6 py-4">
                    <Badge variant="outline" className={
                      inv.status === 'Paid' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 
                      'bg-amber-500/10 text-amber-500 border-amber-500/20'
                    }>
                      {inv.status}
                    </Badge>
                  </td>
                </tr>
              ))}
              {invoices.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">
                    No recent invoices found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}
