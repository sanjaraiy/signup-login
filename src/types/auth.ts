export interface SignUpFormValues {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
}

export interface LoginFormValues {
  email: string;
  password: string;
  rememberMe: boolean;
}