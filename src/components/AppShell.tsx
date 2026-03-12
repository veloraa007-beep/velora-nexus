"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { cn } from "@/lib/utils";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  
  const isAuthRoute = pathname === '/login';

  return (
    <div className="flex min-h-screen w-full bg-[#f8fafc] dark:bg-background text-slate-900 dark:text-slate-200 selection:bg-primary/30 selection:text-primary transition-colors duration-500">
      {/* Background Glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 opacity-20 dark:opacity-40">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-primary blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/30 blur-[120px]" />
      </div>
      {!isAuthRoute && <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />}
      <div className={cn(
        "flex flex-col flex-1 overflow-hidden transition-all duration-300 ease-in-out relative z-10",
        !isAuthRoute && "sm:gap-4 sm:py-4 sm:pl-14 lg:pl-0"
      )}>
        {!isAuthRoute && <Header setSidebarOpen={setSidebarOpen} />}
        <main className={cn(
          "flex-1 items-start overflow-y-auto scrollbar-hide",
          !isAuthRoute ? "gap-4 p-4 sm:px-6 sm:py-6 md:gap-8" : "p-0"
        )}>
          <div className={cn(
            "animate-fade-in w-full",
            !isAuthRoute ? "max-w-[1600px] mx-auto" : "h-full"
          )}>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
