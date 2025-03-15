import { PortfolioPositions } from "./PortfolioPositions";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

describe("PortfolioPositions", () => {
  const queryClient = new QueryClient();

  it("displays the correct data", () => {
    const positions = [
      {
        id: 1,
        asset: "AAPL",
        quantity: 10,
        price: 150,
        assetName: "Apple Inc.",
        assetType: "stock",
      },
      {
        id: 2,
        asset: "GOOGL",
        quantity: 5,
        price: 2800,
        assetName: "Alphabet Inc.",
        assetType: "stock",
      },
      {
        id: 3,
        asset: "TSLA",
        quantity: 2,
        price: 700,
        assetName: "Tesla Inc.",
        assetType: "stock",
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
