import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { clearAuth } from "../../lib/auth";

export function DashboardHeader() {
  const navigate = useNavigate();

  const handleLogout = () => {
    clearAuth();
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-xs p-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-900">
              Financial Portfolio
            </h1>
          </div>
          <button
            onClick={handleLogout}
            className="hover:cursor-pointer inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-gray-800 bg-gray-100 hover:bg-gray-200 focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            <LogOut className="h-5 w-5 mr-2" />
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
