import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FileText, Users, Shield } from "lucide-react";

export default function InvestorRelations() {
  return (
    <div>
      <Navbar />

      <div className="bg-[#AFC0D4] py-20 text-center">
        <h1 className="text-5xl font-bold">Investor Relations</h1>
      </div>

      <div className="max-w-6xl mx-auto py-16 px-6 grid md:grid-cols-3 gap-8">
        <div className="border p-6 rounded-xl">
          <FileText />
          <h3 className="font-bold mt-3">Reports</h3>
          <p>Quarterly and annual financial disclosures.</p>
        </div>

        <div className="border p-6 rounded-xl">
          <Users />
          <h3 className="font-bold mt-3">Shareholders</h3>
          <p>Engagement and communication transparency.</p>
        </div>

        <div className="border p-6 rounded-xl">
          <Shield />
          <h3 className="font-bold mt-3">Governance</h3>
          <p>Strong corporate governance principles.</p>
        </div>
      </div>

      <div className="text-center py-10">
        <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0"
          className="mx-auto max-w-4xl rounded-xl shadow"
        />
      </div>

      <hr />

      <Footer />

    </div>
  );
}