import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { HomeType, ServicePackageType, ServiceType } from '~/enums';
import { Address, GetAddressRespone } from '~/types/address.type';
import { CreatePostAndScheduleRequest } from '~/types/post.type';
import { SelectableDateString } from '~/types/time.type';

const getNextSevenDays = () => {
  const data: SelectableDateString[] = [];
  const today = new Date();

  for (let i = 0; i < 7; i++) {
    const nextDate = new Date();
    nextDate.setDate(today.getDate() + i);
    data.push({ date: nextDate.toISOString(), isSelected: false });
  }

  return data;
};

interface UIData {
  post: {
    serviceType: ServiceType;
    address: GetAddressRespone;
    isPriorityFavoriteConnector: boolean;
    postDescription: string;
    title: string;
    startTime: string;
    packageType: ServicePackageType;
  };
  schedule: {
    listDayWork: SelectableDateString[];
  };
}

export interface ServiceBookingSliceState {
  uiData: UIData;
}

const initialUiData: UIData = {
  post: {
    address: {
      addressDescription: '',
      addressDetail: '',
      addressId: 0,
      addressName: '',
      contactName: '',
      contactPhone: '',
      homeType: HomeType.TOWN_HOUSE,
    },
    isPriorityFavoriteConnector: false,
    postDescription: '',
    serviceType: ServiceType.SERVICE_4,
    startTime: new Date().toISOString(),
    title: 'Chăm xóc người cao tuổi tại nhà',
    packageType: ServicePackageType.DAILY,
  },
  schedule: {
    listDayWork: getNextSevenDays(),
  },
};

const initialState: ServiceBookingSliceState = {
  uiData: initialUiData,
};

export const ServiceBookingSliceState = createSlice({
  name: 'serviceBooking',
  initialState,
  reducers: {
    setServicePackage: (state, action: PayloadAction<ServicePackageType>) => {
      state.uiData.post.packageType = action.payload;
    },
    setServiceType: (state, action: PayloadAction<ServiceType>) => {
      state.uiData.post.serviceType = action.payload;
    },
    setWokingDates: (state, action: PayloadAction<SelectableDateString[]>) => {
      state.uiData.schedule.listDayWork = action.payload;
    },
    setWokingStartTime: (state, action: PayloadAction<string>) => {
      state.uiData.post.startTime = action.payload;
    },
    setIsPriorityFavoriteConnector: (state, action: PayloadAction<boolean>) => {
      state.uiData.post.isPriorityFavoriteConnector = action.payload;
    },
    setWorkingAddress: (state, action: PayloadAction<GetAddressRespone>) => {
      state.uiData.post.address = action.payload;
    },
    setPostDescription: (state, action: PayloadAction<string>) => {
      state.uiData.post.postDescription = action.payload;
    },
    setPostTitle: (state, action: PayloadAction<string>) => {
      state.uiData.post.title = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setIsPriorityFavoriteConnector,
  setServicePackage,
  setServiceType,
  setWokingDates,
  setWokingStartTime,
  setWorkingAddress,
  setPostDescription,
  setPostTitle,
} = ServiceBookingSliceState.actions;

export default ServiceBookingSliceState.reducer;
