import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { TrendingUp, DollarSign, Activity } from "lucide-react";

export default function GlobalMarkets() {
  return (
    <div>
      <Navbar />

      <div className="bg-[#AFC0D4] py-20 text-center">
        <h1 className="text-5xl font-bold">Global Markets</h1>
      </div>

      <div className="max-w-6xl mx-auto py-16 px-6 grid md:grid-cols-3 gap-8">
        <div className="border p-6 rounded-xl">
          <TrendingUp />
          <h3 className="font-bold mt-3">Stock Markets</h3>
          <p>Track global equity performance.</p>
        </div>

        <div className="border p-6 rounded-xl">
          <DollarSign />
          <h3 className="font-bold mt-3">Currency</h3>
          <p>Monitor forex and exchange rates.</p>
        </div>

        <div className="border p-6 rounded-xl">
          <Activity />
          <h3 className="font-bold mt-3">Commodities</h3>
          <p>Gold, oil, and energy insights.</p>
        </div>
      </div>

      <div className="text-center py-10">
        <img src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3"
          className="mx-auto max-w-4xl rounded-xl shadow"
        />
      </div>

      <hr />

      <Footer />

    </div>
  );
}