import React, { JSX } from "react";
import { describe, it, expect, vi, beforeEach, type Mock } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { usePortfolioData } from "./usePortfolioData";

global.fetch = vi.fn(); // Mock fetch globally

function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false, // prevents multiple automatic retries
        staleTime: 0,
      },
    },
  });
}

function createWrapper() {
  // Create a fresh query client each time
  const queryClient = createTestQueryClient();
  return function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
  };
}

describe("usePortfolioData", () => {
  let wrapper: ({ children }: { children: React.ReactNode }) => JSX.Element;

  beforeEach(() => {
    // Clear all mocks before each test
    vi.clearAllMocks();
    wrapper = createWrapper();
  });

  it("returns data for assets, portfolio, and historicalData, and sets isLoading to false afterward", async () => {
    // 1) /api/assets
    (global.fetch as Mock).mockResolvedValueOnce({
      json: () =>
        Promise.resolve([{ id: "BTC", name: "Bitcoin", type: "crypto" }]),
    });

    // 2) /api/portfolios
    (global.fetch as Mock).mockResolvedValueOnce({
      json: () =>
        Promise.resolve([
          {
            id: "c47c89ef-8d33-40b6-88fa-2c986d5f1f50",
            asOf: "2025-03-16T12:00:00Z",
            positions: [
              {
                id: 5,
                asset: "BTC",
                quantity: 2,
                asOf: "2025-03-02T07:10:00Z",
                price: 430,
              },
            ],
          },
        ]),
    });

    // 3) /api/prices?asset=BTC
    (global.fetch as Mock).mockResolvedValueOnce({
      json: () =>
        Promise.resolve([
          {
            date: "2023-01-01",
            price: 1000,
          },
          {
            date: "2023-01-02",
            price: 1200,
          },
        ]),
    });

    const { result } = renderHook(() => usePortfolioData(), { wrapper });

    // Initially isLoading should be true
    expect(result.current.isLoading).toBe(true);

    // Wait for the queries to settle
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    // Verify the parsed positions
    expect(result.current.positions).toEqual([
      {
        asOf: "2025-03-02T07:10:00Z",
        asset: "BTC",
        quantity: 2,
        id: 5,
        price: 430,
        assetName: "Bitcoin",
        assetType: "crypto",
      },
    ]);
    // Verify historicalData
    expect(result.current.historicalData).toEqual(undefined);
  });

  it("returns empty positions if queries fail or are incomplete", async () => {
    // Mock 3 fetch calls that all return null or undefined data
    (global.fetch as Mock).mockResolvedValueOnce({
      json: () => Promise.resolve(null),
    });
    (global.fetch as Mock).mockResolvedValueOnce({
      json: () => Promise.resolve(null),
    });
    (global.fetch as Mock).mockResolvedValueOnce({
      json: () => Promise.resolve(null),
    });

    const { result } = renderHook(() => usePortfolioData(), { wrapper });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    // positions should be empty because assets/portfolio data didn't load
    expect(result.current.positions).toEqual([]);
  });

  it("getChartData returns aggregated data by asset", async () => {
    // 1) /api/assets
    (global.fetch as Mock).mockResolvedValueOnce({
      json: () =>
        Promise.resolve([{ id: "BTC", name: "Bitcoin", type: "crypto" }]),
    });

    // 2) /api/portfolios
    (global.fetch as Mock).mockResolvedValueOnce({
      json: () =>
        Promise.resolve([
          {
            id: "c47c89ef-8d33-40b6-88fa-2c986d5f1f50",
            asOf: "2025-03-16T12:00:00Z",
            positions: [
              {
                id: 5,
                asset: "BTC",
                quantity: 2,
                asOf: "2025-03-02T07:10:00Z",
                price: 5000,
              },
            ],
          },
        ]),
    });

    // 3) /api/prices?asset=BTC
    (global.fetch as Mock).mockResolvedValueOnce({
      json: () => Promise.resolve({ date: "2023-01-01", price: 1000 }),
    });

    const { result } = renderHook(() => usePortfolioData(), { wrapper });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    // getChartData("asset") - single item by asset name
    const chartDataAsset = result.current.getChartData("asset");
    expect(chartDataAsset).toEqual([
      {
        name: "Bitcoin",
        value: 10000, // 2 * 5000
        color: "#0088FE", // color for crypto
      },
    ]);

    // getChartData("type") - aggregated by type
    const chartDataType = result.current.getChartData("class");
    expect(chartDataType).toEqual([
      {
        name: "crypto",
        value: 10000,
        color: "#0088FE",
      },
    ]);
  });
});
