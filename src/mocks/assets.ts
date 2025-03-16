import type { Asset } from "../types/portfolio";

export const assets: Asset[] = [
  {
    id: "BTC",
    name: "Bitcoin",
    type: "crypto",
  },
  {
    id: "ETH",
    name: "Ethereum",
    type: "crypto",
  },
  {
    id: "USD",
    name: "U.S. Dollar",
    type: "fiat",
  },
  {
    id: "APPL",
    name: "Apple Inc.",
    type: "stock",
  },
  {
    id: "MSFT",
    name: "Microsoft",
    type: "stock",
  },
  {
    id: "TESL",
    name: "Tesla",
    type: "stock",
  },
];
