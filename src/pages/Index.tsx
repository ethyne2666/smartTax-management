import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveAppData } from "@/lib/storage";
import { Button } from "@/components/ui/button";
import { User, Building2, Landmark, ArrowRight, ShieldCheck, TrendingUp, Brain, Wallet } from "lucide-react";
import { cn } from "@/lib/utils";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const userTypes = [
  {
    id: "individual" as const,
    icon: User,
    title: "Individual",
    description: "Salaried employees, freelancers, and self-employed professionals managing personal tax and finances.",
    features: ["Salary & freelance income", "Personal expense tracking", "Tax deduction optimizer", "Investment portfolio"],
    accentClass: "border-blue-200 hover:border-blue-400 group-hover:text-blue-600",
    iconBg: "bg-blue-50 text-blue-600",
    activeBg: "border-blue-500 bg-blue-50/50",
  },
  {
    id: "business" as const,
    icon: Building2,
    title: "Small Business",
    description: "Startups and SMEs tracking revenue, managing operational costs and filing taxes efficiently.",
    features: ["Revenue stream tracking", "P&L statements", "Employee cost management", "Business tax filings"],
    accentClass: "border-emerald-200 hover:border-emerald-400 group-hover:text-emerald-600",
    iconBg: "bg-emerald-50 text-emerald-600",
    activeBg: "border-emerald-500 bg-emerald-50/50",
  },
  {
    id: "company" as const,
    icon: Landmark,
    title: "Enterprise",
    description: "Mid-to-large companies with complex multi-department financials and advanced tax optimization needs.",
    features: ["Multi-department P&L", "CapEx vs OpEx analysis", "Corporate tax strategy", "Financial forecasting"],
    accentClass: "border-violet-200 hover:border-violet-400 group-hover:text-violet-600",
    iconBg: "bg-violet-50 text-violet-600",
    activeBg: "border-violet-500 bg-violet-50/50",
  },
];

const stats = [
  { label: "Tax Savings Identified", value: "₹2.4L avg" },
  { label: "Users Onboarded", value: "12,847" },
  { label: "AI Recommendations", value: "98,200+" },
];

