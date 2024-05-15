import { View, Text } from 'react-native';
import React from 'react';
import { Stack } from 'expo-router';

const ServiceLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="workTime"
        options={{
          headerShown: true,
          animation: 'ios',
          title: 'Chọn thời gian làm việc',
          contentStyle: {
            backgroundColor: '#fff',
          },
        }}
      />
    </Stack>
  );
};

export default ServiceLayout;
