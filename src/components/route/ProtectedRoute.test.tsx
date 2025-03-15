import { render } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import { getAuth } from "../../lib/auth";
import { describe, it, expect, vi, type Mock } from "vitest";

vi.mock("../../lib/auth", () => ({
  getAuth: vi.fn(),
}));

describe("ProtectedRoute", () => {
  it("redirects to login if user is not authenticated", () => {
    (getAuth as Mock).mockReturnValue(null);

    const { getByText } = render(
      <MemoryRouter initialEntries={["/protected"]}>
        <Routes>
          <Route
            path="/protected"
            element={
              <ProtectedRoute>
                <div>Protected Content</div>
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<div>Login Page</div>} />
        </Routes>
      </MemoryRouter>
    );

    expect(getByText("Login Page")).toBeInTheDocument();
  });

  it("renders children if user is authenticated", () => {
    (getAuth as Mock).mockReturnValue({
      email: "test@example.com",
      token: "test-token",
    });

    const { getByText } = render(
      <MemoryRouter initialEntries={["/protected"]}>
        <Routes>
          <Route
            path="/protected"
            element={
              <ProtectedRoute>
                <div>Protected Content</div>
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<div>Login Page</div>} />
        </Routes>
      </MemoryRouter>
    );

    expect(getByText("Protected Content")).toBeInTheDocument();
  });
});
