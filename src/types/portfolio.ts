export type ViewType = "asset" | "class";
export type assetType = "crypto" | "fiat" | "stock";

export type Portfolios = Portfolio[];

export interface Portfolio {
  id: string;
  asOf: string;
  positions: Position[];
}

export interface Position {
  id: number;
  asset: string;
  quantity: number;
  asOf: string;
  price: number;
}

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
