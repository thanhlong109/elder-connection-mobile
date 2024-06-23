import React from 'react';
import { Stack } from 'expo-router';
import { Button } from 'react-native-ui-lib';
import { AntDesign } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { setAddressMode } from '~/slices/addressSlice';
import { RootState } from '~/store';
import { MODE } from '~/enums';

const ServiceLayout = () => {
  const dispatch = useDispatch();
  const currentMode = useSelector((state: RootState) => state.addressSlice.mode);
  return (
    <Stack>
      <Stack.Screen name="(day)" options={{ headerShown: false, animation: 'ios' }} />
      <Stack.Screen
        name="selectAddress"
        options={{
          headerShown: true,
          animation: 'ios',
          title: 'Chọn địa chỉ',
          contentStyle: {
            backgroundColor: '#fff',
          },
          headerRight: () => (
            <Button
              backgroundColor="transparent"
              color="#000"
              onPress={() => {
                dispatch(setAddressMode(currentMode === MODE.DELETE ? MODE.CREATE : MODE.DELETE));
              }}
              iconSource={() =>
                currentMode === MODE.DELETE ? (
                  <AntDesign name="closesquareo" size={24} color="red" />
                ) : (
                  <AntDesign name="delete" size={24} color="red" />
                )
              }
            />
          ),
        }}
      />
      <Stack.Screen
        name="paymentConfirm"
        options={{
          headerShown: true,
          animation: 'ios',
          title: 'Xác nhận và thanh toán',
          contentStyle: {
            backgroundColor: '#fff',
          },
        }}
      />
      <Stack.Screen
        name="addAddress"
        options={{
          headerShown: true,
          animation: 'ios',
          title: 'Thêm địa chỉ mới',
          contentStyle: {
            backgroundColor: '#fff',
          },
        }}
      />
      <Stack.Screen
        name="addLocation2"
        options={{
          headerShown: true,
          animation: 'ios',
          title: 'Chọn vị trí',
          contentStyle: {
            backgroundColor: '#fff',
          },
        }}
      />
    </Stack>
  );
};

export default ServiceLayout;
