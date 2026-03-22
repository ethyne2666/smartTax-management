// Central data store using localStorage

export type UserType = "individual" | "business" | "company" | null;

export interface IndividualData {
  // Income
  salary: number;
  freelanceIncome: number;
  otherIncome: number;
  // Expenses
  rent: number;
  food: number;
  travel: number;
  subscriptions: number;
  otherExpenses: number;
  // Investments
  stocks: number;
  mutualFunds: number;
  crypto: number;
  fixedDeposits: number;
  // Tax
  taxDeductions: number;
  taxPaid: number;
  // Loans
  emiAmount: number;
  // Risk profile
  riskProfile: "low" | "medium" | "high";
}

export interface BusinessData {
  // Revenue
  productRevenue: number;
  serviceRevenue: number;
  otherRevenue: number;
  // Costs
  operationalCosts: number;
  employeeSalaries: number;
  marketingExpenses: number;
  rentAndUtilities: number;
  otherCosts: number;
  // Tax
  taxPaid: number;
  taxDeductions: number;
}

export interface CompanyData {
  // Departments (monthly)
  salesRevenue: number;
  techRevenue: number;
  consultingRevenue: number;
  // CapEx vs OpEx
  capitalExpenditure: number;
  operationalExpenditure: number;
  // HR
  totalPayroll: number;
  headcount: number;
  // Tax
  corporateTaxPaid: number;
  depreciation: number;
}

export interface AppData {
  userType: UserType;
  individual: Partial<IndividualData>;
  business: Partial<BusinessData>;
  company: Partial<CompanyData>;
  monthlyData: MonthlyEntry[];
}

export interface MonthlyEntry {
  month: string;
  income: number;
  expenses: number;
}

const STORAGE_KEY = "smarttax_ai_data";

const defaultMonthly: MonthlyEntry[] = [
  { month: "Jan", income: 85000, expenses: 62000 },
  { month: "Feb", income: 92000, expenses: 68000 },
  { month: "Mar", income: 88000, expenses: 71000 },
  { month: "Apr", income: 95000, expenses: 64000 },
  { month: "May", income: 103000, expenses: 78000 },
  { month: "Jun", income: 98000, expenses: 72000 },
];

const defaultAppData: AppData = {
  userType: null,
  individual: {
    salary: 0, freelanceIncome: 0, otherIncome: 0,
    rent: 0, food: 0, travel: 0, subscriptions: 0, otherExpenses: 0,
    stocks: 0, mutualFunds: 0, crypto: 0, fixedDeposits: 0,
    taxDeductions: 0, taxPaid: 0, emiAmount: 0, riskProfile: "medium",
  },
  business: {
    productRevenue: 0, serviceRevenue: 0, otherRevenue: 0,
    operationalCosts: 0, employeeSalaries: 0, marketingExpenses: 0,
    rentAndUtilities: 0, otherCosts: 0, taxPaid: 0, taxDeductions: 0,
  },
  company: {
    salesRevenue: 0, techRevenue: 0, consultingRevenue: 0,
    capitalExpenditure: 0, operationalExpenditure: 0,
    totalPayroll: 0, headcount: 0, corporateTaxPaid: 0, depreciation: 0,
  },
  monthlyData: defaultMonthly,
};

export function loadAppData(): AppData {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return { ...defaultAppData, ...JSON.parse(stored) };
  } catch {}
  return defaultAppData;
}

export function saveAppData(data: Partial<AppData>) {
  try {
    const current = loadAppData();
    const merged = { ...current, ...data };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
  } catch {}
}

export function clearAppData() {
  localStorage.removeItem(STORAGE_KEY);
}

// Derived calculations
export function calcIndividual(d: Partial<IndividualData>) {
  const totalIncome = (d.salary ?? 0) + (d.freelanceIncome ?? 0) + (d.otherIncome ?? 0);
  const totalExpenses = (d.rent ?? 0) + (d.food ?? 0) + (d.travel ?? 0) + (d.subscriptions ?? 0) + (d.otherExpenses ?? 0) + (d.emiAmount ?? 0);
  const totalInvestments = (d.stocks ?? 0) + (d.mutualFunds ?? 0) + (d.crypto ?? 0) + (d.fixedDeposits ?? 0);
  const netSavings = totalIncome - totalExpenses - totalInvestments;
  const taxableIncome = Math.max(0, totalIncome - (d.taxDeductions ?? 0));
  const estimatedTax = taxableIncome > 250000 ? (taxableIncome - 250000) * 0.20 : 0;
  const taxSavings = Math.max(0, estimatedTax - (d.taxPaid ?? 0));
  const healthScore = Math.min(100, Math.max(0, Math.round((netSavings / Math.max(totalIncome, 1)) * 100 + 50)));
  return { totalIncome, totalExpenses, totalInvestments, netSavings, taxableIncome, estimatedTax, taxSavings, healthScore };
}

export function calcBusiness(d: Partial<BusinessData>) {
  const totalRevenue = (d.productRevenue ?? 0) + (d.serviceRevenue ?? 0) + (d.otherRevenue ?? 0);
  const totalCosts = (d.operationalCosts ?? 0) + (d.employeeSalaries ?? 0) + (d.marketingExpenses ?? 0) + (d.rentAndUtilities ?? 0) + (d.otherCosts ?? 0);
  const grossProfit = totalRevenue - totalCosts;
  const taxableIncome = Math.max(0, grossProfit - (d.taxDeductions ?? 0));
  const estimatedTax = taxableIncome * 0.25;
  const profitMargin = totalRevenue > 0 ? Math.round((grossProfit / totalRevenue) * 100) : 0;
  return { totalRevenue, totalCosts, grossProfit, taxableIncome, estimatedTax, profitMargin };
}

export function calcCompany(d: Partial<CompanyData>) {
  const totalRevenue = (d.salesRevenue ?? 0) + (d.techRevenue ?? 0) + (d.consultingRevenue ?? 0);
  const totalExpenses = (d.capitalExpenditure ?? 0) + (d.operationalExpenditure ?? 0) + (d.totalPayroll ?? 0);
  const ebitda = totalRevenue - (d.operationalExpenditure ?? 0) - (d.totalPayroll ?? 0);
  const netIncome = ebitda - (d.depreciation ?? 0) - (d.corporateTaxPaid ?? 0);
  const revenuePerEmployee = (d.headcount ?? 1) > 0 ? Math.round(totalRevenue / (d.headcount ?? 1)) : 0;
  return { totalRevenue, totalExpenses, ebitda, netIncome, revenuePerEmployee };
}
