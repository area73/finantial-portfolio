import { Navigate } from "react-router-dom";
import { getAuth } from "../lib/auth";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const auth = getAuth();
  if (!auth) {
    console.warn("user is not authenticated, redirecting to login page");
    return <Navigate to="/login" replace />;
  }

  return children;
}
