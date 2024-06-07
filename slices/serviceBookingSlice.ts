import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { ServicePackageType, ServiceType } from '~/enums';
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

export interface ServiceBookingSliceState {
  serviceType: ServiceType;
  servicePackageType: ServicePackageType;
  workingDates: SelectableDateString[];
  workingStartTime: string;
  workingAddress: string;
  isPriorityFavoriteConnector: boolean;
  //createPostAndSchedule: CreatePostAndScheduleRequest
}

const initialState: ServiceBookingSliceState = {
  isPriorityFavoriteConnector: false,
  servicePackageType: ServicePackageType.DAILY,
  serviceType: ServiceType.SERVICE_4,
  workingDates: getNextSevenDays(),
  workingStartTime: new Date().toISOString(),
  workingAddress: '',
};

export const ServiceBookingSliceState = createSlice({
  name: 'serviceBooking',
  initialState,
  reducers: {
    setServicePackage: (state, action: PayloadAction<ServicePackageType>) => {
      state.servicePackageType = action.payload;
    },
    setServiceType: (state, action: PayloadAction<ServiceType>) => {
      state.serviceType = action.payload;
    },
    setWokingDates: (state, action: PayloadAction<SelectableDateString[]>) => {
      state.workingDates = action.payload;
    },
    setWokingStartTime: (state, action: PayloadAction<string>) => {
      state.workingStartTime = action.payload;
    },
    setIsPriorityFavoriteConnector: (state, action: PayloadAction<boolean>) => {
      state.isPriorityFavoriteConnector = action.payload;
    },
    setWorkingAddress: (state, action: PayloadAction<string>) => {
      state.workingAddress = action.payload;
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
} = ServiceBookingSliceState.actions;

export default ServiceBookingSliceState.reducer;
