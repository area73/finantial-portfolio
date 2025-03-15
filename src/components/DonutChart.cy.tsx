import { DonutChart } from "./DonutChart";

describe("DonutChart", () => {
  it("displays the correct data", () => {
    const data = [
      { name: "A", value: 100, color: "#0088FE" },
      { name: "B", value: 200, color: "#00C49F" },
      { name: "C", value: 300, color: "#FF8042" },
    ];

    cy.mount(
      <div style={{ width: "400px", height: "400px" }}>
        <DonutChart data={data} title="Test Chart" isAnimationActive={false} />
      </div>
    );
    // NOTE:
    // The following assertions are just examples.If we use a visual regression image (cy.matchImage) we can remove them.
    // I'm just leving thhese test here for us to reasion about the test and the visual regression image.
    cy.contains("Test Chart").should("be.visible");
    cy.contains("A (16.67%)").should("be.visible");
    cy.contains("B (33.33%)").should("be.visible");
    cy.contains("C (50.00%)").should("be.visible");
    cy.matchImage();
  });
});
