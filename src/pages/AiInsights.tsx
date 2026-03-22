import { AppLayout } from "@/components/AppLayout";
import { AiRecommendations, generateIndividualRecs, generateBusinessRecs, generateCompanyRecs } from "@/components/AiRecommendations";
import { loadAppData } from "@/lib/storage";
import { Brain } from "lucide-react";

export default function AiInsights() {
  const data = loadAppData();
  const userType = data.userType;

  let recs: ReturnType<typeof generateIndividualRecs> = [];
  if (userType === "individual") recs = generateIndividualRecs(data.individual);
  else if (userType === "business") recs = generateBusinessRecs(data.business);
  else if (userType === "company") recs = generateCompanyRecs(data.company);

  const tax = recs.filter(r => r.type === "tax");
  const investment = recs.filter(r => r.type === "investment");
  const expense = recs.filter(r => r.type === "expense");
  const alerts = recs.filter(r => r.type === "alert");

  return (
    <AppLayout>
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center gap-3 animate-fade-in-up">
          <div className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center">
            <Brain className="w-5 h-5 text-accent-blue" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">AI Insights</h1>
            <p className="text-xs text-muted-foreground">Personalized recommendations powered by SmartTax AI engine.</p>
          </div>
        </div>

        {[
          { title: "🚨 Financial Alerts", items: alerts },
          { title: "🛡️ Tax Optimization", items: tax },
          { title: "💡 Expense Insights", items: expense },
          { title: "📈 Investment Suggestions", items: investment },
        ].map((section) => section.items.length > 0 && (
          <div key={section.title} className="bg-card rounded-xl border border-border p-5 card-shadow animate-fade-in-up">
            <h3 className="text-sm font-bold text-foreground mb-4">{section.title}</h3>
            <AiRecommendations recommendations={section.items} />
          </div>
        ))}

        {recs.length === 0 && (
          <div className="bg-card rounded-xl border border-border p-12 text-center card-shadow animate-fade-in-up">
            <Brain className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
            <p className="text-sm font-medium text-foreground mb-1">No insights yet</p>
            <p className="text-xs text-muted-foreground">Select a profile and enter your financial data to unlock AI-powered recommendations.</p>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
