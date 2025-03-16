import type { Portfolio, Price } from "../types/portfolio";
interface Position {
  assetType: string;
  quantity: number;
  price: number;
}

interface GroupedPosition {
  assetType: string;
  totalQuantity: number;
  totalPrice: number;
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

export function getPositionsValue(portfolio: Portfolio): number {
  // Sum of (price * quantity) for each position in the portfolio
  return portfolio.positions.reduce((total, position) => {
    return total + position.price * position.quantity;
  }, 0);
}

export function formatPercent(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "percent",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export const getSelectedAssets = (ids: string[], assets: Price[]) => {
  return assets.filter((item) => ids.includes(item.asset));
};

export const findPricesByDate = (
  prices: Record<number, Price[]>[],
  date: number
) => {
  const priceByDate = prices.find((item) => {
    const [dateString] = Object.keys(item);
    return parseInt(dateString, 10) === date;
  });
  return priceByDate ? priceByDate[date] : null;
};
export const findPricesByLastDate = (prices: Record<number, Price[]>[]) => {
  const [lastDay] = Object.keys(prices[0]);
  return prices[0][parseInt(lastDay, 10)];
};

export function groupPositionsByAssetType(
  positions: Position[]
): GroupedPosition[] {
  const grouped = positions.reduce(
    (acc: Record<string, GroupedPosition>, position) => {
      const { assetType, quantity, price } = position;
      if (!acc[assetType]) {
        acc[assetType] = { assetType, totalQuantity: 0, totalPrice: 0 };
      }
      acc[assetType].totalQuantity += quantity;
      acc[assetType].totalPrice += quantity * price;
      return acc;
    },
    {}
  );
  return Object.values(grouped);
}
