import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import searchIndex from "@/data/searchData";

export default function Navbar() {
  const navigate = useNavigate();

  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [showInsights, setShowInsights] = useState(false);

  // FILTER LOGIC
  const filtered =
    query.length > 0
      ? searchIndex.filter(item =>
          item.title.toLowerCase().includes(query.toLowerCase())
        )
      : [];

  return (
    <>
      {/* NAVBAR */}
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

          {/* LOGO */}
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <img
              src="https://res.cloudinary.com/debzdkdon/image/upload/v1774199673/smart_Tax-2_vpxd3s.png"
              className="h-12"
            />
            <span className="text-xl font-bold">SmartTax</span>
          </div>

          {/* NAV LINKS */}
          <nav className="hidden md:flex gap-8 text-sm font-medium">
            <button onClick={() => navigate("/what-we-do")}>What We Do</button>
            <div
  className="relative"
  onMouseEnter={() => setShowInsights(true)}
  onMouseLeave={() => setShowInsights(false)}
>
  <button>Insights</button>

  {/* MEGA MENU */}
  {showInsights && (
    <div className="absolute left-0 top-full w-[800px] bg-white shadow-xl p-8 grid grid-cols-3 gap-8 z-50">

      {/* COLUMN 1 */}
      <div>
        <h3 className="text-xs font-semibold text-gray-500 mb-3 uppercase">
          Research & Perspectives
        </h3>

        <div onClick={() => navigate("/insights/global-research")} className="cursor-pointer mb-2 hover:underline">
          Global Investment Research
        </div>

        <div onClick={() => navigate("/insights/institute")} className="cursor-pointer mb-2 hover:underline">
          SmartTax Institute
        </div>
      </div>

      {/* COLUMN 2 */}
      <div>
        <h3 className="text-xs font-semibold text-gray-500 mb-3 uppercase">
          Reports
        </h3>

        <div onClick={() => navigate("/insights/tax-reports")} className="cursor-pointer mb-2 hover:underline">
          Tax Reports
        </div>

        <div onClick={() => navigate("/insights/investment-reports")} className="cursor-pointer mb-2 hover:underline">
          Investment Reports
        </div>
      </div>

      {/* COLUMN 3 */}
      <div>
        <h3 className="text-xs font-semibold text-gray-500 mb-3 uppercase">
          Featured
        </h3>

        <div onClick={() => navigate("/insights/market-outlook")} className="cursor-pointer mb-2 hover:underline">
          Market Outlook
        </div>

        <div onClick={() => navigate("/insights/economy")} className="cursor-pointer mb-2 hover:underline">
          Economic Signals
        </div>
      </div>

    </div>
  )}
</div>
            <button onClick={() => navigate("/investor-relations")}>Investor Relations</button>
            <button onClick={() => navigate("/global-markets")}>Global Markets</button>
          </nav>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-4">

            {/* SINGLE SEARCH ICON */}
            <Search
              className="w-5 h-5 cursor-pointer"
              onClick={() => setSearchOpen(true)}
            />

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

      {/* SEARCH OVERLAY */}
      {searchOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex flex-col items-center pt-32">

          {/* CLOSE BUTTON */}
          <X
            className="absolute top-6 right-6 text-white cursor-pointer"
            onClick={() => setSearchOpen(false)}
          />

          {/* INPUT */}
          <input
            autoFocus
            type="text"
            placeholder="Search SmartTax..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full max-w-2xl p-5 text-xl rounded-xl outline-none"
          />

          {/* RESULTS */}
          {query.length > 0 && (
            <div className="w-full max-w-2xl bg-white mt-4 rounded-xl shadow-lg">

              {filtered.length > 0 ? (
                filtered.map((item, i) => (
                  <div
                    key={i}
                    className="p-4 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      navigate(item.path);
                      setSearchOpen(false);
                      setQuery("");
                    }}
                  >
                    {item.title}
                  </div>
                ))
              ) : (
                <div className="p-4 text-gray-500">
                  No results found
                </div>
              )}

            </div>
          )}
        </div>
      )}
    </>
  );
}