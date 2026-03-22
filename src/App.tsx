import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Individual from "./pages/Individual";
import Business from "./pages/Business";
import Company from "./pages/Company";
import TaxPage from "./pages/TaxPage";
import Investments from "./pages/Investments";
import AiInsights from "./pages/AiInsights";
import Reports from "./pages/Reports";
import SettingsPage from "./pages/SettingsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/individual" element={<Individual />} />
          <Route path="/business" element={<Business />} />
          <Route path="/company" element={<Company />} />
          <Route path="/tax" element={<TaxPage />} />
          <Route path="/investments" element={<Investments />} />
          <Route path="/ai-insights" element={<AiInsights />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
