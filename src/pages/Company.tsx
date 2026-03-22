import { AppLayout } from "@/components/AppLayout";
import { CompanyForm } from "@/components/CompanyForm";
import { Landmark } from "lucide-react";

export default function Company() {
  return (
    <AppLayout>
      <div className="max-w-3xl mx-auto">
        <div className="mb-8 animate-fade-in-up">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-lg bg-violet-50 flex items-center justify-center">
              <Landmark className="w-5 h-5 text-violet-600" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Enterprise Profile</h1>
              <p className="text-xs text-muted-foreground">Multi-department financial tracking with advanced tax strategy insights.</p>
            </div>
          </div>
        </div>
        <CompanyForm />
      </div>
    </AppLayout>
  );
}
