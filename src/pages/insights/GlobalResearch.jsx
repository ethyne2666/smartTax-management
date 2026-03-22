import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function GlobalResearch() {
  return (
    <>
    <Navbar />
    <div className="p-10">
      <h1 className="text-3xl font-bold">Global Investment Research</h1>
    </div>
        <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg">
        <p className="mb-4">SmartTax's Global Research provides in-depth analysis of international markets, economic trends, and geopolitical factors. Our expert insights help investors navigate global opportunities and risks.</p>
        <ul className="list-disc list-inside">
        <li>✔ Comprehensive Market Analysis</li>
        <li>✔ Geopolitical Risk Assessment</li>
        <li>✔ Emerging Market Insights</li>
        <li>✔ Global Economic Forecasts</li>
        </ul>
        <ul className="list-disc list-inside mt-4">
            </ul>
        <ul className="list-disc list-inside mt-4">
        <li>✔ Cross-Border Tax Implications</li>
        <li>✔ International Investment Strategies</li>
        </ul>
        <ul className="list-disc list-inside mt-4">
        <li>✔ Global Investment Opportunities</li>
        <li>✔ Currency & Inflation Analysis</li>
        </ul>
      </div>
      <Footer />

    </>
  );
}