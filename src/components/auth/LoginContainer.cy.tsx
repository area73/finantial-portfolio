import { LoginContainer } from "./LoginContainer";

describe("LoginContainer", () => {
  it("displays the login container correctly", () => {
    cy.viewport(550, 450);
    cy.mount(
      <div style={{ width: "100%", height: "90%" }}>
        <LoginContainer title="Sign In">
          <div>Any login Form Content</div>
        </LoginContainer>
      </div>
    );
    /**
     *  NOTE: as described on DonutChart.cy.tsx, we are only going to do the visual regression test
     * since all the other test are already covered by this one
     */
    cy.matchImage();
  });
});
