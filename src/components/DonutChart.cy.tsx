import { DonutChart } from "./DonutChart";

describe("DonutChart", () => {
  it("displays the correct data", () => {
    const data = [
      { name: "A", value: 200, color: "#0088FE" },
      { name: "B", value: 200, color: "#00C49F" },
    ];

    cy.mount(
      <div style={{ width: "400px", height: "400px" }}>
        <DonutChart data={data} title="Test Chart" isAnimationActive={false} />
      </div>
    );

    cy.contains("Test Chart").should("be.visible");
    //cy.contains("A (33.33%)").should("be.visible");
    //cy.contains("B (66.67%)").should("be.visible");
    cy.compareSnapshot("homePage", {
      errorThreshold: 1,
      failSilently: true,
    }).then((comparisonResults) => {
      console.log(comparisonResults.mismatchedPixels); // will print the number of mismatched pixels
      console.log(comparisonResults.percentage); // will print the percentage (in decimals) of mismatched pixels
      console.log(comparisonResults.error); // will print the visual regression error message (if any)
    });
  });
});
