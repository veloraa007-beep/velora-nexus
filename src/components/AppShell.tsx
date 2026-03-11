"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  
  const isAuthRoute = pathname === '/login';

  if (isAuthRoute) {
    return <main className="flex-1 w-full min-h-screen">{children}</main>;
  }

  return (
    <div className="flex min-h-screen w-full bg-slate-50 dark:bg-gradient-to-br dark:from-[#020617] dark:via-[#020617] dark:to-[#0F172A] text-slate-900 dark:text-slate-200 selection:bg-blue-500/30">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14 lg:pl-0 flex-1 overflow-hidden transition-all duration-300 ease-in-out">
        <Header setSidebarOpen={setSidebarOpen} />
        <main className="flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
