import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* LEFT: LOGO */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate("/")}>
          <img
            src="https://res.cloudinary.com/debzdkdon/image/upload/v1774199673/smart_Tax-2_vpxd3s.png"
            alt="SmartTax Logo"
            className="h-12 w-13 object-contain"
          />
            <span className="text-xl font-bold text-gray-800">SmartTax</span>
        </div>

        {/* CENTER: NAV LINKS */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-700">

          <button className="hover:text-black transition">What We Do</button>

          <button className="hover:text-black transition">Insights</button>

          <button className="hover:text-black transition">Investor Relations</button>

          <button className="hover:text-black transition">Global Markets</button>

        </nav>

        {/* RIGHT: SEARCH + BUTTON */}
        <div className="flex items-center gap-4">

          {/* Search Icon */}
          <Search className="w-5 h-5 text-gray-500 cursor-pointer hover:text-black" />

          {/* CTA Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate("/dashboard")}
          >
            Dashboard →
          </Button>

        </div>

      </div>
    </header>
  );
}