export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginFormProps {
  onSubmit: (credentials: LoginCredentials) => void;
  error?: string;
}

export interface LoginContainerProps {
  title: string;
  children: React.ReactNode;
}
