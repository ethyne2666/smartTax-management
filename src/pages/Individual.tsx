import { AppLayout } from "@/components/AppLayout";
import { IndividualForm } from "@/components/IndividualForm";
import { User } from "lucide-react";

export default function Individual() {
  return (
    <AppLayout>
      <div className="max-w-3xl mx-auto">
        <div className="mb-8 animate-fade-in-up">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center">
              <User className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Individual Profile</h1>
              <p className="text-xs text-muted-foreground">Enter your financial data — we'll analyse and generate personalized insights.</p>
            </div>
          </div>
        </div>
        <IndividualForm />
      </div>
    </AppLayout>
  );
}
