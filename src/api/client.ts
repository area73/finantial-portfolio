import { makeApi, Zodios, type ZodiosOptions } from "@zodios/core";
import { z } from "zod";

const Asset = z
  .object({ id: z.string().uuid(), name: z.string(), type: z.string() })
  .partial()
  .passthrough();
const Price = z
  .object({ id: z.string().uuid(), asset: z.string(), price: z.number().int() })
  .partial()
  .passthrough();
const Position = z
  .object({
    id: z.number().int(),
    asset: z.string().uuid(),
    quantity: z.number().int(),
    asOf: z.string().datetime({ offset: true }),
    price: z.number().int(),
  })
  .partial()
  .passthrough();
const Portfolio = z
  .object({
    id: z.string().uuid(),
    asOf: z.string().datetime({ offset: true }),
    positions: z.array(Position),
  })
  .partial()
  .passthrough();

export const schemas = {
  Asset,
  Price,
  Position,
  Portfolio,
};

const endpoints = makeApi([
  {
    method: "get",
    path: "/assets",
    alias: "getAssets",
    description: `fetch information about all available assets`,
    requestFormat: "json",
    response: z.array(Asset),
  },
  {
    method: "get",
    path: "/portfolios",
    alias: "getPortfolio",
    description: `fetch list of positions`,
    requestFormat: "json",
    response: Portfolio,
  },
  {
    method: "get",
    path: "/prices",
    alias: "getPrices",
    description: `fetch list of asset prices`,
    requestFormat: "json",
    parameters: [
      {
        name: "asset",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "asOf",
        type: "Query",
        schema: z.string().optional(),
      },
    ],
    response: z.array(Price),
  },
]);

export const api = new Zodios(endpoints);

export function createApiClient(baseUrl: string, options?: ZodiosOptions) {
  return new Zodios(baseUrl, endpoints, options);
}
