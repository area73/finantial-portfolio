import { DonutChart, type ChartDataItem } from "../charts/DonutChart";
import { ViewType } from "../../types/portfolio";
import { useStore } from "../../hooks/useStore";

interface PortfolioBreakdownProps {
  getChartData: (view: ViewType) => ChartDataItem[];
  isAnimationActive?: boolean;
}

export function PortfolioBreakdown({
  getChartData,
  isAnimationActive = true,
}: PortfolioBreakdownProps) {
  const { viewType, setViewType } = useStore();
  const chartData = getChartData(viewType);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 pb-18">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Portfolio Breakdown</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setViewType("asset")}
            className={`px-4 py-2 rounded-md ${
              viewType === "asset"
                ? "bg-indigo-600 text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            By Asset
          </button>
          <button
            onClick={() => setViewType("class")}
            className={`px-4 py-2 rounded-md ${
              viewType === "class"
                ? "bg-indigo-600 text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            By Class
          </button>
        </div>
      </div>
      <DonutChart
        isAnimationActive={isAnimationActive}
        data={chartData}
        title={
          viewType === "asset"
            ? "Assets Distribution"
            : "Asset Classes Distribution"
        }
      />
    </div>
  );
}
