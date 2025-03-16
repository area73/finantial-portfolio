import { PortfolioPositions } from "./PortfolioPositions";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

describe("PortfolioPositions", () => {
  const queryClient = new QueryClient();

  it("displays the correct data", () => {
    const positions = [
      {
        id: 5,
        asset: "BTC",
        quantity: 4,
        asOf: "2025-03-02T07:10:00Z",
        price: 390,
        assetName: "Bitcoin",
        assetType: "Cryptocurrency",
      },
      {
        id: 13,
        asset: "ETH",
        quantity: 0, // Added default quantity
        price: 310,
        assetName: "Ethereum",
        assetType: "Cryptocurrency",
        asOf: "2025-03-03T15:10:00Z",
      },
      {
        id: 1,
        asset: "APPL",
        quantity: 4,
        asOf: "2025-03-01T09:00:00Z",
        price: 310,
        assetName: "Apple",
        assetType: "Stock",
      },

      {
        id: 9,
        asset: "USD",
        quantity: 400,
        asOf: "2025-03-02T06:30:00Z",
        price: 1,
        assetName: "US Dollar",
        assetType: "Currency",
      },
    ];
    cy.viewport(800, 400);
    cy.mount(
      <QueryClientProvider client={queryClient}>
        <div style={{ width: "100%", height: "400px" }}>
          <PortfolioPositions positions={positions} />
        </div>
      </QueryClientProvider>
    );
    /**
     *  NOTE: as described on DonutChart.cy.tsx, we are only going to do the visual regression test
     * since all the other test are already covered by this one
     */
    cy.matchImage();
  });
});
