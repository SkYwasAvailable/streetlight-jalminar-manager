import { Home, FileText } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export const BottomNav = () => {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2 px-4 shadow-lg">
      <div className="flex justify-around items-center max-w-md mx-auto">
        <Link
          to="/"
          className={`flex flex-col items-center p-2 ${
            location.pathname === "/home" ? "text-[#0EA5E9]" : "text-gray-500"
          }`}
        >
          <Home className="w-6 h-6" />
          <span className="text-xs mt-1">Home</span>
        </Link>
        <Link
          to="/reports"
          className={`flex flex-col items-center p-2 ${
            location.pathname === "/reports" ? "text-[#0EA5E9]" : "text-gray-500"
          }`}
        >
          <FileText className="w-6 h-6" />
          <span className="text-xs mt-1">Reports</span>
        </Link>
      </div>
    </nav>
  );
};