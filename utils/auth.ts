import { SignInRespone } from '~/types/auth.type';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KEYS } from '~/enums';

export const saveToken = (data: SignInRespone) => {
  AsyncStorage.setItem(KEYS.ACCESS_TOKEN, data.jwtToken);
  AsyncStorage.setItem(KEYS.REFRESH_TOKEN, data.jwtRefreshToken);
  AsyncStorage.setItem(KEYS.EXPIRED_TOKEN, data.expired);
  AsyncStorage.setItem(KEYS.ACCOUNT_ID_TOKEN, data.accountId);
};

export const loadToken = async () => {
  const jwtToken = await AsyncStorage.getItem(KEYS.ACCESS_TOKEN);
  const jwtRefreshToken = await AsyncStorage.getItem(KEYS.REFRESH_TOKEN);
  const expired = await AsyncStorage.getItem(KEYS.EXPIRED_TOKEN);
  const accountId = await AsyncStorage.getItem(KEYS.ACCOUNT_ID_TOKEN);
  if (jwtToken && jwtRefreshToken && expired && accountId) {
    const loaded: SignInRespone = {
      accountId,
      expired,
      jwtRefreshToken,
      jwtToken,
    };
    return loaded;
  }
  return null;
};
