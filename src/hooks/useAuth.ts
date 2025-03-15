import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setAuth } from "../lib/auth";
import { LoginCredentials } from "../types/auth";

export function useAuth() {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleLogin = (credentials: LoginCredentials) => {
    const { email, password } = credentials;

    if (email && password) {
      // In a real app, this would be an API call
      setAuth(email, "dummy-token");
      navigate("/dashboard");
    } else {
      setError("Please enter both email and password");
    }
  };

  return {
    error,
    handleLogin,
  };
}
