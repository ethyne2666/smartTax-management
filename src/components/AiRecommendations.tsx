import { cn } from "@/lib/utils";
import { Brain, TrendingUp, ShieldAlert, Lightbulb, CheckCircle2, AlertTriangle, Info } from "lucide-react";

export interface Recommendation {
  type: "tax" | "investment" | "expense" | "alert";
  priority: "high" | "medium" | "low";
  title: string;
  description: string;
  impact?: string;
}

interface AiRecommendationsProps {
  recommendations: Recommendation[];
}

const typeConfig = {
  tax: { icon: ShieldAlert, label: "Tax Optimization", color: "text-blue-600", bg: "bg-blue-50 border-blue-100" },
  investment: { icon: TrendingUp, label: "Investment", color: "text-emerald-600", bg: "bg-emerald-50 border-emerald-100" },
  expense: { icon: Lightbulb, label: "Expense Insight", color: "text-amber-600", bg: "bg-amber-50 border-amber-100" },
  alert: { icon: AlertTriangle, label: "Alert", color: "text-red-500", bg: "bg-red-50 border-red-100" },
};

const priorityDot = {
  high: "bg-red-500",
  medium: "bg-amber-500",
  low: "bg-blue-400",
};

export function AiRecommendations({ recommendations }: AiRecommendationsProps) {
  if (recommendations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-3">
          <Brain className="w-5 h-5 text-muted-foreground" />
        </div>
        <p className="text-sm font-medium text-foreground mb-1">AI Analysis Pending</p>
        <p className="text-xs text-muted-foreground max-w-[220px]">Enter your financial data to receive personalized AI recommendations.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {recommendations.map((rec, i) => {
        const config = typeConfig[rec.type];
        return (
          <div
            key={i}
            className={cn("border rounded-lg p-4 animate-fade-in-up", config.bg)}
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-0.5">
                <config.icon className={cn("w-4 h-4", config.color)} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className={cn("text-[10px] font-semibold uppercase tracking-wider", config.color)}>{config.label}</span>
                  <div className={cn("w-1.5 h-1.5 rounded-full", priorityDot[rec.priority])} />
                </div>
                <p className="text-sm font-semibold text-foreground">{rec.title}</p>
                <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{rec.description}</p>
                {rec.impact && (
                  <div className="flex items-center gap-1 mt-2">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span className="text-xs font-medium text-emerald-700">{rec.impact}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// Engine to generate recommendations
import type { IndividualData, BusinessData, CompanyData } from "@/lib/storage";

export function generateIndividualRecs(d: Partial<IndividualData>): Recommendation[] {
  const recs: Recommendation[] = [];
  const totalIncome = (d.salary ?? 0) + (d.freelanceIncome ?? 0) + (d.otherIncome ?? 0);
  const totalExpenses = (d.rent ?? 0) + (d.food ?? 0) + (d.travel ?? 0) + (d.subscriptions ?? 0);
  const savingsRate = totalIncome > 0 ? (totalIncome - totalExpenses) / totalIncome : 0;

  if ((d.taxDeductions ?? 0) < 150000 && totalIncome > 250000) {
    recs.push({ type: "tax", priority: "high", title: "Maximize Section 80C", description: "You haven't utilized the full ₹1.5L deduction under Sec 80C. Invest in ELSS, PPF, or NSC.", impact: "Save up to ₹46,800 in taxes" });
  }
  if (totalIncome > 500000 && (d.taxPaid ?? 0) === 0) {
    recs.push({ type: "tax", priority: "high", title: "Advance Tax Payment Due", description: "Your estimated tax liability is significant. Pay advance tax to avoid penalties.", impact: "Avoid 1% monthly interest penalty" });
  }
  if ((d.subscriptions ?? 0) > totalIncome * 0.05) {
    recs.push({ type: "expense", priority: "medium", title: "Subscription Overload Detected", description: `You're spending ₹${d.subscriptions?.toLocaleString()} on subscriptions. Review and cancel unused ones.`, impact: `Potential savings: ₹${Math.round((d.subscriptions ?? 0) * 0.4).toLocaleString()}/month` });
  }
  if (savingsRate < 0.2 && totalIncome > 0) {
    recs.push({ type: "alert", priority: "high", title: "Low Savings Rate", description: `Your savings rate is ${(savingsRate * 100).toFixed(0)}%. Financial advisors recommend 20-30%. Reduce discretionary spending.` });
  }
  const riskProfile = d.riskProfile ?? "medium";
  if (riskProfile === "low") {
    recs.push({ type: "investment", priority: "medium", title: "Fixed Deposit + Bonds Portfolio", description: "Given your low risk tolerance, consider RBI Floating Rate Bonds (8.05%), PPF (7.1%), and FDs.", impact: "Expected return: 7-8% p.a." });
  } else if (riskProfile === "medium") {
    recs.push({ type: "investment", priority: "medium", title: "Balanced Mutual Fund Allocation", description: "Invest 60% in diversified equity MFs and 40% in debt funds for balanced growth.", impact: "Expected return: 10-12% p.a." });
  } else {
    recs.push({ type: "investment", priority: "medium", title: "High-Growth Equity Portfolio", description: "Consider Nifty 50 index funds, small-cap funds, and sectoral ETFs for maximum growth.", impact: "Expected return: 14-18% p.a." });
  }
  if ((d.emiAmount ?? 0) > totalIncome * 0.4) {
    recs.push({ type: "alert", priority: "high", title: "High Debt-to-Income Ratio", description: `EMI payments represent ${Math.round((d.emiAmount ?? 0) / totalIncome * 100)}% of income. FOIR exceeds safe threshold of 40%.` });
  }
  return recs;
}

export function generateBusinessRecs(d: Partial<BusinessData>): Recommendation[] {
  const recs: Recommendation[] = [];
  const totalRevenue = (d.productRevenue ?? 0) + (d.serviceRevenue ?? 0) + (d.otherRevenue ?? 0);
  const totalCosts = (d.operationalCosts ?? 0) + (d.employeeSalaries ?? 0) + (d.marketingExpenses ?? 0);
  const profitMargin = totalRevenue > 0 ? (totalRevenue - totalCosts) / totalRevenue : 0;

  if (profitMargin < 0.15 && totalRevenue > 0) {
    recs.push({ type: "alert", priority: "high", title: "Thin Profit Margins", description: `Your profit margin is ${(profitMargin * 100).toFixed(1)}%. Industry standard is 15-25%. Review pricing and cost structure.` });
  }
  if ((d.marketingExpenses ?? 0) > totalRevenue * 0.2) {
    recs.push({ type: "expense", priority: "medium", title: "Marketing Spend Optimization", description: "Marketing costs exceed 20% of revenue. Analyze ROI per channel and shift to performance marketing.", impact: "Potential 30% cost reduction" });
  }
  if ((d.taxDeductions ?? 0) < totalCosts * 0.3) {
    recs.push({ type: "tax", priority: "high", title: "Claim All Eligible Deductions", description: "Business expenses like rent, utilities, employee costs, and depreciation are fully deductible. Ensure proper documentation.", impact: "Save up to ₹2L+ in taxes" });
  }
  recs.push({ type: "investment", priority: "low", title: "Business Reinvestment Strategy", description: "Reinvest 20-30% of profits into automation and technology to reduce operational costs long-term.", impact: "30% efficiency gain in 12 months" });
  return recs;
}

export function generateCompanyRecs(d: Partial<CompanyData>): Recommendation[] {
  const recs: Recommendation[] = [];
  const totalRevenue = (d.salesRevenue ?? 0) + (d.techRevenue ?? 0) + (d.consultingRevenue ?? 0);
  const capexRatio = totalRevenue > 0 ? (d.capitalExpenditure ?? 0) / totalRevenue : 0;

  if (capexRatio > 0.3) {
    recs.push({ type: "expense", priority: "medium", title: "High CapEx Ratio", description: `Capital expenditure is ${(capexRatio * 100).toFixed(0)}% of revenue. Consider leasing over purchasing for non-core assets.`, impact: "Improve cash flow by 15-20%" });
  }
  recs.push({ type: "tax", priority: "high", title: "Accelerated Depreciation Claims", description: "File for accelerated depreciation on technology assets under Section 32 to reduce taxable income significantly.", impact: "Reduce tax liability by 12-18%" });
  if ((d.headcount ?? 0) > 50) {
    recs.push({ type: "investment", priority: "medium", title: "Employee Stock Option Plan (ESOP)", description: "Implement ESOP to retain talent and reduce cash salary burden while aligning employee incentives.", impact: "Reduce attrition by 25-35%" });
  }
  recs.push({ type: "investment", priority: "low", title: "Treasury Management", description: "Park idle cash in liquid mutual funds or commercial paper for 6-7% returns vs 3.5% savings account.", impact: "Additional yield: 3-4% p.a." });
  return recs;
}
