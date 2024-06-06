import { View, Text } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '~/store';

const addAddress = () => {
  const accountId = useSelector((state: RootState) => state.accountSlice.account.id);
  return (
    <View>
      <Text>addAddress</Text>
    </View>
  );
};

export default addAddress;
