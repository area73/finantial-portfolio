import { PortfolioHistory } from "./PortfolioHistory";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

describe("PortfolioHistory", () => {
  const queryClient = new QueryClient();

  it("displays the correct data", () => {
    const historicalData = [
      { date: "2023-01-01", value: 1000 },
      { date: "2023-02-01", value: 1300 },
      { date: "2023-03-01", value: 2000 },
    ];
    cy.viewport(550, 550);
    cy.mount(
      <QueryClientProvider client={queryClient}>
        <div style={{ width: "100%", height: "400px" }}>
          <PortfolioHistory
            historicalData={historicalData}
            isAnimationActive={false}
          />
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
