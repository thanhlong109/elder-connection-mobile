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
    </Stack>
  );
};

export default ProfileLayout;
