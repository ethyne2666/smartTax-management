import { AppLayout } from "@/components/AppLayout";
import { TrendLineChart, MonthlyBarChart } from "@/components/Charts";
import { loadAppData, calcIndividual, calcBusiness, calcCompany } from "@/lib/storage";
import { Button } from "@/components/ui/button";
import { FileDown, Printer } from "lucide-react";
import { toast } from "@/hooks/use-toast";

function fmt(v: number) {
  if (v >= 100000) return `₹${(v / 100000).toFixed(1)}L`;
  if (v >= 1000) return `₹${(v / 1000).toFixed(0)}K`;
  return `₹${v.toLocaleString()}`;
}

export default function Reports() {
  const data = loadAppData();
  const userType = data.userType;

  const handleExport = () => {
    toast({ title: "Export Started", description: "Your report is being prepared." });
    setTimeout(() => {
      const content = JSON.stringify(data, null, 2);
      const blob = new Blob([content], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `smarttax-report-${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
      URL.revokeObjectURL(url);
    }, 500);
  };

  return (
    <AppLayout>
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center justify-between animate-fade-in-up">
          <div>
            <h1 className="text-xl font-bold text-foreground">Financial Reports</h1>
            <p className="text-xs text-muted-foreground">Overview of your financial data and trends.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => window.print()}>
              <Printer className="w-4 h-4 mr-2" /> Print
            </Button>
            <Button size="sm" onClick={handleExport} className="bg-primary">
              <FileDown className="w-4 h-4 mr-2" /> Export JSON
            </Button>
          </div>
        </div>

        <div className="bg-card rounded-xl border border-border p-5 card-shadow animate-fade-in-up" style={{ animationDelay: "80ms" }}>
          <h3 className="text-sm font-bold text-foreground mb-4">Monthly Income vs Expenses</h3>
          <MonthlyBarChart data={data.monthlyData} />
        </div>

        <div className="bg-card rounded-xl border border-border p-5 card-shadow animate-fade-in-up" style={{ animationDelay: "160ms" }}>
          <h3 className="text-sm font-bold text-foreground mb-4">Net Savings Trend</h3>
          <TrendLineChart
            data={data.monthlyData.map(m => ({ month: m.month, value: m.income - m.expenses }))}
            label="Net Savings"
          />
        </div>

        {userType && (
          <div className="bg-card rounded-xl border border-border p-5 card-shadow animate-fade-in-up" style={{ animationDelay: "240ms" }}>
            <h3 className="text-sm font-bold text-foreground mb-4">Summary Table</h3>
            {userType === "individual" && <IndividualSummary d={calcIndividual(data.individual)} />}
            {userType === "business" && <BusinessSummary d={calcBusiness(data.business)} />}
            {userType === "company" && <CompanySummary d={calcCompany(data.company)} />}
          </div>
        )}
      </div>
    </AppLayout>
  );
}

function Row({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className={`flex justify-between py-2.5 border-b border-border last:border-0 ${highlight ? "font-semibold" : ""}`}>
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className={`text-sm tabular-nums ${highlight ? "text-foreground" : "text-foreground"}`}>{value}</span>
    </div>
  );
}

function IndividualSummary({ d }: { d: ReturnType<typeof calcIndividual> }) {
  return (
    <div>
      <Row label="Total Income" value={fmt(d.totalIncome)} />
      <Row label="Total Expenses" value={fmt(d.totalExpenses)} />
      <Row label="Total Investments" value={fmt(d.totalInvestments)} />
      <Row label="Net Savings" value={fmt(d.netSavings)} highlight />
      <Row label="Taxable Income" value={fmt(d.taxableIncome)} />
      <Row label="Estimated Tax" value={fmt(d.estimatedTax)} highlight />
      <Row label="Financial Health Score" value={`${d.healthScore} / 100`} />
    </div>
  );
}

function BusinessSummary({ d }: { d: ReturnType<typeof calcBusiness> }) {
  return (
    <div>
      <Row label="Total Revenue" value={fmt(d.totalRevenue)} />
      <Row label="Total Costs" value={fmt(d.totalCosts)} />
      <Row label="Gross Profit" value={fmt(d.grossProfit)} highlight />
      <Row label="Profit Margin" value={`${d.profitMargin}%`} />
      <Row label="Taxable Income" value={fmt(d.taxableIncome)} />
      <Row label="Estimated Tax" value={fmt(d.estimatedTax)} highlight />
    </div>
  );
}

function CompanySummary({ d }: { d: ReturnType<typeof calcCompany> }) {
  return (
    <div>
      <Row label="Total Revenue" value={fmt(d.totalRevenue)} />
      <Row label="Total Expenditure" value={fmt(d.totalExpenses)} />
      <Row label="EBITDA" value={fmt(d.ebitda)} highlight />
      <Row label="Net Income" value={fmt(d.netIncome)} highlight />
      <Row label="Revenue per Employee" value={fmt(d.revenuePerEmployee)} />
    </div>
  );
}
