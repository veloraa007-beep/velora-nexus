"use client";

import { motion } from "framer-motion";
import { User, Building2, Bell, Shield, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SettingsPage() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6 max-w-4xl"
    >
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your account preferences and workspace configurations.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Settings Navigation Sidebar */}
        <div className="w-full md:w-64 space-y-1">
          <Button variant="secondary" className="w-full justify-start font-medium">
            <User className="mr-2 h-4 w-4" /> Profile
          </Button>
          <Button variant="ghost" className="w-full justify-start text-muted-foreground">
            <Building2 className="mr-2 h-4 w-4" /> Workspace
          </Button>
          <Button variant="ghost" className="w-full justify-start text-muted-foreground">
            <Bell className="mr-2 h-4 w-4" /> Notifications
          </Button>
          <Button variant="ghost" className="w-full justify-start text-muted-foreground">
            <Shield className="mr-2 h-4 w-4" /> Security
          </Button>
          <Button variant="ghost" className="w-full justify-start text-muted-foreground">
            <Wallet className="mr-2 h-4 w-4" /> Billing
          </Button>
        </div>

        {/* Settings Content Area */}
        <div className="flex-1 space-y-6">
          <div className="rounded-xl border bg-card text-card-foreground shadow-sm">
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold">Personal Information</h2>
              <p className="text-sm text-muted-foreground mt-1">Update your personal details and public profile.</p>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">First Name</label>
                  <Input defaultValue="Harshit" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Last Name</label>
                  <Input defaultValue="Gowda" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email Address</label>
                <Input defaultValue="harshit@veloranexus.com" type="email" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Role / Title</label>
                <Input defaultValue="Co-Founder & CEO" />
              </div>
              <div className="pt-4">
                <Button>Save Changes</Button>
              </div>
            </div>
          </div>
          
          <div className="rounded-xl border border-destructive/20 bg-destructive/5 text-card-foreground shadow-sm">
            <div className="p-6 border-b border-destructive/10">
              <h2 className="text-xl font-semibold text-destructive">Danger Zone</h2>
              <p className="text-sm text-muted-foreground mt-1">Irreversible actions for your account.</p>
            </div>
            <div className="p-6 flex justify-between items-center">
              <div>
                <h3 className="font-medium text-sm">Delete Account</h3>
                <p className="text-xs text-muted-foreground mt-1">Permanently remove your personal account and all data.</p>
              </div>
              <Button variant="destructive">Delete Account</Button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
