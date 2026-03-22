import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronRight, ChevronLeft, CheckCircle2, Save } from "lucide-react";
import { saveAppData, loadAppData, type CompanyData } from "@/lib/storage";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const steps = [
  { id: 1, label: "Revenue", description: "Dept. revenue" },
  { id: 2, label: "Expenditure", description: "CapEx & OpEx" },
  { id: 3, label: "HR & Tax", description: "Payroll & filings" },
];

export function CompanyForm() {
  const navigate = useNavigate();
  const saved = loadAppData().company;
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<Partial<CompanyData>>({
    salesRevenue: saved.salesRevenue ?? 0,
    techRevenue: saved.techRevenue ?? 0,
    consultingRevenue: saved.consultingRevenue ?? 0,
    capitalExpenditure: saved.capitalExpenditure ?? 0,
    operationalExpenditure: saved.operationalExpenditure ?? 0,
    totalPayroll: saved.totalPayroll ?? 0,
    headcount: saved.headcount ?? 0,
    corporateTaxPaid: saved.corporateTaxPaid ?? 0,
    depreciation: saved.depreciation ?? 0,
  });

  const set = (key: keyof CompanyData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, [key]: parseFloat(e.target.value) || 0 }));
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
          <CoSection title="Department Revenue" subtitle="Monthly revenue by department (₹)">
            <CoField label="Sales & Distribution" id="sr" value={form.salesRevenue} onChange={set("salesRevenue")} />
            <CoField label="Technology / SaaS Revenue" id="tr" value={form.techRevenue} onChange={set("techRevenue")} />
            <CoField label="Consulting / Professional Services" id="cr" value={form.consultingRevenue} onChange={set("consultingRevenue")} />
          </CoSection>
        )}
        {step === 2 && (
          <CoSection title="Expenditure Classification" subtitle="Monthly figures (₹)">
            <CoField label="Capital Expenditure (CapEx)" id="cx" value={form.capitalExpenditure} onChange={set("capitalExpenditure")} />
            <CoField label="Operational Expenditure (OpEx)" id="ox" value={form.operationalExpenditure} onChange={set("operationalExpenditure")} />
            <CoField label="Depreciation (monthly equivalent)" id="dep" value={form.depreciation} onChange={set("depreciation")} />
          </CoSection>
        )}
        {step === 3 && (
          <CoSection title="HR & Tax" subtitle="Monthly/Annual figures (₹)">
            <CoField label="Total Monthly Payroll" id="py" value={form.totalPayroll} onChange={set("totalPayroll")} />
            <div>
              <Label htmlFor="hc" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">Total Headcount</Label>
              <Input id="hc" type="number" value={form.headcount || ""} onChange={set("headcount")} placeholder="0" className="tabular-nums text-sm" />
            </div>
            <CoField label="Corporate Tax Paid (annual)" id="ct" value={form.corporateTaxPaid} onChange={set("corporateTaxPaid")} />
          </CoSection>
        )}

        <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
          <div className="flex gap-2">
            {step > 1 && (
              <Button variant="outline" onClick={() => setStep(s => s - 1)}>
                <ChevronLeft className="w-4 h-4 mr-1" /> Back
              </Button>
            )}
            <Button variant="outline" onClick={() => {
              saveAppData({ company: form, userType: "company" });
              toast({ title: "Draft Saved" });
            }}><Save className="w-4 h-4 mr-1" /> Save Draft</Button>
          </div>
          {step < steps.length ? (
            <Button onClick={() => setStep(s => s + 1)} className="bg-primary hover:bg-primary/90">
              Next <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          ) : (
            <Button onClick={() => {
              saveAppData({ company: form, userType: "company" });
              toast({ title: "Company Profile Updated" });
              navigate("/dashboard");
            }} className="bg-accent-blue hover:bg-accent-blue/90 text-white">
              View Dashboard <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

function CoSection({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
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

function CoField({ label, id, value, onChange }: { label: string; id: string; value: number | undefined; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) {
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
