import { AppLayout } from "@/components/AppLayout";
import { BusinessForm } from "@/components/BusinessForm";
import { Building2 } from "lucide-react";

export default function Business() {
  return (
    <AppLayout>
      <div className="max-w-3xl mx-auto">
        <div className="mb-8 animate-fade-in-up">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-lg bg-emerald-50 flex items-center justify-center">
              <Building2 className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Small Business Profile</h1>
              <p className="text-xs text-muted-foreground">Enter your business financials to unlock P&L analysis and tax optimization.</p>
            </div>
          </div>
        </div>
        <BusinessForm />
      </div>
    </AppLayout>
  );
}