export default function Index() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<"individual" | "business" | "company" | null>(null);

  const handleContinue = () => {
    if (!selected) return;
    saveAppData({ userType: selected });
    navigate(`/${selected}`);
  };

  return (
    <div className="min-h-screen bg-background">

      {/* HEADER */}
      <Navbar />

      {/* 🎥 HERO VIDEO */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        <video autoPlay loop muted playsInline className="absolute w-full h-full object-cover">
          <source src="/ipr.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative z-10 text-center px-6 max-w-3xl">
          <h1 className="text-5xl font-bold text-white">SmartTax</h1>
          <p className="mt-4 text-lg text-gray-200">
            AI-Powered Financial Intelligence & Tax Optimization
          </p>
          <Button onClick={() => navigate("/dashboard")} className="mt-6 bg-white text-black">
            Explore Platform
          </Button>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <div className="max-w-5xl mx-auto px-6 py-16">

        {/* ✨ IMPACT SECTION (After Hero) */}
<section className="bg-white py-20 px-6 border-b">
  <div className="max-w-6xl mx-auto text-center">

    {/* Heading */}
    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
      Built for smarter financial decisions
    </h2>

    <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
      SmartTax empowers individuals and businesses to optimize taxes, 
      reduce unnecessary expenses, and grow wealth with intelligent insights.
    </p>

    {/* Stats Row */}
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mt-14">

      {[
        { value: "₹2.4L+", label: "Average Tax Savings Identified" },
        { value: "12K+", label: "Users Managing Finances" },
        { value: "98K+", label: "AI Insights Generated" },
      ].map((item, i) => (
        <div key={i} className="text-center">

          {/* Big Number */}
          <p className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight">
            {item.value}
          </p>

          {/* Label */}
          <p className="text-sm text-gray-500 mt-2">
            {item.label}
          </p>

        </div>
      ))}

    </div>
  </div>
</section>

        {/* USER TYPES */}
        <br/>
        <hr/>
        <br/>
        <div className="mb-10">
          <h2 className="text-lg font-bold mb-4">Select your profile</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {userTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setSelected(type.id)}
                className={cn(
                  "p-5 rounded-xl border-2 bg-white",
                  selected === type.id ? type.activeBg : "border-gray-200"
                )}
              >
                <type.icon className="w-6 h-6 mb-3" />
                <h3 className="font-bold">{type.title}</h3>
                <p className="text-sm text-gray-500">{type.description}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-center">
          <Button onClick={handleContinue} disabled={!selected}>
            Get Started <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>

        {/* FEATURES */}
        <div className="grid sm:grid-cols-3 gap-6 mt-20">
          {[
            { icon: ShieldCheck, title: "Tax Optimization AI" },
            { icon: TrendingUp, title: "Investment Advisor" },
            { icon: Brain, title: "Expense Intelligence" },
          ].map((f, i) => (
            <div key={i} className="text-center">
              <f.icon className="mx-auto mb-2" />
              <h4 className="font-bold">{f.title}</h4>
            </div>
          ))}
        </div>
      </div>

      {/* 🖼️ IMAGE SECTION (IMPROVED) */}
<section className="bg-white py-20 px-6 border-t">
  <div className="max-w-6xl mx-auto text-center mb-12">
    <h2 className="text-3xl font-bold">Engineering Excellence</h2>
    <p className="text-gray-600 mt-2">
      Built with innovation, precision, and financial intelligence
    </p>
  </div>

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
    {[
      {
        src: "https://www.goldmansachs.com/worldwide/india/engineering-excellence/GS_VM_Photo_GB_BLR_01065_RGB-1x1.png",
        title: "Technology Infrastructure",
        desc: "Robust systems powering large-scale financial analytics."
      },
      {
        src: "https://www.goldmansachs.com/worldwide/india/engineering-excellence/GS_VM_Photo_GB_BLR_00558_RGB-1x1.png",
        title: "AI & Data Science",
        desc: "Advanced machine learning models for tax optimization."
      },
      {
        src: "https://www.goldmansachs.com/worldwide/india/engineering-excellence/GS_VM_Photo_GB_BLR_00686_RGB-1x1.png",
        title: "Secure Systems",
        desc: "Enterprise-grade security for financial data protection."
      },
      {
        src: "https://www.goldmansachs.com/worldwide/india/careers/GS_VM_Photo_GB_BLR_01404_RGB-1x1.png",
        title: "Global Talent",
        desc: "Driven by experts in finance, AI, and engineering."
      },
    ].map((item, i) => (
      <div
        key={i}
        className="bg-white rounded-xl border shadow-sm hover:shadow-md transition overflow-hidden group"
      >
        {/* Fixed Image Size */}
        <div className="aspect-square overflow-hidden">
          <img
            src={item.src}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
          />
        </div>

        {/* Text Content */}
        <div className="p-4 text-left">
          <h3 className="text-sm font-semibold text-gray-900">
            {item.title}
          </h3>
          <p className="text-xs text-gray-600 mt-1 leading-relaxed">
            {item.desc}
          </p>
        </div>
      </div>
    ))}
  </div>
</section>

      {/* 💼 BANKING & INVESTMENT SERVICES */}
<section className="py-20 px-6 bg-gray-50 border-t">
  <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">

    <div>
      <h2 className="text-3xl font-bold mb-4">
        Smart Financial & Banking Services
      </h2>
      <p className="text-gray-600 mb-4">
        SmartTax AI provides deep insights into your banking behavior, helping you optimize savings, manage risk, and plan long-term investments.
      </p>

      <ul className="space-y-2 text-sm text-gray-700">
        <li>✔ Savings & Current Account Analysis</li>
        <li>✔ Loan & EMI Optimization</li>
        <li>✔ Credit Score Awareness</li>
        <li>✔ Real-time Expense Monitoring</li>
      </ul>
    </div>

    <img
      src="https://www.softermii.com/assets/uploads/blog/20230705/iot-use-cases-in-banking@2x.webp"
      className="rounded-xl shadow"
    />
  </div>
</section>

{/* 🪙 GOLD & INVESTMENT */}
<section className="py-20 px-6 bg-white">
  <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">

    <img
      src="https://cem-cms-data.s3.ap-south-1.amazonaws.com/Gold%20vs%20Stocks.webp"
      className="rounded-xl shadow"
    />

    <div>
      <h2 className="text-3xl font-bold mb-4">
        Gold, Stocks & Smart Investments
      </h2>
      <p className="text-gray-600 mb-4">
        Diversify your portfolio with gold, equities, and mutual funds. Our AI recommends the best investment strategies based on your financial profile.
      </p>

      <ul className="space-y-2 text-sm text-gray-700">
        <li>✔ Gold investment insights (Digital & Physical)</li>
        <li>✔ Stock market analysis</li>
        <li>✔ Mutual fund recommendations</li>
        <li>✔ Risk-based portfolio planning</li>
      </ul>
    </div>

  </div>
</section>

{/* 🌍 GLOBAL TAX & GOVERNMENT POLICIES */}
<section className="py-20 px-6 bg-gray-50 border-t">
  <div className="max-w-6xl mx-auto text-center">

    <h2 className="text-3xl font-bold mb-4">
      Global Tax Policies & Financial Regulations
    </h2>

    <p className="text-gray-600 max-w-2xl mx-auto mb-10">
      Explore tax systems, investment rules, and banking regulations across multiple countries. 
      SmartTax AI helps individuals and businesses stay compliant globally.
    </p>

    {/* 🌍 Country Selector */}
    <div className="mb-10">
      <select
        className="px-4 py-3 border rounded-md"
        onChange={(e) => {
          const value = e.target.value;

          const links: any = {
            india: "https://www.incometax.gov.in",
            usa: "https://www.irs.gov",
            uk: "https://www.gov.uk/income-tax",
            uae: "https://tax.gov.ae",
          };

          if (links[value]) {
            window.open(links[value], "_blank");
          }
        }}
      >
        <option>Select Country</option>
        <option value="india">India 🇮🇳</option>
        <option value="usa">USA 🇺🇸</option>
        <option value="uk">UK 🇬🇧</option>
        <option value="uae">UAE 🇦🇪</option>
      </select>
    </div>

    {/* 🌐 Cards */}
    <div className="grid md:grid-cols-3 gap-6 text-left">

      <div className="p-6 bg-white rounded-xl shadow">
        <h3 className="font-bold mb-2">Income Tax Systems</h3>
        <p className="text-sm text-gray-600 mb-4">
          Compare global tax structures, slabs, and deductions across countries.
        </p>
        <button
          onClick={() => window.open("https://www.irs.gov", "_blank")}
          className="text-blue-600 text-sm font-medium"
        >
          View Global Tax Info →
        </button>
      </div>

      <div className="p-6 bg-white rounded-xl shadow">
        <h3 className="font-bold mb-2">Investment Policies</h3>
        <p className="text-sm text-gray-600 mb-4">
          Understand government-backed investment schemes and regulations worldwide.
        </p>
        <button
          onClick={() => window.open("https://www.worldbank.org", "_blank")}
          className="text-blue-600 text-sm font-medium"
        >
          Explore Policies →
        </button>
      </div>

      <div className="p-6 bg-white rounded-xl shadow">
        <h3 className="font-bold mb-2">Banking Regulations</h3>
        <p className="text-sm text-gray-600 mb-4">
          Learn global banking compliance, lending rules, and financial systems.
        </p>
        <button
          onClick={() => window.open("https://www.bis.org", "_blank")}
          className="text-blue-600 text-sm font-medium"
        >
          View Regulations →
        </button>
      </div>

    </div>
  </div>
</section>

{/* 📍 INFORMATION & DISCLOSURES */}
<section className="py-20 px-6 bg-white border-t">
  <div className="max-w-6xl mx-auto">

    <h2 className="text-3xl font-bold mb-10 text-center">
      Information & Disclosures
    </h2>

    <div className="grid md:grid-cols-3 gap-8 text-sm text-gray-700">

      <div>
        <h3 className="font-bold mb-2">Bengaluru</h3>
        <p>
          SmartTax Services Pvt Ltd<br />
          150 Outer Ring Road<br />
          Helios Business Park<br />
          Kadubeesanahalli<br />
          Bengaluru – 560103<br />
          India<br /><br />
          Phone: +91 80 4127 1600
        </p>
      </div>

      <div>
        <h3 className="font-bold mb-2">Hyderabad</h3>
        <p>
          SmartTax Services Pvt Ltd<br />
          Knowledge City, Hi-Tec City<br />
          Hyderabad – 500081<br />
          India<br /><br />
          Phone: +91 40 4690 55155
        </p>
      </div>

      <div>
        <h3 className="font-bold mb-2">Mumbai</h3>
        <p>
          SmartTax Financial Services<br />
          10th Floor, Ascent-Worli<br />
          Worli, Mumbai – 400025<br />
          India<br /><br />
          Phone: +91 22 6616 9000
        </p>
      </div>

      <div>
        <h3 className="font-bold mb-2">Kolkata</h3>
        <p>
          SmartTax Financial Services<br />
          1st Floor, Ascent-Worli<br />
          newcity, Kolkata – 400025<br />
          India<br /><br />
          Phone: +91 22 6616 9000
        </p>
      </div>

      <div>
        <h3 className="font-bold mb-2">Patna</h3>
        <p>
          SmartTax Financial Services<br />
          1st Floor, Ascent-Worli<br />
          oldtown, Patna – 123456779<br />
          India<br /><br />
          Phone: +91 22 6616 9000
        </p>
      </div>

    </div>
  </div>
</section>

{/* 📩 NEWSLETTER SUBSCRIBE */}
<section className="py-20 px-6 bg-blue-100 border-t">
  <div className="max-w-3xl mx-auto text-center">

    <h2 className="text-3xl font-bold text-black mb-4">
      Subscribe to Briefings
    </h2>

    <p className="text-black/80 mb-6">
      Our signature newsletter with insights and analysis from across SmartTax AI.
    </p>

    {/* Input + Button */}
    <div className="flex flex-col sm:flex-row gap-3 justify-center mb-4">
      <input
        type="email"
        placeholder="Enter your email"
        className="px-4 py-3 rounded-md border border-gray-300 w-full sm:w-80 focus:outline-none"
      />

      <button className="px-6 py-3 bg-black text-white rounded-md hover:bg-gray-800 transition">
        Submit
      </button>
    </div>

    {/* Disclaimer */}
    <p className="text-xs text-black/70 max-w-xl mx-auto">
      By submitting this information, you agree that the information you are providing is subject to SmartTax AI’s privacy policy and Terms of Use. You consent to receive our newsletter via email.
    </p>

  </div>
</section>

      <Footer />
    </div>
  );
}