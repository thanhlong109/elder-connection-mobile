import { configureStore } from '@reduxjs/toolkit';
import { accountApi } from '~/services/accountApi';
import { addressApi } from '~/services/addressApi';
import { postApi } from '~/services/postApi';
import { serviceApi } from '~/services/serviceApi';
import accountSlice from '~/slices/accountSlice';
import addressSlice from '~/slices/addressSlice';
import serviceBookingSlice from '~/slices/serviceBookingSlice';

export const store = configureStore({
  reducer: {
    serviceBooking: serviceBookingSlice,
    accountSlice: accountSlice,
    addressSlice: addressSlice,
    [accountApi.reducerPath]: accountApi.reducer,
    [addressApi.reducerPath]: addressApi.reducer,
    [postApi.reducerPath]: postApi.reducer,
    [serviceApi.reducerPath]: serviceApi.reducer,
  },
  middleware: (getDefaultMiddleWare) =>
    getDefaultMiddleWare()
      .concat(accountApi.middleware)
      .concat(addressApi.middleware)
      .concat(postApi.middleware)
      .concat(serviceApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
