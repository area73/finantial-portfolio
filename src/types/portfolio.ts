export type ViewType = "asset" | "class";
export type assetType = "crypto" | "fiat" | "stock";

export interface Asset {
  id: string;
  name: string;
  type: assetType;
}
export interface Price {
  id: string;
  asset: string;
  price: number;
}

export interface Position {
  asset: string;
  quantity: number;
  price: number;
}

export interface ExtendedPosition extends Position {
  id: number;
  assetName: string;
  assetType: string;
}

export interface ChartDataItem {
  name: string;
  value: number;
  color: string;
}

export interface HistoricalDataItem {
  date: string;
  value: number;
}
