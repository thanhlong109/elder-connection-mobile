import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { HomeType } from '~/enums';
import { AddAdressRequest } from '~/types/address.type';

export interface AdressSliceState {
  addAdress: AddAdressRequest;
}

const initialAddress: AddAdressRequest = {
  accountId: '',
  addressDescription: '',
  addressDetail: '',
  addressId: 0,
  addressName: '',
  contactName: '',
  contactPhone: '',
  homeType: HomeType.MANSION,
};

const initialState: AdressSliceState = {
  addAdress: initialAddress,
};

export const addressSlice = createSlice({
  name: 'addressSlice',
  initialState,
  reducers: {
    setAddAddress: (state, action: PayloadAction<AddAdressRequest>) => {
      state.addAdress = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setAddAddress } = addressSlice.actions;

export default addressSlice.reducer;
