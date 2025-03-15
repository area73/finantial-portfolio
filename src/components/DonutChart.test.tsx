import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { DonutChart } from "./DonutChart";

describe("DonutChart", () => {
  it("displays the correct data", () => {
    const data = [
      { name: "A", value: 100, color: "#0088FE" },
      { name: "B", value: 200, color: "#00C49F" },
    ];
    render(
      <div style={{ width: "400px", height: "400px" }}>
        <DonutChart data={data} title="Test Chart" />
      </div>
    );
    expect(screen.getByText("Test Chart")).toBeInTheDocument();
    // expect(screen.getByText("A (33.33%)")).toBeInTheDocument();
    expect(
      screen.getByText((content, element) => {
        return element?.textContent === "A (33.33%)";
      })
    ).toBeInTheDocument();
    // expect(screen.getByText("B (66.67%)")).toBeInTheDocument();
  });
});
