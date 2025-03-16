import { useQuery } from "@tanstack/react-query";
import {
  Asset,
  Position,
  ExtendedPosition,
  ChartDataItem,
  ViewType,
  type Portfolios,
} from "../types/portfolio";
import { getPositionsValue } from "../lib/utils";

export function usePortfolioData() {
  const { data: assets, isLoading: assetsLoading } = useQuery({
    queryKey: ["assets"],
    queryFn: () => fetch("/api/assets").then((res) => res.json()),
  });

  const { data: portfolio, isLoading: portfolioLoading } = useQuery({
    queryKey: ["portfolio"],
    queryFn: () => fetch("/api/portfolios").then((res) => res.json()),
  });

  const { data: historicalData, isLoading: historicalLoading } = useQuery({
    queryKey: ["historical"],
    queryFn: async () => {
      const response = await fetch("/api/portfolios");
      const data = (await response.json()) as Portfolios;
      return data.map((portfolio) => ({
        date: portfolio.asOf,
        value: getPositionsValue(portfolio),
      }));
    },
  });

  const isLoading = assetsLoading || portfolioLoading || historicalLoading;

  const getExtendedPositions = (): ExtendedPosition[] => {
    if (!assets || !portfolio) return [];

    return portfolio[0].positions.map((position: Position) => {
      const asset = assets.find((a: Asset) => a.id === position.asset);
      return {
        ...position,
        assetName: asset!.name,
        assetType: asset!.type,
      };
    });
  };

  const getChartData = (view: ViewType): ChartDataItem[] => {
    const positions = getExtendedPositions();

    if (view === "asset") {
      return positions.map((position) => ({
        name: position.assetName,
        value: position.quantity * position.price,
        color:
          position.assetType === "crypto"
            ? "#0088FE"
            : position.assetType === "stock"
            ? "#00C49F"
            : "#FFBB28",
      }));
    } else {
      return Object.entries(
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
    }
  };

  return {
    isLoading,
    positions: getExtendedPositions(),
    getChartData,
    historicalData,
  };
}
