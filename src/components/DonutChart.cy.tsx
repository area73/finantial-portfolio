import type { cy } from "date-fns/locale";
import { describe, it } from "vitest";
import { DonutChart } from "./DonutChart";

describe("DonutChart", () => {
  it("displays the correct data", () => {
    const data = [
      { name: "A", value: 100, color: "#0088FE" },
      { name: "B", value: 200, color: "#00C49F" },
    ];

    cy.mount(
      <div style={{ width: "400px", height: "400px" }}>
        <DonutChart data={data} title="Test Chart" />
      </div>
    );

    cy.contains("Test Chart").should("be.visible");
    cy.contains("A (33.33%)").should("be.visible");
    cy.contains("B (66.67%)").should("be.visible");
  });
});
