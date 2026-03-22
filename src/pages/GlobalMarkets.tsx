import Navbar from "@/components/Navbar";

export default function GlobalMarkets() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <Navbar />
      <h1 className="text-3xl font-bold mb-4">Global Markets</h1>

      <p className="text-gray-600 mb-6">
        Stay updated with global financial trends, stock markets, and international tax systems.
      </p>

      <ul className="space-y-3 text-gray-700">
        <li>✔ US & Indian Market Trends</li>
        <li>✔ Global Investment Opportunities</li>
        <li>✔ Currency & Inflation Analysis</li>
      </ul>
    </div>
  );
}