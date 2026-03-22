import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import React from "react";

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const navigate = useNavigate();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">

        {/* LEFT SIDEBAR */}
        <AppSidebar />

        {/* RIGHT SIDE */}
        <div className="flex-1 flex flex-col min-w-0">

          {/* HEADER */}
          <header className="h-14 flex items-center border-b border-border bg-card px-4 gap-3 sticky top-0 z-30 card-shadow">

            {/* SIDEBAR TOGGLE */}
            <SidebarTrigger className="text-muted-foreground hover:text-foreground transition-colors" />

            <div className="h-5 w-px bg-border" />

            {/* 🔥 LOGO + TITLE (CLICKABLE) */}
            <div
              className="flex items-center gap-3 cursor-pointer group"
              onClick={() => navigate("/")}
            >
              <img
                src="https://res.cloudinary.com/debzdkdon/image/upload/v1774199673/smart_Tax-2_vpxd3s.png"
                alt="SmartTax Logo"
                className="w-7 h-7 object-contain"
              />

              <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition">
                SmartTax — Financial Intelligence Platform
              </span>
            </div>

            {/* STATUS DOT */}
            <div className="ml-auto flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs text-muted-foreground">Live</span>
            </div>

          </header>

          {/* MAIN CONTENT */}
          <main className="flex-1 p-6 overflow-auto">
            {children}
          </main>

          {/* FOOTER */}
          <Footer />

        </div>
      </div>
    </SidebarProvider>
  );
}