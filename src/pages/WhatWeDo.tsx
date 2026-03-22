import Navbar from "@/components/Navbar";

export default function WhatWeDo() {
  return (
    <>
    <Navbar/>
    <div className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-4">What We Do</h1>

      <p className="text-gray-600 mb-6">
        SmartTax provides AI-driven financial intelligence to help individuals and businesses manage taxes, optimize investments, and improve financial health.
      </p>

      <ul className="space-y-3 text-gray-700">
        <li>✔ Tax Optimization & Planning</li>
        <li>✔ Investment Advisory (Stocks, Gold, Mutual Funds)</li>
        <li>✔ Expense Analysis & Budgeting</li>
        <li>✔ Financial Forecasting</li>
      </ul>
    </div>
    </>
  );
}