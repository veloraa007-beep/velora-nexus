"use client";

import { Bell, Search, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThemeToggle } from "./ThemeToggle";
import { logoutAction } from "@/app/login/actions";

interface HeaderProps {
  setSidebarOpen: (open: boolean) => void;
  userEmail?: string;
  userName?: string;
}

export function Header({ setSidebarOpen }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-slate-200 dark:border-white/5 bg-white/50 dark:bg-[#020617]/50 backdrop-blur-xl px-6">
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
        onClick={() => setSidebarOpen(true)}
      >
        <Menu className="h-5 w-5" />
        <span className="sr-only">Toggle sidebar</span>
      </Button>

      <div className="flex-1">
        <form className="hidden sm:block">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400 dark:text-slate-500" />
            <Input
              type="search"
              placeholder="Search clients, leads, or projects... (⌘K)"
              className="w-full appearance-none bg-slate-100 dark:bg-white/5 pl-9 md:w-2/3 lg:w-1/3 border-slate-200 dark:border-white/10 focus-visible:ring-blue-500/50 transition-all hover:bg-slate-200 dark:hover:bg-white/10 text-sm rounded-xl"
            />
          </div>
        </form>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <ThemeToggle />
        <Button variant="ghost" size="icon" className="relative text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-blue-500 border-2 border-slate-50 dark:border-[#020617]"></span>
          <span className="sr-only">Notifications</span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-9 w-9 sm:h-9 sm:w-auto sm:px-2 rounded-full sm:rounded-full border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 transition-all">
              <Avatar className="h-7 w-7 sm:mr-2">
                <AvatarFallback className="bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-semibold">HG</AvatarFallback>
              </Avatar>
              <span className="hidden sm:inline-block text-sm font-medium mr-1 tracking-tight text-slate-900 dark:text-slate-200">Harshit Gowda</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">Harshit Gowda</p>
                <p className="text-xs leading-none text-muted-foreground">
                  harshit@velora.com
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <form action={logoutAction} className="w-full">
                <button type="submit" className="w-full text-left cursor-pointer">Log out</button>
              </form>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
