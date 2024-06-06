import { Entypo } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native-ui-lib';
import { useDispatch } from 'react-redux';
import colors from '~/constants/colors';
import { setAddAddress, setUpdateAddress } from '~/slices/addressSlice';
import { GetAddressRespone } from '~/types/address.type';
import { getStringEnum } from '~/utils/enumHelper';

interface AddressItemProps {
  address: GetAddressRespone;
}

const AddressItem = ({ address }: AddressItemProps) => {
  const dispatch = useDispatch();
  const { addressName, homeType, addressDescription, contactName } = address;
  return (
    <View className="flex-row gap-3 rounded-lg p-3 shadow-sm">
      <TouchableOpacity className="flex-1 flex-row gap-3" onPress={() => router.push('workTime')}>
        <Entypo name="location-pin" size={24} color={colors.secondary.DEFAULT} />
        <View className="flex-1">
          <Text className="font-psemibold text-xl capitalize">{addressName}</Text>
          <View row centerV className="gap-1">
            <Text className="text-lg font-medium">Người liên hệ: </Text>
            <Text className="line-clamp-1 font-plight">{contactName}</Text>
          </View>
          <View row centerV className="gap-1">
            <Text className="text-lg font-medium">Địa điểm: </Text>
            <Text className="line-clamp-1 font-plight">
              {' '}
              mlka dksaldm lkasfmdds lfksdf lks
              {getStringEnum(homeType)}, {addressDescription}
            </Text>
          </View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => dispatch(setUpdateAddress(address))}
        className="self-start rounded-full bg-primary p-2">
        <Entypo name="edit" size={20} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

export default AddressItem;
