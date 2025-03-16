import { DashboardHeader } from "../components/layout/DashboardHeader";
import { PortfolioBreakdown } from "../components/portfolio/PortfolioBreakdown";
import { PortfolioHistory } from "../components/portfolio/PortfolioHistory";
import { PortfolioPositions } from "../components/portfolio/PortfolioPositions";
import { usePortfolioData } from "../hooks/usePortfolioData";

export function Dashboard() {
  const { isLoading, positions, getChartData, historicalData } =
    usePortfolioData();
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <DashboardHeader />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <PortfolioBreakdown getChartData={getChartData} />
            <PortfolioPositions positions={positions} />
          </div>
          <div className="mt-6">
            <PortfolioHistory historicalData={historicalData!} />
          </div>
        </div>
      </main>
    </div>
  );
}
