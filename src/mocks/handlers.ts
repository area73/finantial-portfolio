import { http, HttpResponse } from "msw";
import { format, subDays } from "date-fns";

const generateHistoricalPrices = (basePrice: number, days: number) => {
  return Array.from({ length: days }).map((_, index) => ({
    date: format(subDays(new Date(), index), "yyyy-MM-dd"),
    price: basePrice + Math.random() * 10000,
  }));
};

const assets = [
  { id: "1", name: "Bitcoin", type: "crypto", symbol: "BTC" },
  { id: "2", name: "Ethereum", type: "crypto", symbol: "ETH" },
  { id: "3", name: "Apple Inc.", type: "stock", symbol: "AAPL" },
  { id: "4", name: "Microsoft", type: "stock", symbol: "MSFT" },
  { id: "5", name: "US Dollar", type: "fiat", symbol: "USD" },
];

const prices = {
  BTC: generateHistoricalPrices(45000, 30),
  ETH: generateHistoricalPrices(2500, 30),
  AAPL: generateHistoricalPrices(180, 30),
  MSFT: generateHistoricalPrices(350, 30),
  USD: generateHistoricalPrices(1, 30),
};

const portfolio = {
  id: "123",
  asOf: new Date().toISOString(),
  positions: [
    { id: 1, asset: "1", quantity: 2.5, price: 45000 },
    { id: 2, asset: "2", quantity: 10, price: 2500 },
    { id: 3, asset: "3", quantity: 50, price: 180 },
    { id: 4, asset: "4", quantity: 30, price: 350 },
    { id: 5, asset: "5", quantity: 10000, price: 1 },
  ],
};

export const handlers = [
  http.get("/api/assets", () => {
    return HttpResponse.json(assets);
  }),

  http.get("/api/prices", ({ request }) => {
    const url = new URL(request.url);
    const asset = url.searchParams.get("asset");
    const asOf = url.searchParams.get("asOf");

    if (asset) {
      const assetData = assets.find((a) => a.symbol === asset);
      if (!assetData) return new HttpResponse(null, { status: 404 });

      if (asOf) {
        const priceData = prices[asset as keyof typeof prices].find(
          (p) => p.date === asOf
        );
        return HttpResponse.json([
          { id: assetData.id, asset, price: priceData?.price || 0 },
        ]);
      }

      return HttpResponse.json(prices[asset as keyof typeof prices]);
    }

    return HttpResponse.json([]);
  }),

  http.get("/api/portfolios", () => {
    return HttpResponse.json(portfolio);
  }),
];
