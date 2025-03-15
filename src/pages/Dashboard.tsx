import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { DonutChart } from "../components/DonutChart";
import { PositionsTable } from "../components/PositionsTable";
import { HistoricalChart } from "../components/HistoricalChart";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { clearAuth } from "../lib/auth";

type ViewType = "asset" | "class";

export function Dashboard() {
  const navigate = useNavigate();
  const [view, setView] = useState<ViewType>("asset");

  const { data: assets } = useQuery({
    queryKey: ["assets"],
    queryFn: () => fetch("/api/assets").then((res) => res.json()),
  });

  const { data: portfolio } = useQuery({
    queryKey: ["portfolio"],
    queryFn: () => fetch("/api/portfolios").then((res) => res.json()),
  });

  const { data: historicalData } = useQuery({
    queryKey: ["historical"],
    queryFn: async () => {
      const response = await fetch("/api/prices?asset=BTC");
      const data = (await response.json()) as { date: string; price: number }[];
      return data.map((item) => ({
        date: item.date,
        value: item.price * 2.5, // Simulated portfolio value
      }));
    },
  });

  const handleLogout = () => {
    clearAuth();
    navigate("/login");
  };

  if (!assets || !portfolio || !historicalData) {
    return <div>Loading...</div>;
  }

  interface Asset {
    id: string;
    name: string;
    type: string;
  }

  interface Position {
    asset: string;
    quantity: number;
    price: number;
  }

  interface ExtendedPosition extends Position {
    id: number;
    assetName: string;
    assetType: string;
  }

  const positions: ExtendedPosition[] = portfolio.positions.map(
    (position: Position) => {
      const asset = assets.find((a: Asset) => a.id === position.asset);
      return {
        ...position,
        assetName: asset!.name,
        assetType: asset!.type,
      };
    }
  );

  const chartData =
    view === "asset"
      ? positions.map((position) => ({
          name: position.assetName,
          value: position.quantity * position.price,
          color:
            position.assetType === "crypto"
              ? "#0088FE"
              : position.assetType === "stock"
              ? "#00C49F"
              : "#FFBB28",
        }))
      : Object.entries(
          positions.reduce((acc: Record<string, number>, position) => {
            const type = position.assetType;
            acc[type] = (acc[type] || 0) + position.quantity * position.price;
            return acc;
          }, {})
        ).map(([key, value]) => ({
          name: key,
          value: value as number,
          color:
            key === "crypto"
              ? "#0088FE"
              : key === "stock"
              ? "#00C49F"
              : "#FFBB28",
        }));

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">
                Financial Portfolio
              </h1>
            </div>
            <button
              onClick={handleLogout}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              <LogOut className="h-5 w-5 mr-2" />
              Logout
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Portfolio Breakdown</h2>
                <div className="flex gap-2">
                  <button
                    onClick={() => setView("asset")}
                    className={`px-4 py-2 rounded-md ${
                      view === "asset"
                        ? "bg-indigo-600 text-white"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    By Asset
                  </button>
                  <button
                    onClick={() => setView("class")}
                    className={`px-4 py-2 rounded-md ${
                      view === "class"
                        ? "bg-indigo-600 text-white"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    By Class
                  </button>
                </div>
              </div>
              <DonutChart
                data={chartData}
                title={
                  view === "asset"
                    ? "Assets Distribution"
                    : "Asset Classes Distribution"
                }
              />
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <HistoricalChart data={historicalData} />
            </div>
          </div>
          <div className="mt-6 bg-white rounded-lg shadow-sm">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Positions</h2>
              <PositionsTable positions={positions} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
