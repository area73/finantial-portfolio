export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

export function formatPercent(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "percent",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

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
