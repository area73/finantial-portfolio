import { http, HttpResponse } from "msw";
import { prices } from "./prices";
import { assets } from "./assets";
import { portfolio } from "./portfolio";
import type { Asset } from "../types/portfolio";
import {
  findPricesByDate,
  findPricesByLastDate,
  getSelectedAssets,
} from "../lib/utils";

const getAssetIds = (assets: Asset[]) => {
  return assets.reduce<string[]>((acc, item) => {
    return [...acc, item.id];
  }, []);
};

export const handlers = [
  http.get("/api/assets", () => {
    return HttpResponse.json(assets);
  }),

  http.get("/api/prices", ({ request }) => {
    const url = new URL(request.url);
    const queriedAssets = (url.searchParams.get("asset") || "").split(",");
    const asOf = parseInt(url.searchParams.get("asOf") || "0");
    if (queriedAssets.length > 0) {
      // get an array of id values of assets
      const trackedAssets = getAssetIds(assets);
      const intersectedAssets = queriedAssets.filter((item) =>
        trackedAssets.includes(item)
      );
      /**
       * this is only for demonstration purposes
       * if we are asking for  assets that are  not in our database,
       *  we return a 404 response to handle errors gracefully
       */
      if (!intersectedAssets) {
        return new HttpResponse(null, {
          status: 404,
          statusText: "asset not found",
        });
      }

      if (asOf) {
        const entryFromDate = findPricesByDate(prices, asOf);
        if (entryFromDate) {
          return HttpResponse.json(
            getSelectedAssets(queriedAssets, entryFromDate)
          );
        } else {
          return new HttpResponse(null, {
            status: 404,
            statusText: "price not found",
          });
        }
      }
      const entryFromLastDate = findPricesByLastDate(prices);
      return HttpResponse.json(
        getSelectedAssets(queriedAssets, entryFromLastDate)
      );
    }
    // If we don't have an asset, return an empty array
    return HttpResponse.json([]);

    // TODO: provide a range by using the from and to parameters.
  }),

  http.get("/api/portfolios", () => {
    return HttpResponse.json(portfolio);
  }),
];
