import { describe, it, expect } from "vitest";
import { formatCurrency, formatPercent } from "./utils";

describe("utils", () => {
  describe("formatCurrency", () => {
    it("formats a number as USD currency", () => {
      expect(formatCurrency(1234.56)).toBe("$1,234.56");
      expect(formatCurrency(0)).toBe("$0.00");
      expect(formatCurrency(-1234.56)).toBe("-$1,234.56");
    });
  });

  describe("formatPercent", () => {
    it("formats a number as a percentage", () => {
      expect(formatPercent(0.1234)).toBe("12.34%");
      expect(formatPercent(0)).toBe("0.00%");
      expect(formatPercent(1)).toBe("100.00%");
    });
  });
});
