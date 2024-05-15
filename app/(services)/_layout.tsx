import { View, Text } from 'react-native';
import React from 'react';
import { Stack } from 'expo-router';

const ServiceLayout = () => {
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
        }}
      />
    </Stack>
  );
};

export default ServiceLayout;
