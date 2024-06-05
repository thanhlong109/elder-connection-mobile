import { SignInRespone } from '~/types/auth.type';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KEYS } from '~/enums';

export const saveToken = (data: SignInRespone) => {
  AsyncStorage.setItem(KEYS.ACCESS_TOKEN, data.jwtToken);
  AsyncStorage.setItem(KEYS.REFRESH_TOKEN, data.jwtRefreshToken);
  AsyncStorage.setItem(KEYS.EXPIRED_TOKEN, data.expired);
};
