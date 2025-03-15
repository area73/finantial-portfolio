import { LoginContainer } from "../components/auth/LoginContainer";
import { LoginForm } from "../components/auth/LoginForm";
import { useAuth } from "../hooks/useAuth";

export function Login() {
  const { error, handleLogin } = useAuth();

  return (
    <LoginContainer title="Sign in to your account">
      <LoginForm onSubmit={handleLogin} error={error} />
    </LoginContainer>
  );
}
