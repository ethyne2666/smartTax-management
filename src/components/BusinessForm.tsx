import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronRight, ChevronLeft, CheckCircle2, Save } from "lucide-react";
import { saveAppData, loadAppData, type BusinessData } from "@/lib/storage";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const steps = [
  { id: 1, label: "Revenue", description: "Income streams" },
  { id: 2, label: "Costs", description: "Operational expenses" },
  { id: 3, label: "Tax & P&L", description: "Filings & deductions" },
];

export function BusinessForm() {
  const navigate = useNavigate();
  const saved = loadAppData().business;
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<Partial<BusinessData>>({
    productRevenue: saved.productRevenue ?? 0,
    serviceRevenue: saved.serviceRevenue ?? 0,
    otherRevenue: saved.otherRevenue ?? 0,
    operationalCosts: saved.operationalCosts ?? 0,
    employeeSalaries: saved.employeeSalaries ?? 0,
    marketingExpenses: saved.marketingExpenses ?? 0,
    rentAndUtilities: saved.rentAndUtilities ?? 0,
    otherCosts: saved.otherCosts ?? 0,
    taxPaid: saved.taxPaid ?? 0,
    taxDeductions: saved.taxDeductions ?? 0,
  });

  const set = (key: keyof BusinessData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, [key]: parseFloat(e.target.value) || 0 }));
  };

  const handleSaveDraft = () => {
    saveAppData({ business: form, userType: "business" });
    toast({ title: "Draft Saved" });
  };

  const handleSubmit = () => {
    saveAppData({ business: form, userType: "business" });
    toast({ title: "Business Profile Updated" });
    navigate("/dashboard");
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-2 mb-8">
        {steps.map((s, i) => (
          <div key={s.id} className="flex items-center gap-2 flex-1 min-w-0">
            <button
              onClick={() => setStep(s.id)}
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 transition-all",
                step === s.id ? "bg-accent-blue text-white" : step > s.id ? "bg-success text-white" : "bg-muted text-muted-foreground"
              )}
            >
              {step > s.id ? <CheckCircle2 className="w-4 h-4" /> : s.id}
            </button>
            <div className="hidden sm:block">
              <p className={cn("text-xs font-semibold", step === s.id ? "text-foreground" : "text-muted-foreground")}>{s.label}</p>
            </div>
            {i < steps.length - 1 && <div className={cn("flex-1 h-px mx-1", step > s.id ? "bg-success" : "bg-border")} />}
          </div>
        ))}
      </div>

      <div className="bg-card rounded-xl border border-border p-6 card-shadow animate-fade-in-up">
        {step === 1 && (
          <BizSection title="Revenue Streams" subtitle="Monthly figures in ₹">
            <BizField label="Product / Goods Revenue" id="pr" value={form.productRevenue} onChange={set("productRevenue")} />
            <BizField label="Service / Consulting Revenue" id="sr" value={form.serviceRevenue} onChange={set("serviceRevenue")} />
            <BizField label="Other Revenue (licensing, etc.)" id="or" value={form.otherRevenue} onChange={set("otherRevenue")} />
          </BizSection>
        )}
        {step === 2 && (
          <BizSection title="Operational Costs" subtitle="Monthly expenses in ₹">
            <BizField label="Operational & Infrastructure Costs" id="oc" value={form.operationalCosts} onChange={set("operationalCosts")} />
            <BizField label="Total Employee Salaries" id="es" value={form.employeeSalaries} onChange={set("employeeSalaries")} />
            <BizField label="Marketing & Advertising" id="mkt" value={form.marketingExpenses} onChange={set("marketingExpenses")} />
            <BizField label="Rent & Utilities" id="ru" value={form.rentAndUtilities} onChange={set("rentAndUtilities")} />
            <BizField label="Other Business Costs" id="ot" value={form.otherCosts} onChange={set("otherCosts")} />
          </BizSection>
        )}
        {step === 3 && (
          <BizSection title="Tax & Deductions" subtitle="Annual figures in ₹">
            <BizField label="Business Tax Deductions Claimed" id="td" value={form.taxDeductions} onChange={set("taxDeductions")} />
            <BizField label="Corporate Tax Already Paid" id="tp" value={form.taxPaid} onChange={set("taxPaid")} />
          </BizSection>
        )}

        <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
          <div className="flex gap-2">
            {step > 1 && (
              <Button variant="outline" onClick={() => setStep(s => s - 1)}>
                <ChevronLeft className="w-4 h-4 mr-1" /> Back
              </Button>
            )}
            <Button variant="outline" onClick={handleSaveDraft}><Save className="w-4 h-4 mr-1" /> Save Draft</Button>
          </div>
          {step < steps.length ? (
            <Button onClick={() => setStep(s => s + 1)} className="bg-primary hover:bg-primary/90">
              Next <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          ) : (
            <Button onClick={handleSubmit} className="bg-accent-blue hover:bg-accent-blue/90 text-white">
              View Dashboard <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

function BizSection({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-5">
        <h3 className="text-base font-bold text-foreground">{title}</h3>
        <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>
      </div>
      <div className="grid gap-4">{children}</div>
    </div>
  );
}

function BizField({ label, id, value, onChange }: { label: string; id: string; value: number | undefined; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) {
  return (
    <div>
      <Label htmlFor={id} className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">{label}</Label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium">₹</span>
        <Input id={id} type="number" value={value || ""} onChange={onChange} placeholder="0" className="pl-7 tabular-nums text-sm" />
      </div>
    </div>
  );
}
