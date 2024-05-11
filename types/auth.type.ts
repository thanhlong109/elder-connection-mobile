export interface SignInForm {
  email: string;
  password: string;
  confirmPassword: string;
}
export type SignUpForm = Pick<SignInForm, 'email' | 'password'>;
