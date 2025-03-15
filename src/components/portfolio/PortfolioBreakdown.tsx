import { useState } from "react";
import { DonutChart, type ChartDataItem } from "../DonutChart";
import { ViewType } from "../../types/portfolio";

interface PortfolioBreakdownProps {
  getChartData: (view: ViewType) => ChartDataItem[];
}

export function PortfolioBreakdown({ getChartData }: PortfolioBreakdownProps) {
  const [view, setView] = useState<ViewType>("asset");
  const chartData = getChartData(view);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 pb-18">
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
  );
}
