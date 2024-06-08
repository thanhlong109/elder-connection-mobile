import { Stack } from 'expo-router';
import React from 'react';

const ActionLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="actionDetails"
        options={{
          headerShown: true,
          animation: 'ios',
          title: 'Chi tiết',
          contentStyle: {
            backgroundColor: '#fff',
          },
        }}
      />
    </Stack>
  );
};

export default ActionLayout;
