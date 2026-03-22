import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Insights() {
  return (
    <>
    <Navbar />
    <div className="p-10 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold">Insights Reports</h1>
      <p className="mt-4">Research and analytics insights.</p>
    </div>
    <Footer />
    </>
  );
}