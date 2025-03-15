// useAuth.test.tsx

import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useAuth } from "./useAuth";
import { useNavigate } from "react-router-dom";
import { setAuth } from "../lib/auth";

vi.mock("react-router-dom", () => ({
  useNavigate: vi.fn(),
}));

vi.mock("../lib/auth", () => ({
  setAuth: vi.fn(),
}));

describe("useAuth", () => {
  const mockNavigate = vi.fn();

  // This ensures mocks are reset before each test
  beforeEach(() => {
    vi.clearAllMocks();
    (useNavigate as vi.Mock).mockReturnValue(mockNavigate);
  });

  it('navigates to "/dashboard" with valid credentials', () => {
    const { result } = renderHook(() => useAuth());

    act(() => {
      result.current.handleLogin({
        email: "test@example.com",
        password: "abc123",
      });
    });

    expect(setAuth).toHaveBeenCalledWith("test@example.com", "dummy-token");
    expect(mockNavigate).toHaveBeenCalledWith("/dashboard");
    expect(result.current.error).toBe("");
  });

  it("shows error with missing email or password", () => {
    const { result } = renderHook(() => useAuth());

    act(() => {
      // Missing password
      result.current.handleLogin({ email: "test@example.com", password: "" });
    });

    // Because password is an empty string (falsy),
    // handleLogin should skip setAuth and set an error instead
    expect(setAuth).not.toHaveBeenCalled();
    expect(mockNavigate).not.toHaveBeenCalled();
    expect(result.current.error).toBe("Please enter both email and password");
  });
});
