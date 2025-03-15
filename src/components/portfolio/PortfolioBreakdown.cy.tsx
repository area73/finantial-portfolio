import type { ViewType } from "../../types/portfolio";
import { PortfolioBreakdown } from "./PortfolioBreakdown";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

describe("PortfolioBreakdown", () => {
  const queryClient = new QueryClient();
  const getChartData = (view: ViewType) => {
    if (view === "asset") {
      return [
        { name: "Alphabet", value: 7500, color: "#00C49F" },
        { name: "Apple", value: 10000, color: "#FF8042" },
        { name: "Tesla", value: 1400, color: "#0088FE" },
      ];
    } else {
      return [{ name: "stock", value: 16900, color: "#00C49F" }];
    }
  };

  it("displays the correct data by asset", () => {
    cy.viewport(550, 500);
    cy.mount(
      <QueryClientProvider client={queryClient}>
        <div style={{ width: "100%", height: "400px" }}>
          <PortfolioBreakdown
            getChartData={getChartData}
            isAnimationActive={false}
          />
        </div>
      </QueryClientProvider>
    );
    cy.contains("By Asset").click();
    cy.matchImage();
  });

  it("displays the correct data by class", () => {
    cy.viewport(550, 500);
    cy.mount(
      <QueryClientProvider client={queryClient}>
        <div style={{ width: "100%", height: "400px" }}>
          <PortfolioBreakdown
            getChartData={getChartData}
            isAnimationActive={false}
          />
        </div>
      </QueryClientProvider>
    );
    cy.contains("By Class").click();
    cy.matchImage();
  });
});
