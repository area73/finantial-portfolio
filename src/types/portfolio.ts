export type ViewType = "asset" | "class";

export interface Asset {
  id: string;
  name: string;
  type: string;
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
