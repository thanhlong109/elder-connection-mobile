import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { router } from 'expo-router';
import { HomeType, MODE } from '~/enums';
import { AddAdressRequest, UpdateAdressRequest } from '~/types/address.type';

export interface AdressSliceState {
  addAdress: AddAdressRequest;
  mode: MODE;
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
  mode: MODE.CREATE,
};

export const addressSlice = createSlice({
  name: 'addressSlice',
  initialState,
  reducers: {
    setAddAddress: (state, action: PayloadAction<AddAdressRequest>) => {
      state.addAdress = action.payload;
    },
    setAddressMode: (state, action: PayloadAction<MODE>) => {
      state.mode = action.payload;
    },
    setCreateNewAddress: (state) => {
      state.addAdress = initialAddress;
      state.mode = MODE.CREATE;
      router.push('addAddress');
    },
    setClearState: (state) => {
      state.addAdress = initialAddress;
      state.mode = MODE.CREATE;
    },
    setUpdateAddress: (state, action: PayloadAction<UpdateAdressRequest>) => {
      state.addAdress.addressDescription = action.payload.addressDescription;
      state.addAdress.addressDetail = action.payload.addressDetail;
      state.addAdress.addressId = action.payload.addressId;
      state.addAdress.addressName = action.payload.addressName;
      state.addAdress.contactName = action.payload.contactName;
      state.addAdress.contactPhone = action.payload.contactPhone;
      state.addAdress.homeType = action.payload.homeType;
      state.mode = MODE.UPDATE;
      router.push('addAddress');
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setAddAddress,
  setAddressMode,
  setUpdateAddress,
  setClearState,
  setCreateNewAddress,
} = addressSlice.actions;

export default addressSlice.reducer;
