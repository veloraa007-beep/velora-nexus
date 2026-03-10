"use client";

import { motion } from "framer-motion";
import { Users2, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const teamMembers = [
  { id: 1, name: "Harshit Gowda", role: "Co-Founder & CEO", initials: "HG", email: "harshit@veloranexus.com" },
  { id: 2, name: "Sarah Connor", role: "Head of Operations", initials: "SC", email: "sarah@veloranexus.com" },
  { id: 3, name: "John Doe", role: "Lead Developer", initials: "JD", email: "john@veloranexus.com" },
  { id: 4, name: "Alice Smith", role: "UX Designer", initials: "AS", email: "alice@veloranexus.com" },
];

export default function TeamPage() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Team Directory</h1>
          <p className="text-muted-foreground mt-1">Manage your internal agency team members and access roles.</p>
        </div>
        <Button>
          <Users2 className="mr-2 h-4 w-4" /> Invite Member
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {teamMembers.map((member) => (
          <div key={member.id} className="rounded-xl border bg-card text-card-foreground shadow-sm p-6 flex flex-col items-center text-center hover:border-primary/50 transition-colors">
            <Avatar className="h-20 w-20 mb-4 border-2 border-primary/20">
              <AvatarFallback className="text-xl bg-primary/10 text-primary font-semibold">{member.initials}</AvatarFallback>
            </Avatar>
            <h3 className="font-semibold text-lg">{member.name}</h3>
            <p className="text-sm text-primary font-medium mb-4">{member.role}</p>
            
            <div className="flex gap-2 mt-auto w-full pt-4 border-t border-border/50">
              <Button variant="outline" size="sm" className="w-full">
                <Mail className="h-4 w-4 mr-2" /> Email
              </Button>
              <Button variant="outline" size="sm" className="w-full">
                <Phone className="h-4 w-4 mr-2" /> Call
              </Button>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
