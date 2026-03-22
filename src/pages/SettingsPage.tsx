import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { clearAppData } from "@/lib/storage";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { Trash2, RefreshCw } from "lucide-react";

export default function Settings() {
  const navigate = useNavigate();

  const handleClear = () => {
    clearAppData();
    toast({ title: "Data Cleared", description: "All local data has been removed." });
    navigate("/");
  };

  return (
    <AppLayout>
      <div className="max-w-xl mx-auto space-y-6">
        <div className="animate-fade-in-up">
          <h1 className="text-xl font-bold text-foreground mb-1">Settings</h1>
          <p className="text-xs text-muted-foreground">Manage your SmartTax AI preferences and data.</p>
        </div>

        <div className="bg-card rounded-xl border border-border p-5 card-shadow animate-fade-in-up" style={{ animationDelay: "80ms" }}>
          <h3 className="text-sm font-bold text-foreground mb-1">Data Management</h3>
          <p className="text-xs text-muted-foreground mb-4">Your data is stored locally in your browser's localStorage.</p>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => navigate("/")} className="gap-2">
              <RefreshCw className="w-4 h-4" /> Switch Profile
            </Button>
            <Button variant="destructive" onClick={handleClear} className="gap-2">
              <Trash2 className="w-4 h-4" /> Clear All Data
            </Button>
          </div>
        </div>

        <div className="bg-card rounded-xl border border-border p-5 card-shadow animate-fade-in-up" style={{ animationDelay: "160ms" }}>
          <h3 className="text-sm font-bold text-foreground mb-1">About SmartTax AI</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            SmartTax AI is a financial intelligence platform designed to help individuals, small businesses, and enterprises manage taxes, optimize spending, and make data-driven investment decisions. Tax calculations are based on Indian Income Tax Act (FY 2023-24) and are for informational purposes only.
          </p>
        </div>

        <div className="bg-card rounded-xl border border-border p-5 card-shadow animate-fade-in-up" style={{ animationDelay: "240ms" }}>
          <h3 className="text-sm font-bold text-foreground mb-4">Platform Info</h3>
          <div className="space-y-0">
            {[
              { label: "Version", value: "1.0.0" },
              { label: "Tax Regime", value: "Indian Income Tax (Old Regime)" },
              { label: "Assessment Year", value: "AY 2024-25" },
              { label: "Data Storage", value: "Local (browser only)" },
            ].map((item, i) => (
              <div key={i} className="flex justify-between py-2.5 border-b border-border last:border-0">
                <span className="text-xs text-muted-foreground">{item.label}</span>
                <span className="text-xs font-medium text-foreground">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
