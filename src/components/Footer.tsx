import { Linkedin, Github, Twitter ,Youtube} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white border-t mt-12">
      <div className="max-w-7xl mx-auto px-6 py-8">
        
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
  <img
    src="https://res.cloudinary.com/debzdkdon/image/upload/v1774196411/smart_Tax-1_pmrqgf.png"
    alt="SmartTax Logo"
    className="w-10 h-10 object-contain"
  />
  <div>
    <h2 className="text-lg font-semibold text-gray-800">
      SmartTax
    </h2>
    <p className="text-sm text-gray-500">
      Financial Intelligence Platform for Tax & Investment Management
    </p>
  </div>
</div>
          
          {/* Left - Brand */}
          
          {/* Right - Navigation (optional) */}
          <div className="flex gap-6 text-sm text-gray-600">
            <span className="hover:text-black cursor-pointer">Dashboard</span>
            <span className="hover:text-black cursor-pointer">Reports</span>
            <span className="hover:text-black cursor-pointer">AI Insights</span>
            <span className="hover:text-black cursor-pointer">Settings</span>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t my-6"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          
          {/* Project Credits */}
          <div>
            <p className="text-sm text-gray-600">
              © {new Date().getFullYear()} SmartTax AI. All rights reserved.
            </p>

            <p className="text-sm text-gray-500 mt-2">
              Developed as an <span className="font-semibold text-gray-700">IPR Project</span> by:
            </p>

            <div className="mt-2 text-sm">
              <p className="font-medium text-gray-800">
                1326 - Ashutosh Jha
              </p>
              <p className="font-medium text-gray-800">
                1328 - Ayush Kumar
              </p>
              <p className="font-medium text-gray-800">
                1329 - Charan Kumar
              </p>
            </div>
          </div>

          {/* Right Side Info */}
          <div className="text-sm text-gray-500 text-center md:text-right">
            <p>Built for financial clarity & smart tax planning</p>
            <p className="mt-1">Version 1.0 </p>
          </div>

          <div className="flex gap-4">
  <Linkedin className="w-4 h-4" />
  <Github className="w-4 h-4" />
  <Twitter className="w-4 h-4" />
  <Youtube className="w-4 h-4" />
</div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;