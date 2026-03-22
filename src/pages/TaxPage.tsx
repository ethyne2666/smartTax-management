import { AppLayout } from "@/components/AppLayout";
import { KpiCard } from "@/components/KpiCard";
import { loadAppData, calcIndividual, calcBusiness, calcCompany } from "@/lib/storage";
import { Receipt, TrendingDown, Wallet, AlertCircle } from "lucide-react";
import { AiRecommendations, generateIndividualRecs, generateBusinessRecs, generateCompanyRecs } from "@/components/AiRecommendations";

function fmt(v: number) {
  if (v >= 100000) return `₹${(v / 100000).toFixed(1)}L`;
  if (v >= 1000) return `₹${(v / 1000).toFixed(0)}K`;
  return `₹${v.toLocaleString()}`;
}

export default function TaxPage() {
  const data = loadAppData();
  const userType = data.userType;

  let taxPayable = 0;
  let taxableIncome = 0;
  let taxDeductions = 0;
  let taxPaid = 0;
  let recs: ReturnType<typeof generateIndividualRecs> = [];

  if (userType === "individual") {
    const c = calcIndividual(data.individual);
    taxPayable = c.estimatedTax;
    taxableIncome = c.taxableIncome;
    taxDeductions = data.individual.taxDeductions ?? 0;
    taxPaid = data.individual.taxPaid ?? 0;
    recs = generateIndividualRecs(data.individual).filter(r => r.type === "tax");
  } else if (userType === "business") {
    const c = calcBusiness(data.business);
    taxPayable = c.estimatedTax;
    taxableIncome = c.taxableIncome;
    taxDeductions = data.business.taxDeductions ?? 0;
    taxPaid = data.business.taxPaid ?? 0;
    recs = generateBusinessRecs(data.business).filter(r => r.type === "tax");
  } else if (userType === "company") {
    taxPaid = data.company.corporateTaxPaid ?? 0;
    const c = calcCompany(data.company);
    taxableIncome = c.totalRevenue;
    recs = generateCompanyRecs(data.company).filter(r => r.type === "tax");
  }

  return (
    <AppLayout>
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="animate-fade-in-up">
          <h1 className="text-xl font-bold text-foreground mb-1">Tax Analysis</h1>
          <p className="text-xs text-muted-foreground">Estimated calculations based on current Indian tax slabs (AY 2024-25).</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <KpiCard title="Est. Tax Payable" value={fmt(taxPayable)} icon={<Receipt className="w-5 h-5" />} accentColor="red" delay={0} />
          <KpiCard title="Tax Already Paid" value={fmt(taxPaid)} icon={<Wallet className="w-5 h-5" />} accentColor="green" delay={60} />
          <KpiCard title="Taxable Income" value={fmt(taxableIncome)} icon={<TrendingDown className="w-5 h-5" />} accentColor="amber" delay={120} />
          <KpiCard title="Deductions Claimed" value={fmt(taxDeductions)} icon={<AlertCircle className="w-5 h-5" />} accentColor="blue" delay={180} />
        </div>

        <div className="bg-card rounded-xl border border-border p-5 card-shadow animate-fade-in-up" style={{ animationDelay: "240ms" }}>
          <h3 className="text-sm font-bold text-foreground mb-1">Tax Slab Reference (Old Regime)</h3>
          <p className="text-xs text-muted-foreground mb-4">For FY 2023-24 / AY 2024-25</p>
          <div className="space-y-2">
            {[
              { range: "Up to ₹2,50,000", rate: "Nil", color: "text-success" },
              { range: "₹2,50,001 – ₹5,00,000", rate: "5%", color: "text-blue-600" },
              { range: "₹5,00,001 – ₹10,00,000", rate: "20%", color: "text-warning" },
              { range: "Above ₹10,00,000", rate: "30%", color: "text-destructive" },
            ].map((s, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <span className="text-xs text-muted-foreground">{s.range}</span>
                <span className={`text-xs font-bold tabular-nums ${s.color}`}>{s.rate}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card rounded-xl border border-border p-5 card-shadow animate-fade-in-up" style={{ animationDelay: "300ms" }}>
          <h3 className="text-sm font-bold mb-4">AI Tax Recommendations</h3>
          <AiRecommendations recommendations={recs} />
        </div>
      </div>
    </AppLayout>
  );
}
