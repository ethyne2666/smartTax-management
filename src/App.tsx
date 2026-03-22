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
import WhatWeDo from "./pages/WhatWeDo";
import TaxPlanning from "./pages/searchPages/TaxPlanning";
import InvestmentStrategies from "./pages/searchPages/InvestmentStrategies";
import GlobalMarkets from "./pages/searchPages/GlobalMarkets";
import InvestorRelations from "./pages/searchPages/InvestorRelations";
import Insights from "./pages/searchPages/Insights";
import GlobalResearch from "./pages/insights/GlobalResearch";



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
          <Route path="/what-we-do" element={<WhatWeDo />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/investor-relations" element={<InvestorRelations />} />
          <Route path="/global-markets" element={<GlobalMarkets />} />
          <Route path="/tax-planning" element={<TaxPlanning />} />
        <Route path="/investment-strategies" element={<InvestmentStrategies />} />
        <Route path="/global-markets" element={<GlobalMarkets />} />
        <Route path="/investor-relations" element={<InvestorRelations />} />
        <Route path="/insights" element={<Insights />} />
        <Route path="/insights/global-research" element={<GlobalResearch />} />


         
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
