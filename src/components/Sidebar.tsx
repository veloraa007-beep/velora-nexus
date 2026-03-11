"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  BarChart3, 
  Users, 
  Target, 
  FolderKanban, 
  Users2, 
  LineChart, 
  Receipt, 
  Workflow, 
  Bot, 
  Settings,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navItems = [
  { name: "Velora HQ", href: "/", icon: BarChart3 },
  { name: "Clients", href: "/clients", icon: Users },
  { name: "Leads", href: "/leads", icon: Target },
  { name: "Projects", href: "/projects", icon: FolderKanban },
  { name: "Team", href: "/team", icon: Users2 },
  { name: "Analytics", href: "/analytics", icon: LineChart },
  { name: "Finance", href: "/finance", icon: Receipt },
  { name: "Automation", href: "/automation", icon: Workflow },
  { name: "Chatbot", href: "/chatbot", icon: Bot },
  { name: "Settings", href: "/settings", icon: Settings },
];

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      {/* Sidebar container */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-[#020617] border-r border-slate-200 dark:border-white/5 transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:flex lg:flex-col",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-slate-200 dark:border-white/5">
          <Link href="/dashboard" className="flex items-center gap-2 font-bold text-xl tracking-tight text-slate-900 dark:text-white hover:opacity-80 transition-opacity">
            <div className="bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 h-7 w-7 rounded-lg flex items-center justify-center shadow-sm border border-blue-200 dark:border-blue-500/20">
              <span className="text-sm font-bold">V</span>
            </div>
            Velora Nexus
          </Link>
          <Button variant="ghost" size="icon" className="lg:hidden text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white" onClick={() => setIsOpen(false)}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1.5 scrollbar-hide">
          <div className="text-[10px] font-semibold text-slate-500 mb-4 px-2 uppercase tracking-widest">Menu</div>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group",
                  isActive 
                    ? "bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-500/10 backdrop-blur-md shadow-sm" 
                    : "text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white border border-transparent"
                )}
                onClick={() => setIsOpen(false)}
              >
                <item.icon className={cn(
                  "h-4 w-4 transition-colors", 
                  isActive ? "text-blue-600 dark:text-blue-400" : "text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-300"
                )} />
                {item.name}
              </Link>
            );
          })}
        </nav>
        
        <div className="p-4 border-t border-slate-200 dark:border-white/5">
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 cursor-pointer transition-all border border-transparent hover:border-slate-200 dark:hover:border-white/5 group">
            <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-xs ring-1 ring-blue-200 dark:ring-blue-500/30 group-hover:bg-blue-200 dark:group-hover:bg-blue-500/30 transition-colors">
              WS
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-slate-900 dark:text-slate-200 leading-tight">Main Workspace</span>
              <span className="text-[11px] text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-400 transition-colors">Pro Plan</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
