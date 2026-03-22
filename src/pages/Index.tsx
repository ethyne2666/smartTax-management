import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveAppData } from "@/lib/storage";
import { Button } from "@/components/ui/button";
import { User, Building2, Landmark, ArrowRight, ShieldCheck, TrendingUp, Brain, Wallet } from "lucide-react";
import { cn } from "@/lib/utils";

const userTypes = [
  {
    id: "individual" as const,
    icon: User,
    title: "Individual",
    description: "Salaried employees, freelancers, and self-employed professionals managing personal tax and finances.",
    features: ["Salary & freelance income", "Personal expense tracking", "Tax deduction optimizer", "Investment portfolio"],
    accentClass: "border-blue-200 hover:border-blue-400 group-hover:text-blue-600",
    iconBg: "bg-blue-50 text-blue-600",
    activeBg: "border-blue-500 bg-blue-50/50",
  },
  {
    id: "business" as const,
    icon: Building2,
    title: "Small Business",
    description: "Startups and SMEs tracking revenue, managing operational costs and filing taxes efficiently.",
    features: ["Revenue stream tracking", "P&L statements", "Employee cost management", "Business tax filings"],
    accentClass: "border-emerald-200 hover:border-emerald-400 group-hover:text-emerald-600",
    iconBg: "bg-emerald-50 text-emerald-600",
    activeBg: "border-emerald-500 bg-emerald-50/50",
  },
  {
    id: "company" as const,
    icon: Landmark,
    title: "Enterprise",
    description: "Mid-to-large companies with complex multi-department financials and advanced tax optimization needs.",
    features: ["Multi-department P&L", "CapEx vs OpEx analysis", "Corporate tax strategy", "Financial forecasting"],
    accentClass: "border-violet-200 hover:border-violet-400 group-hover:text-violet-600",
    iconBg: "bg-violet-50 text-violet-600",
    activeBg: "border-violet-500 bg-violet-50/50",
  },
];

const stats = [
  { label: "Tax Savings Identified", value: "₹2.4L avg" },
  { label: "Users Onboarded", value: "12,847" },
  { label: "AI Recommendations", value: "98,200+" },
];

export default function Index() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<"individual" | "business" | "company" | null>(null);

  const handleContinue = () => {
    if (!selected) return;
    saveAppData({ userType: selected });
    navigate(`/${selected}`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Wallet className="w-4 h-4 text-primary-foreground" />
            </div>
            <div>
              <span className="text-sm font-bold text-foreground tracking-tight">SmartTax AI</span>
              <span className="text-xs text-muted-foreground ml-2 hidden sm:inline">Financial Intelligence Platform</span>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={() => navigate("/dashboard")}>
            Open Dashboard →
          </Button>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-16">
        {/* Hero */}
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 bg-secondary border border-border rounded-full px-4 py-1.5 text-xs font-semibold text-muted-foreground mb-6">
            <Brain className="w-3.5 h-3.5 text-accent-blue" />
            AI-Powered Tax & Financial Intelligence
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4" style={{ lineHeight: 1.1 }}>
            Stop overpaying taxes.<br />Start growing wealth.
          </h1>
          <p className="text-base text-muted-foreground max-w-xl mx-auto leading-relaxed">
            SmartTax AI analyzes your financial data to identify tax savings, optimize investments, and give you a clear picture of your financial health — in minutes.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-16 animate-fade-in-up" style={{ animationDelay: "100ms" }}>
          {stats.map((s, i) => (
            <div key={i} className="bg-card border border-border rounded-xl p-4 text-center card-shadow">
              <p className="text-xl font-bold text-foreground tabular-nums">{s.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* User Type Selection */}
        <div className="mb-10 animate-fade-in-up" style={{ animationDelay: "200ms" }}>
          <h2 className="text-lg font-bold text-foreground mb-2">Select your profile</h2>
          <p className="text-sm text-muted-foreground mb-6">Choose the option that best describes your financial situation.</p>
          <div className="grid sm:grid-cols-3 gap-4">
            {userTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setSelected(type.id)}
                className={cn(
                  "group text-left p-5 rounded-xl border-2 bg-card transition-all duration-200 card-shadow hover:card-shadow-hover",
                  selected === type.id ? type.activeBg : "border-border"
                )}
              >
                <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center mb-4 transition-colors", type.iconBg)}>
                  <type.icon className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-foreground mb-1">{type.title}</h3>
                <p className="text-xs text-muted-foreground mb-4 leading-relaxed">{type.description}</p>
                <ul className="space-y-1">
                  {type.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <ShieldCheck className="w-3 h-3 flex-shrink-0 text-success" />
                      {f}
                    </li>
                  ))}
                </ul>
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-center animate-fade-in-up" style={{ animationDelay: "300ms" }}>
          <Button
            onClick={handleContinue}
            disabled={!selected}
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 h-12"
          >
            Get Started <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

        {/* Feature highlights */}
        <div className="grid sm:grid-cols-3 gap-6 mt-20 pt-16 border-t border-border animate-fade-in-up" style={{ animationDelay: "400ms" }}>
          {[
            { icon: ShieldCheck, title: "Tax Optimization AI", desc: "Identifies deductions and tax-saving instruments you're missing based on your income profile." },
            { icon: TrendingUp, title: "Investment Advisor", desc: "Tailored investment recommendations based on your risk profile and financial goals." },
            { icon: Brain, title: "Expense Intelligence", desc: "Detects money leaks and suggests budget improvements with real-time financial health scoring." },
          ].map((f, i) => (
            <div key={i} className="text-center">
              <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center mx-auto mb-3">
                <f.icon className="w-5 h-5 text-foreground" />
              </div>
              <h4 className="text-sm font-bold text-foreground mb-1">{f.title}</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
