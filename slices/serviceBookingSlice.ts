import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { HomeType, PostStatus, ServicePackageType, ServiceType } from '~/enums';
import {
  AddAdressRequest,
  AddAdressRespone,
  Address,
  GetAddressRespone,
} from '~/types/address.type';
import { GetPostRespone } from '~/types/post.type';
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
  viewPostDetails: GetPostRespone;
}

const initAddress: AddAdressRespone = {
  addressDescription: '',
  addressDetail: '',
  addressId: 0,
  addressName: '',
  contactName: '',
  contactPhone: '',
  homeType: HomeType.TOWN_HOUSE,
  accountId: '',
};

const initialUiData: UIData = {
  post: {
    address: initAddress,
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

const initViewPost: GetPostRespone = {
  address: initAddress,
  createAt: '',
  customerFirstName: '',
  customerId: '',
  customerLastName: '',
  isPriorityFavoriteConnector: false,
  jobSchedule: {
    description: '',
    endDate: '',
    jobScheduleId: 0,
    listDayWork: '',
    locationWork: '',
    onTask: false,
    startDate: '',
    taskProcess: 0,
  },
  postDescription: '',
  postId: 0,
  postStatus: PostStatus.Posted,
  price: 0,
  salaryAfterWork: 0,
  serviceId: 0,
  serviceName: '',
  startTime: '',
  title: '',
  updateAt: '',
};

const initialState: ServiceBookingSliceState = {
  uiData: initialUiData,
  viewPostDetails: initViewPost,
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
    setViewPostDetail: (state, action: PayloadAction<GetPostRespone>) => {
      state.viewPostDetails = action.payload;
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
  setViewPostDetail,
} = ServiceBookingSliceState.actions;

export default ServiceBookingSliceState.reducer;
