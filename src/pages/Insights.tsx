import Navbar from "@/components/Navbar";

export default function Insights() {
  return (
    
    <>
    <Navbar />
    <div className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-4">Insights</h1>

      <p className="text-gray-600 mb-6">
        Explore expert insights on taxation, investment trends, and financial strategies.
      </p>

      <div className="space-y-6">
        <div className="p-6 border rounded-lg">
          <h2 className="font-semibold">Tax Saving Strategies 2026</h2>
          <p className="text-sm text-gray-500">Learn how to maximize deductions.</p>
        </div>

        <div className="p-6 border rounded-lg">
          <h2 className="font-semibold">Gold vs Stocks</h2>
          <p className="text-sm text-gray-500">Which is better in 2026?</p>
        </div>
      </div>
    </div>
    </>
  );
}