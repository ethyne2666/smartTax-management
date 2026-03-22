import { useState, useEffect } from "react";
import { AppLayout } from "@/components/AppLayout";
import { KpiCard } from "@/components/KpiCard";
import { ExpensePieChart, MonthlyBarChart, TrendLineChart } from "@/components/Charts";
import { AiRecommendations, generateIndividualRecs, generateBusinessRecs, generateCompanyRecs } from "@/components/AiRecommendations";
import { loadAppData, calcIndividual, calcBusiness, calcCompany } from "@/lib/storage";
import { useNavigate } from "react-router-dom";
import {
  TrendingUp, TrendingDown, DollarSign, Receipt, Wallet, PiggyBank, Brain,
  BarChart3, Activity, AlertCircle, User, Building2, Landmark,
} from "lucide-react";
import { Button } from "@/components/ui/button";

function fmt(v: number) {
  if (v >= 10000000) return `₹${(v / 10000000).toFixed(2)}Cr`;
  if (v >= 100000) return `₹${(v / 100000).toFixed(1)}L`;
  if (v >= 1000) return `₹${(v / 1000).toFixed(0)}K`;
  return `₹${v.toLocaleString()}`;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [data, setData] = useState(loadAppData());

  useEffect(() => {
    setData(loadAppData());
  }, []);

  const userType = data.userType;

  if (!userType) {
    return (
      <AppLayout>
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center animate-fade-in-up">
          <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-4">
            <Brain className="w-7 h-7 text-muted-foreground" />
          </div>
          <h2 className="text-lg font-bold text-foreground mb-2">No Profile Selected</h2>
          <p className="text-sm text-muted-foreground mb-6 max-w-sm">Get started by selecting your profile type and entering your financial data.</p>
          <Button onClick={() => navigate("/")} className="bg-primary">Set Up Profile</Button>
        </div>
      </AppLayout>
    );
  }

  if (userType === "individual") {
    const calc = calcIndividual(data.individual);
    const recs = generateIndividualRecs(data.individual);
    const expensePie = [
      { name: "Rent", value: data.individual.rent ?? 0 },
      { name: "Food", value: data.individual.food ?? 0 },
      { name: "Travel", value: data.individual.travel ?? 0 },
      { name: "Subscriptions", value: data.individual.subscriptions ?? 0 },
      { name: "Other", value: data.individual.otherExpenses ?? 0 },
    ];
    const investPie = [
      { name: "Stocks", value: data.individual.stocks ?? 0 },
      { name: "Mutual Funds", value: data.individual.mutualFunds ?? 0 },
      { name: "Crypto", value: data.individual.crypto ?? 0 },
      { name: "FDs & Bonds", value: data.individual.fixedDeposits ?? 0 },
    ];
    const trendData = data.monthlyData.map((m, i) => ({ month: m.month, value: m.income - m.expenses }));
    const healthColor = calc.healthScore >= 70 ? "text-success" : calc.healthScore >= 40 ? "text-warning" : "text-destructive";

    return (
      <AppLayout>
        <div className="space-y-6">
          <DashboardHeader title="Individual Dashboard" type="individual" navigate={navigate} />

          {/* KPIs */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <KpiCard title="Total Income" value={fmt(calc.totalIncome)} trend="up" trendValue="Monthly" icon={<DollarSign className="w-5 h-5" />} accentColor="blue" delay={0} />
            <KpiCard title="Total Expenses" value={fmt(calc.totalExpenses)} trend="down" trendValue="Monthly" icon={<Receipt className="w-5 h-5" />} accentColor="amber" delay={60} />
            <KpiCard title="Net Savings" value={fmt(calc.netSavings)} trend={calc.netSavings >= 0 ? "up" : "down"} trendValue="Monthly" icon={<PiggyBank className="w-5 h-5" />} accentColor={calc.netSavings >= 0 ? "green" : "red"} delay={120} />
            <KpiCard title="Est. Tax Payable" value={fmt(calc.estimatedTax)} subtitle={`Taxable: ${fmt(calc.taxableIncome)}`} icon={<Wallet className="w-5 h-5" />} accentColor="red" delay={180} />
          </div>

          {/* Financial Health + Tax Savings */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <KpiCard title="Investments" value={fmt(calc.totalInvestments)} icon={<TrendingUp className="w-5 h-5" />} accentColor="green" delay={240} />
            <KpiCard title="Tax Savings Possible" value={fmt(calc.taxSavings)} subtitle="Optimize deductions" icon={<AlertCircle className="w-5 h-5" />} accentColor="amber" delay={300} />
            <div className="bg-card rounded-xl border border-border p-5 card-shadow col-span-2 animate-fade-in-up" style={{ animationDelay: "360ms" }}>
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-2">Financial Health Score</p>
              <div className="flex items-end gap-3">
                <span className={`text-4xl font-bold tabular-nums ${healthColor}`}>{calc.healthScore}</span>
                <span className="text-muted-foreground text-sm mb-1">/ 100</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2 mt-3">
                <div
                  className={`h-2 rounded-full transition-all duration-700 ${calc.healthScore >= 70 ? "bg-success" : calc.healthScore >= 40 ? "bg-warning" : "bg-destructive"}`}
                  style={{ width: `${calc.healthScore}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                {calc.healthScore >= 70 ? "Excellent — you're on track!" : calc.healthScore >= 40 ? "Fair — room for improvement" : "Needs attention — review expenses"}
              </p>
            </div>
          </div>

          {/* Charts */}
          <div className="grid lg:grid-cols-2 gap-6">
            <ChartCard title="Expense Distribution">
              <ExpensePieChart data={expensePie} />
            </ChartCard>
            <ChartCard title="Investment Portfolio">
              <ExpensePieChart data={investPie} />
            </ChartCard>
          </div>
          <div className="grid lg:grid-cols-2 gap-6">
            <ChartCard title="Monthly Income vs Expenses">
              <MonthlyBarChart data={data.monthlyData} />
            </ChartCard>
            <ChartCard title="Net Savings Trend">
              <TrendLineChart data={trendData} label="Net Savings" />
            </ChartCard>
          </div>

          {/* AI Recommendations */}
          <AiPanel recommendations={recs} />
        </div>
      </AppLayout>
    );
  }

  if (userType === "business") {
    const calc = calcBusiness(data.business);
    const recs = generateBusinessRecs(data.business);
    const revPie = [
      { name: "Products", value: data.business.productRevenue ?? 0 },
      { name: "Services", value: data.business.serviceRevenue ?? 0 },
      { name: "Other", value: data.business.otherRevenue ?? 0 },
    ];
    const costPie = [
      { name: "Operations", value: data.business.operationalCosts ?? 0 },
      { name: "Salaries", value: data.business.employeeSalaries ?? 0 },
      { name: "Marketing", value: data.business.marketingExpenses ?? 0 },
      { name: "Rent/Util", value: data.business.rentAndUtilities ?? 0 },
    ];

    return (
      <AppLayout>
        <div className="space-y-6">
          <DashboardHeader title="Business Dashboard" type="business" navigate={navigate} />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <KpiCard title="Total Revenue" value={fmt(calc.totalRevenue)} trend="up" trendValue="Monthly" icon={<DollarSign className="w-5 h-5" />} accentColor="blue" delay={0} />
            <KpiCard title="Total Costs" value={fmt(calc.totalCosts)} icon={<Receipt className="w-5 h-5" />} accentColor="amber" delay={60} />
            <KpiCard title="Gross Profit" value={fmt(calc.grossProfit)} trend={calc.grossProfit >= 0 ? "up" : "down"} icon={<TrendingUp className="w-5 h-5" />} accentColor={calc.grossProfit >= 0 ? "green" : "red"} delay={120} />
            <KpiCard title="Profit Margin" value={`${calc.profitMargin}%`} subtitle={calc.profitMargin >= 15 ? "Healthy" : "Below target"} icon={<Activity className="w-5 h-5" />} accentColor={calc.profitMargin >= 15 ? "green" : "red"} delay={180} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <KpiCard title="Est. Tax Payable" value={fmt(calc.estimatedTax)} icon={<Wallet className="w-5 h-5" />} accentColor="red" delay={240} />
            <KpiCard title="Taxable Income" value={fmt(calc.taxableIncome)} icon={<BarChart3 className="w-5 h-5" />} accentColor="slate" delay={300} />
          </div>
          <div className="grid lg:grid-cols-2 gap-6">
            <ChartCard title="Revenue Breakdown"><ExpensePieChart data={revPie} /></ChartCard>
            <ChartCard title="Cost Structure"><ExpensePieChart data={costPie} /></ChartCard>
          </div>
          <div className="grid lg:grid-cols-2 gap-6">
            <ChartCard title="Monthly Revenue vs Costs"><MonthlyBarChart data={data.monthlyData} /></ChartCard>
            <ChartCard title="Revenue Growth Trend"><TrendLineChart data={data.monthlyData.map(m => ({ month: m.month, value: m.income }))} label="Revenue" color="hsl(213,94%,50%)" /></ChartCard>
          </div>
          <AiPanel recommendations={recs} />
        </div>
      </AppLayout>
    );
  }

  // Company
  const calc = calcCompany(data.company);
  const recs = generateCompanyRecs(data.company);
  const revPie = [
    { name: "Sales", value: data.company.salesRevenue ?? 0 },
    { name: "Technology", value: data.company.techRevenue ?? 0 },
    { name: "Consulting", value: data.company.consultingRevenue ?? 0 },
  ];
  const expPie = [
    { name: "CapEx", value: data.company.capitalExpenditure ?? 0 },
    { name: "OpEx", value: data.company.operationalExpenditure ?? 0 },
    { name: "Payroll", value: data.company.totalPayroll ?? 0 },
  ];

  return (
    <AppLayout>
      <div className="space-y-6">
        <DashboardHeader title="Enterprise Dashboard" type="company" navigate={navigate} />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <KpiCard title="Total Revenue" value={fmt(calc.totalRevenue)} trend="up" icon={<DollarSign className="w-5 h-5" />} accentColor="blue" delay={0} />
          <KpiCard title="EBITDA" value={fmt(calc.ebitda)} trend={calc.ebitda >= 0 ? "up" : "down"} icon={<TrendingUp className="w-5 h-5" />} accentColor={calc.ebitda >= 0 ? "green" : "red"} delay={60} />
          <KpiCard title="Net Income" value={fmt(calc.netIncome)} icon={<PiggyBank className="w-5 h-5" />} accentColor="green" delay={120} />
          <KpiCard title="Revenue / Employee" value={fmt(calc.revenuePerEmployee)} subtitle={`${data.company.headcount ?? 0} headcount`} icon={<User className="w-5 h-5" />} accentColor="slate" delay={180} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <KpiCard title="Total Expenditure" value={fmt(calc.totalExpenses)} icon={<Receipt className="w-5 h-5" />} accentColor="amber" delay={240} />
          <KpiCard title="Corporate Tax Paid" value={fmt(data.company.corporateTaxPaid ?? 0)} icon={<Wallet className="w-5 h-5" />} accentColor="red" delay={300} />
        </div>
        <div className="grid lg:grid-cols-2 gap-6">
          <ChartCard title="Revenue by Department"><ExpensePieChart data={revPie} /></ChartCard>
          <ChartCard title="Expenditure Mix (CapEx vs OpEx)"><ExpensePieChart data={expPie} /></ChartCard>
        </div>
        <div className="grid lg:grid-cols-2 gap-6">
          <ChartCard title="Monthly Revenue vs Costs"><MonthlyBarChart data={data.monthlyData} /></ChartCard>
          <ChartCard title="Revenue Trend"><TrendLineChart data={data.monthlyData.map(m => ({ month: m.month, value: m.income }))} label="Revenue" color="hsl(270,60%,55%)" /></ChartCard>
        </div>
        <AiPanel recommendations={recs} />
      </div>
    </AppLayout>
  );
}

function DashboardHeader({ title, type, navigate }: { title: string; type: string; navigate: (p: string) => void }) {
  const icons: Record<string, React.ReactNode> = {
    individual: <User className="w-5 h-5 text-blue-600" />,
    business: <Building2 className="w-5 h-5 text-emerald-600" />,
    company: <Landmark className="w-5 h-5 text-violet-600" />,
  };
  const editPaths: Record<string, string> = {
    individual: "/individual",
    business: "/business",
    company: "/company",
  };

  return (
    <div className="flex items-center justify-between animate-fade-in-up">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center">
          {icons[type]}
        </div>
        <div>
          <h1 className="text-xl font-bold text-foreground">{title}</h1>
          <p className="text-xs text-muted-foreground">AI-powered financial insights — last updated just now</p>
        </div>
      </div>
      <Button variant="outline" size="sm" onClick={() => navigate(editPaths[type])}>
        Edit Data
      </Button>
    </div>
  );
}

function ChartCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-card rounded-xl border border-border p-5 card-shadow animate-fade-in-up">
      <h3 className="text-sm font-bold text-foreground mb-4">{title}</h3>
      {children}
    </div>
  );
}

function AiPanel({ recommendations }: { recommendations: ReturnType<typeof generateIndividualRecs> }) {
  return (
    <div className="bg-card rounded-xl border border-border p-5 card-shadow animate-fade-in-up">
      <div className="flex items-center gap-2 mb-4">
        <Brain className="w-4 h-4 text-accent-blue" />
        <h3 className="text-sm font-bold text-foreground">AI Recommendations</h3>
        <span className="ml-auto text-xs bg-secondary text-muted-foreground px-2 py-0.5 rounded-full font-medium">{recommendations.length} insights</span>
      </div>
      <AiRecommendations recommendations={recommendations} />
    </div>
  );
}
