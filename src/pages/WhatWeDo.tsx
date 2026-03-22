import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { LineChart, Briefcase, TrendingUp } from "lucide-react";

export default function WhatWeDo() {
  return (
    <div className="bg-white text-gray-800">
      <Navbar />
      {/* HERO */}
      <div className="bg-[#AFC0D4] py-20 text-center">
        <h1 className="text-5xl font-bold mb-4">What We Do</h1>
        <p className="max-w-2xl mx-auto text-lg">
          SmartTax empowers individuals and businesses with AI-driven financial intelligence
          to optimize taxes, investments, and long-term growth strategies.
        </p>
      </div>

      {/* SECTION */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-semibold mb-6">Our Core Services</h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-6 border rounded-xl">
            <LineChart className="mb-4" />
            <h3 className="font-bold mb-2">Tax Optimization</h3>
            <p>Advanced strategies to minimize liabilities and maximize savings.</p>
          </div>

          <div className="p-6 border rounded-xl">
            <TrendingUp className="mb-4" />
            <h3 className="font-bold mb-2">Investment Advisory</h3>
            <p>AI-backed insights for smarter portfolio management.</p>
          </div>

          <div className="p-6 border rounded-xl">
            <Briefcase className="mb-4" />
            <h3 className="font-bold mb-2">Wealth Planning</h3>
            <p>Long-term financial strategies tailored to your goals.</p>
          </div>
        </div>
      </div>

      {/* IMAGE */}
      <div className="py-16 text-center">
        <img
          src="https://images.unsplash.com/photo-1559526324-4b87b5e36e44"
          className="mx-auto rounded-xl shadow-lg max-w-5xl"
        />
      </div>

      {/* CONTENT */}
      <div className="max-w-4xl mx-auto px-6 py-16 space-y-6">
        <p>
          SmartTax integrates artificial intelligence with financial analytics to deliver
          actionable insights. Our platform continuously analyzes financial data,
          enabling users to make informed decisions in real time.
        </p>

        <p>
          We believe that financial intelligence should be accessible, scalable, and
          adaptive. By combining machine learning models with economic data,
          SmartTax ensures precision and efficiency.
        </p>
      </div>

      <hr className="my-10" />

      {/* FOOTER */}
        <Footer />

    </div>
  );
}