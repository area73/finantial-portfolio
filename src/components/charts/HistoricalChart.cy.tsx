import { HistoricalChart } from "./HistoricalChart";

describe("HistoricalChart", () => {
  it("displays the correct data", () => {
    const data = [
      { date: "2023-01-01", value: 1000 },
      { date: "2023-02-01", value: 1300 },
      { date: "2023-03-01", value: 2000 },
    ];
    cy.viewport(550, 450);
    cy.mount(
      <div style={{ width: "100%", height: "400px" }}>
        <HistoricalChart data={data} isAnimationActive={false} />
      </div>
    );
    /**
     *  NOTE: as described on DonutChart.cy.tsx, we are only going to do the visual regression test
     * since all the other test are already covered by this one
     */
    cy.matchImage();
  });
});
