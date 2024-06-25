import { createSelector } from 'reselect';
import { RootState } from '~/store';

const selectServiceBookingState = (state: RootState) => state.serviceBooking;

export const selectServiceType = createSelector(
  [selectServiceBookingState],
  (serviceBookingState) => serviceBookingState.uiData.post.serviceType
);

export const selectPackageType = createSelector(
  [selectServiceBookingState],
  (serviceBookingState) => serviceBookingState.uiData.post.packageType
);

export const selectWalletBalance = createSelector(
  [(state) => state.accountSlice],
  (accountSlice) => accountSlice.account.walletBalance
);
