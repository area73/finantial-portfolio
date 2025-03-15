import { HistoricalChart } from "../charts/HistoricalChart";
import { HistoricalDataItem } from "../../types/portfolio";

interface PortfolioHistoryProps {
  historicalData: HistoricalDataItem[];
}

export function PortfolioHistory({ historicalData }: PortfolioHistoryProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 pb-18">
      <HistoricalChart data={historicalData} />
    </div>
  );
}
