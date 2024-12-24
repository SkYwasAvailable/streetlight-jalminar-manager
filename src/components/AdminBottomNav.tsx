import { Home, Plus } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export const AdminBottomNav = () => {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2 px-4 shadow-lg">
      <div className="flex justify-around items-center max-w-md mx-auto">
        <Link
          to="/admin/dashboard"
          className={`flex flex-col items-center p-2 ${
            location.pathname === "/admin/dashboard" ? "text-[#0EA5E9]" : "text-gray-500"
          }`}
        >
          <Home className="w-6 h-6" />
          <span className="text-xs mt-1">Dashboard</span>
        </Link>
        <Link
          to="/admin/items"
          className={`flex flex-col items-center p-2 ${
            location.pathname === "/admin/items" ? "text-[#0EA5E9]" : "text-gray-500"
          }`}
        >
          <Plus className="w-6 h-6" />
          <span className="text-xs mt-1">Manage Items</span>
        </Link>
      </div>
    </nav>
  );
};