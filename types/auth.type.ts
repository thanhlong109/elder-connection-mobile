export interface SignInForm {
  email: string;
  password: string;
  confirmPassword: string;
}
export type SignUpForm = Pick<SignInForm, 'email' | 'password'>;

export interface Credentials {
  username: string;
  password: string;
}

export interface Account {
  id: string;
  firstName: string;
  lastName: string;
  biography: any;
  profilePicture: any;
  birthday: string;
  sex: number;
  status: number;
  walletBalance: string;
  createAt: string;
  accountPhone: string;
  accountEmail: string;
  birthDate: string;
  accountPassword: string;
  confirmAccountPassword: string;
}

export type SignUpRequest = Pick<
  Account,
  | 'accountPhone'
  | 'firstName'
  | 'lastName'
  | 'sex'
  | 'accountEmail'
  | 'birthDate'
  | 'accountPassword'
  | 'confirmAccountPassword'
>;

export type SignUpRespone = Pick<
  Account,
  | 'accountPhone'
  | 'firstName'
  | 'lastName'
  | 'sex'
  | 'accountEmail'
  | 'birthDate'
  | 'accountPassword'
  | 'confirmAccountPassword'
>;
