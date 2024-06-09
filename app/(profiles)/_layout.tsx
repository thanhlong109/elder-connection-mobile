import React from 'react';
import { Stack } from 'expo-router';

const ProfileLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="myWallet"
        options={{
          headerShown: false,
          animation: 'ios',
        }}
      />
      <Stack.Screen
        name="person-infor"
        options={{
          headerShown: false,
          animation: 'ios',
        }}
      />
      <Stack.Screen
        name="addCoins"
        options={{
          headerShown: true,
          animation: 'ios',
          title: 'Nạp tiền',
          contentStyle: {
            backgroundColor: '#fff',
          },
        }}
      />
    </Stack>
  );
};

export default ProfileLayout;
