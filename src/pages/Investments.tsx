import { AppLayout } from "@/components/AppLayout";
import { KpiCard } from "@/components/KpiCard";
import { loadAppData } from "@/lib/storage";
import { AiRecommendations, generateIndividualRecs, generateBusinessRecs, generateCompanyRecs } from "@/components/AiRecommendations";
import { TrendingUp } from "lucide-react";

export default function Investments() {
  const data = loadAppData();
  const userType = data.userType;

  let recs: ReturnType<typeof generateIndividualRecs> = [];
  if (userType === "individual") recs = generateIndividualRecs(data.individual).filter(r => r.type === "investment");
  else if (userType === "business") recs = generateBusinessRecs(data.business).filter(r => r.type === "investment");
  else if (userType === "company") recs = generateCompanyRecs(data.company).filter(r => r.type === "investment");

  const inv = data.individual;
  const totalPortfolio = (inv.stocks ?? 0) + (inv.mutualFunds ?? 0) + (inv.crypto ?? 0) + (inv.fixedDeposits ?? 0);

  const fmt = (v: number) => v >= 100000 ? `₹${(v / 100000).toFixed(1)}L` : v >= 1000 ? `₹${(v / 1000).toFixed(0)}K` : `₹${v}`;

  return (
    <AppLayout>
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="animate-fade-in-up">
          <h1 className="text-xl font-bold text-foreground mb-1">Investment Overview</h1>
          <p className="text-xs text-muted-foreground">Portfolio composition and AI-driven investment recommendations.</p>
        </div>

        {userType === "individual" && (
          <div className="grid grid-cols-2 gap-4">
            <KpiCard title="Total Portfolio" value={fmt(totalPortfolio)} icon={<TrendingUp className="w-5 h-5" />} accentColor="blue" delay={0} />
            <KpiCard title="Equity (Stocks)" value={fmt(inv.stocks ?? 0)} icon={<TrendingUp className="w-5 h-5" />} accentColor="green" delay={60} />
            <KpiCard title="Mutual Funds" value={fmt(inv.mutualFunds ?? 0)} icon={<TrendingUp className="w-5 h-5" />} accentColor="amber" delay={120} />
            <KpiCard title="Fixed Deposits" value={fmt(inv.fixedDeposits ?? 0)} icon={<TrendingUp className="w-5 h-5" />} accentColor="slate" delay={180} />
          </div>
        )}

        <div className="bg-card rounded-xl border border-border p-5 card-shadow animate-fade-in-up" style={{ animationDelay: "240ms" }}>
          <h3 className="text-sm font-bold text-foreground mb-4">AI Investment Recommendations</h3>
          <AiRecommendations recommendations={recs} />
        </div>

        <div className="bg-card rounded-xl border border-border p-5 card-shadow animate-fade-in-up" style={{ animationDelay: "320ms" }}>
          <h3 className="text-sm font-bold text-foreground mb-4">Asset Class Returns Reference</h3>
          <div className="space-y-0">
            {[
              { name: "PPF (Public Provident Fund)", returns: "7.1% p.a.", risk: "No Risk", riskColor: "text-success" },
              { name: "RBI Floating Rate Bonds", returns: "8.05% p.a.", risk: "No Risk", riskColor: "text-success" },
              { name: "Debt Mutual Funds", returns: "6-8% p.a.", risk: "Low", riskColor: "text-blue-600" },
              { name: "Balanced Hybrid Funds", returns: "10-12% p.a.", risk: "Medium", riskColor: "text-warning" },
              { name: "Large Cap Equity Funds", returns: "12-15% p.a.", risk: "Medium-High", riskColor: "text-warning" },
              { name: "Small Cap / Mid Cap", returns: "15-20% p.a.", risk: "High", riskColor: "text-destructive" },
              { name: "Direct Stocks", returns: "Varies", risk: "High", riskColor: "text-destructive" },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                <span className="text-sm text-foreground">{item.name}</span>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold tabular-nums text-success">{item.returns}</span>
                  <span className={`text-xs font-medium ${item.riskColor} w-20 text-right`}>{item.risk}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
