import { MemoryRouter } from "react-router-dom";
import { DashboardHeader } from "./DashboardHeader";

describe("DashboardHeader", () => {
  it("displays the header correctly", () => {
    cy.viewport(800, 200);
    cy.mount(
      <div style={{ width: "100%", height: "100px" }}>
        <MemoryRouter>
          <DashboardHeader />
        </MemoryRouter>
      </div>
    );
    /**
     *  NOTE: as described on DonutChart.cy.tsx, we are only going to do the visual regression test
     * since all the other test are already covered by this one
     */
    cy.matchImage();
  });
});
