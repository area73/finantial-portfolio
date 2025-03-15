import { setAuth, getAuth, clearAuth } from "./auth";
import { describe, it, expect, beforeEach } from "vitest";

describe("auth utility functions", () => {
  const email = "test@example.com";
  const token = "test-token";

  beforeEach(() => {
    localStorage.clear();
  });

  it("should set and get auth data", () => {
    setAuth(email, token);
    const authData = getAuth();
    expect(authData).toEqual({ email, token });
  });

  it("should clear auth data", () => {
    setAuth(email, token);
    clearAuth();
    const authData = getAuth();
    expect(authData).toBeNull();
  });

  it("should return null if no auth data is set", () => {
    const authData = getAuth();
    expect(authData).toBeNull();
  });
});
