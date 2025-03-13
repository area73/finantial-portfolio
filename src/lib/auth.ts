const AUTH_KEY = 'portfolio_auth';

interface AuthData {
  email: string;
  token: string;
}

export function setAuth(email: string, token: string) {
  localStorage.setItem(AUTH_KEY, JSON.stringify({ email, token }));
}

export function getAuth(): AuthData | null {
  const auth = localStorage.getItem(AUTH_KEY);
  return auth ? JSON.parse(auth) : null;
}

export function clearAuth() {
  localStorage.removeItem(AUTH_KEY);
}