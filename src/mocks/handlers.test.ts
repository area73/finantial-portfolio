import { describe, it, expect, afterAll, beforeAll } from "vitest";
import { setupServer } from "msw/node";
import { handlers } from "./handlers";
import { assets } from "./assets";
import { portfolio } from "./portfolio";
import { prices } from "./prices";
import {
  findPricesByDate,
  findPricesByLastDate,
  getSelectedAssets,
} from "../lib/utils";

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("API Handlers", () => {
  it("should return assets data", async () => {
    const response = await fetch("/api/assets");
    const data = await response.json();
    expect(response.status).toBe(200);
    expect(data).toEqual(assets);
  });

  it("should return portfolio data", async () => {
    const response = await fetch("/api/portfolios");
    const data = await response.json();
    expect(response.status).toBe(200);
    expect(data).toEqual(portfolio);
  });

  it("should return prices data for a specific date", async () => {
    const response = await fetch("/api/prices?asset=BTC&asOf=20250313");
    const data = await response.json();
    expect(response.status).toBe(200);
    const datePrices = findPricesByDate(prices, 20250313);
    const queriedAssets = ["BTC"];
    const selectedAssetsPrices = getSelectedAssets(queriedAssets, datePrices!);

    expect(data).toEqual(selectedAssetsPrices);
  });

  it("should return prices data for last date", async () => {
    const response = await fetch("/api/prices?asset=BTC");
    const data = await response.json();
    expect(response.status).toBe(200);
    const queriedAssets = ["BTC"];
    expect(data).toEqual(
      getSelectedAssets(queriedAssets, findPricesByLastDate(prices))
    );
  });

  it("should return prices data for more than one asset", async () => {
    const response = await fetch("/api/prices?asset=BTC,ETH,USD,APPL,MSFT");
    const data = await response.json();
    expect(response.status).toBe(200);
    const queriedAssets = ["BTC", "ETH", "USD", "APPL", "MSFT"];
    expect(data).toEqual(
      getSelectedAssets(queriedAssets, findPricesByLastDate(prices))
    );
  });
});
