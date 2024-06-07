import { AntDesign, Entypo } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Button, Text, TouchableOpacity, View } from 'react-native-ui-lib';
import { useDispatch } from 'react-redux';
import colors from '~/constants/colors';
import { setUpdateAddress } from '~/slices/addressSlice';
import { GetAddressRespone } from '~/types/address.type';
import { getStringEnum } from '~/utils/enumHelper';
import CustomConfirmDialog from './CustomConfirmDialog';
import { useDeleteAddressMutation } from '~/services/addressApi';
import LoadingModel from './LoadingModel';

interface AddressItemProps {
  address: GetAddressRespone;
  isDelete: boolean;
}

const AddressItem = ({ address, isDelete }: AddressItemProps) => {
  const dispatch = useDispatch();
  const [showConfirm, setshowConfirm] = useState(false);
  const { addressName, homeType, addressDescription, contactName } = address;

  //-------------------------- call api delete address ----------------------------//

  const [callDeleteAddress, { isError, isLoading, error }] = useDeleteAddressMutation();

  useEffect(() => {
    if (isError) console.log('error delete:', error);
  }, [isError]);

  //-------------------------- call api delete address ----------------------------//

  return (
    <View flex className="flex-row gap-3 rounded-lg p-3 shadow-sm">
      <LoadingModel isloading={isLoading} />
      <TouchableOpacity
        flex
        className="flex-1 flex-row gap-3"
        onPress={() => router.push('workTime')}>
        <Entypo name="location-pin" size={24} color={colors.secondary.DEFAULT} />
        <View className="flex-1">
          <Text className="font-psemibold text-xl capitalize">{addressName}</Text>
          <View row centerV className="gap-1">
            <Text className="text-lg font-medium">Người liên hệ: </Text>
            <Text className="line-clamp-1 font-plight">{contactName}</Text>
          </View>
          <View row centerV className="gap-1 overflow-hidden">
            <Text className="text-lg font-medium">Địa điểm: </Text>
            <Text className="line-clamp-1 font-plight">
              {getStringEnum(homeType)}, {addressDescription}
            </Text>
          </View>
        </View>
      </TouchableOpacity>

      <View className="justify-between">
        <TouchableOpacity
          onPress={() => dispatch(setUpdateAddress(address))}
          className="self-start rounded-full bg-primary p-2">
          <Entypo name="edit" size={20} color="#fff" />
        </TouchableOpacity>
        {isDelete && (
          <Button
            backgroundColor="transparent"
            color="#000"
            onPress={() => setshowConfirm(true)}
            iconSource={() => <AntDesign name="delete" size={24} color="red" />}
          />
        )}
      </View>
      <CustomConfirmDialog
        message="Bạn có chắc muốn xóa địa chỉ này?"
        visble={showConfirm}
        onCancelPress={() => setshowConfirm(false)}
        onConfirmPress={() => {
          callDeleteAddress(address.addressId);
          setshowConfirm(false);
        }}
      />
    </View>
  );
};

export default AddressItem;
