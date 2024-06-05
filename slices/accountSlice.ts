import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Account, SignInRespone } from '~/types/auth.type';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KEYS } from '~/enums';
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
      saveToken(action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { setSignInRespone } = accountSlice.actions;

export default accountSlice.reducer;
