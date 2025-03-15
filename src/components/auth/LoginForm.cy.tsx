import { LoginForm } from "./LoginForm";

describe("LoginForm", () => {
  it("displays the login form correctly", () => {
    cy.viewport(550, 300);
    cy.mount(
      <div style={{ width: "100%" }}>
        <LoginForm onSubmit={() => {}} error="" />
      </div>
    );
    /**
     *  NOTE: as described on DonutChart.cy.tsx, we are only going to do the visual regression test
     * since all the other test are already covered by this one
     */
    cy.matchImage();
  });

  it("displays the login form with error", () => {
    cy.viewport(550, 300);
    cy.mount(
      <div style={{ width: "100%" }}>
        <LoginForm onSubmit={() => {}} error="Invalid credentials" />
      </div>
    );
    cy.contains("Invalid credentials").should("be.visible");
    cy.matchImage();
  });
});
