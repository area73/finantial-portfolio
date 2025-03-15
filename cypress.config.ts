import { defineConfig } from "cypress";
import { configureVisualRegression } from "cypress-visual-regression";

export default defineConfig({
  component: {
    screenshotsFolder: "./cypress/snapshots/actual",
    env: {
      visualRegressionType: "regression",
      visualRegressionBaseDirectory: "cypress/snapshot/base",
      visualRegressionDiffDirectory: "cypress/snapshot/diff",
      visualRegressionGenerateDiff: "always",
      visualRegressionFailSilently: true,
    },
    devServer: {
      framework: "react",
      bundler: "vite",
    },
    specPattern: "src/**/*.cy.{js,jsx,ts,tsx}",
    setupNodeEvents(on, _config) {
      configureVisualRegression(on);
    },
  },
});
