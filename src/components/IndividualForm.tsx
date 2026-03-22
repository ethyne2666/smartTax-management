import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronRight, ChevronLeft, CheckCircle2, Save } from "lucide-react";
import { saveAppData, loadAppData, type IndividualData } from "@/lib/storage";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const steps = [
  { id: 1, label: "Income", description: "Your earnings" },
  { id: 2, label: "Expenses", description: "Monthly outflows" },
  { id: 3, label: "Investments", description: "Your portfolio" },
  { id: 4, label: "Tax & Loans", description: "Deductions & EMIs" },
];

export function IndividualForm() {
  const navigate = useNavigate();
  const saved = loadAppData().individual;
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<Partial<IndividualData>>({
    salary: saved.salary ?? 0,
    freelanceIncome: saved.freelanceIncome ?? 0,
    otherIncome: saved.otherIncome ?? 0,
    rent: saved.rent ?? 0,
    food: saved.food ?? 0,
    travel: saved.travel ?? 0,
    subscriptions: saved.subscriptions ?? 0,
    otherExpenses: saved.otherExpenses ?? 0,
    stocks: saved.stocks ?? 0,
    mutualFunds: saved.mutualFunds ?? 0,
    crypto: saved.crypto ?? 0,
    fixedDeposits: saved.fixedDeposits ?? 0,
    taxDeductions: saved.taxDeductions ?? 0,
    taxPaid: saved.taxPaid ?? 0,
    emiAmount: saved.emiAmount ?? 0,
    riskProfile: saved.riskProfile ?? "medium",
  });

  const set = (key: keyof IndividualData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, [key]: parseFloat(e.target.value) || 0 }));
  };

  const handleSaveDraft = () => {
    saveAppData({ individual: form, userType: "individual" });
    toast({ title: "Draft Saved", description: "Your data has been saved locally." });
  };

  const handleSubmit = () => {
    saveAppData({ individual: form, userType: "individual" });
    toast({ title: "Profile Updated", description: "Dashboard will reflect your latest data." });
    navigate("/dashboard");
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Step Progress */}
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
            <div className="hidden sm:block min-w-0">
              <p className={cn("text-xs font-semibold truncate", step === s.id ? "text-foreground" : "text-muted-foreground")}>{s.label}</p>
            </div>
            {i < steps.length - 1 && <div className={cn("flex-1 h-px mx-1", step > s.id ? "bg-success" : "bg-border")} />}
          </div>
        ))}
      </div>

      {/* Step content */}
      <div className="bg-card rounded-xl border border-border p-6 card-shadow animate-fade-in-up">
        {step === 1 && (
          <FormSection title="Income Details" subtitle="Annual figures in INR (₹)">
            <FormField label="Monthly Salary (after HRA)" id="salary" value={form.salary} onChange={set("salary")} prefix="₹" />
            <FormField label="Freelance / Consulting Income" id="freelance" value={form.freelanceIncome} onChange={set("freelanceIncome")} prefix="₹" />
            <FormField label="Other Income (rental, dividends, etc.)" id="other" value={form.otherIncome} onChange={set("otherIncome")} prefix="₹" />
            <div>
              <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">Risk Appetite</Label>
              <Select value={form.riskProfile} onValueChange={(v: "low" | "medium" | "high") => setForm(p => ({ ...p, riskProfile: v }))}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">🛡️ Low Risk — Capital preservation</SelectItem>
                  <SelectItem value="medium">⚖️ Medium Risk — Balanced growth</SelectItem>
                  <SelectItem value="high">🚀 High Risk — Maximum returns</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </FormSection>
        )}
        {step === 2 && (
          <FormSection title="Monthly Expenses" subtitle="Average monthly outflow in ₹">
            <FormField label="Rent / Home Loan EMI" id="rent" value={form.rent} onChange={set("rent")} prefix="₹" />
            <FormField label="Food & Groceries" id="food" value={form.food} onChange={set("food")} prefix="₹" />
            <FormField label="Travel & Transport" id="travel" value={form.travel} onChange={set("travel")} prefix="₹" />
            <FormField label="Subscriptions & Entertainment" id="subs" value={form.subscriptions} onChange={set("subscriptions")} prefix="₹" />
            <FormField label="Other Monthly Expenses" id="other" value={form.otherExpenses} onChange={set("otherExpenses")} prefix="₹" />
          </FormSection>
        )}
        {step === 3 && (
          <FormSection title="Investment Portfolio" subtitle="Current invested values in ₹">
            <FormField label="Stocks & Equity" id="stocks" value={form.stocks} onChange={set("stocks")} prefix="₹" />
            <FormField label="Mutual Funds (all types)" id="mf" value={form.mutualFunds} onChange={set("mutualFunds")} prefix="₹" />
            <FormField label="Cryptocurrency" id="crypto" value={form.crypto} onChange={set("crypto")} prefix="₹" />
            <FormField label="Fixed Deposits & Bonds" id="fd" value={form.fixedDeposits} onChange={set("fixedDeposits")} prefix="₹" />
          </FormSection>
        )}
        {step === 4 && (
          <FormSection title="Tax & Loans" subtitle="Annual tax figures and monthly EMIs in ₹">
            <FormField label="Total 80C/80D Deductions Claimed" id="ded" value={form.taxDeductions} onChange={set("taxDeductions")} prefix="₹" />
            <FormField label="Tax Already Paid (TDS + Advance)" id="taxPaid" value={form.taxPaid} onChange={set("taxPaid")} prefix="₹" />
            <FormField label="Total Monthly EMI Payments" id="emi" value={form.emiAmount} onChange={set("emiAmount")} prefix="₹" />
          </FormSection>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
          <div className="flex gap-2">
            {step > 1 && (
              <Button variant="outline" onClick={() => setStep(s => s - 1)}>
                <ChevronLeft className="w-4 h-4 mr-1" /> Back
              </Button>
            )}
            <Button variant="outline" onClick={handleSaveDraft}>
              <Save className="w-4 h-4 mr-1" /> Save Draft
            </Button>
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

function FormSection({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
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

interface FormFieldProps {
  label: string;
  id: string;
  value: number | undefined;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  prefix?: string;
}

function FormField({ label, id, value, onChange, prefix }: FormFieldProps) {
  return (
    <div>
      <Label htmlFor={id} className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">{label}</Label>
      <div className="relative">
        {prefix && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium">{prefix}</span>}
        <Input
          id={id}
          type="number"
          value={value || ""}
          onChange={onChange}
          placeholder="0"
          className={cn("tabular-nums text-sm", prefix && "pl-7")}
        />
      </div>
    </div>
  );
}
