import { describe, it, expect } from "vitest";
import {
  formatCurrency,
  formatPercent,
  getPositionsValue,
  groupPositionsByAssetType,
} from "./utils";

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

  describe("getPositionsValue", () => {
    it("calculates the total value of positions in the portfolio", () => {
      const portfolio = {
        id: "123",
        asOf: "2023-01-01",
        positions: [
          { id: 1, asset: "AAPL", asOf: "2023-01-01", price: 100, quantity: 2 },
          {
            id: 2,
            asset: "GOOGL",
            asOf: "2023-01-01",
            price: 200,
            quantity: 1,
          },
        ],
      };
      expect(getPositionsValue(portfolio)).toBe(400);
    });
  });

  describe("groupPositionsByAssetType", () => {
    it("groups positions by asset type", () => {
      const positions = [
        { assetType: "stock", quantity: 10, price: 100 },
        { assetType: "bond", quantity: 5, price: 200 },
        { assetType: "stock", quantity: 15, price: 100 },
      ];
      const grouped = groupPositionsByAssetType(positions);
      expect(grouped).toEqual([
        { assetType: "stock", totalQuantity: 25, totalPrice: 2500 },
        { assetType: "bond", totalQuantity: 5, totalPrice: 1000 },
      ]);
    });
  });
});
