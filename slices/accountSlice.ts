import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Account, AccountDestailsRespones, SignInRespone } from '~/types/auth.type';
import { saveToken } from '~/utils/auth';

export interface AccountSliceState {
  account: Account;
}

const accountInitialSate: Account = {
  accountEmail: '',
  accountPassword: '',
  accountPhone: '',
  biography: '',
  birthDate: '',
  birthday: '',
  confirmAccountPassword: '',
  createAt: '',
  firstName: '',
  id: '',
  lastName: '',
  profilePicture: '',
  sex: 1,
  status: 0,
  walletBalance: '',
  expired: '',
  jwtRefreshToken: '',
  jwtToken: '',
};

const initialState: AccountSliceState = {
  account: accountInitialSate,
};

export const accountSlice = createSlice({
  name: 'accountSlice',
  initialState,
  reducers: {
    setSignInRespone: (state, action: PayloadAction<SignInRespone>) => {
      state.account.expired = action.payload.expired;
      state.account.jwtRefreshToken = action.payload.jwtRefreshToken;
      state.account.jwtToken = action.payload.jwtToken;
      state.account.id = action.payload.accountId;
      saveToken(action.payload);
    },
    setAccountDetails: (state, action: PayloadAction<AccountDestailsRespones>) => {
      state.account.biography = action.payload.biography;
      state.account.birthDate = action.payload.birthday;
      state.account.birthday = action.payload.birthday;
      state.account.createAt = action.payload.createAt;
      state.account.firstName = action.payload.firstName;
      state.account.lastName = action.payload.lastName;
      state.account.profilePicture = action.payload.profilePicture;
      state.account.sex = action.payload.sex;
      state.account.status = action.payload.status;
      state.account.walletBalance = action.payload.walletBalance;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setSignInRespone, setAccountDetails } = accountSlice.actions;

export default accountSlice.reducer;
