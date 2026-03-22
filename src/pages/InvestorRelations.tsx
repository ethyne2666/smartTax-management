import Navbar from "@/components/Navbar";

export default function InvestorRelations() {
  return (
    <>
    <Navbar/>
    <div className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-4">Investor Relations</h1>

      <p className="text-gray-600 mb-6">
        Transparency and trust are at the core of SmartTax AI. We provide clear insights into performance and financial data.
      </p>

      <ul className="space-y-3 text-gray-700">
        <li>✔ Financial Reports</li>
        <li>✔ Revenue Growth Metrics</li>
        <li>✔ Investment Opportunities</li>
      </ul>
    </div>
    </>
  );
}