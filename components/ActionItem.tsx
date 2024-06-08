import { router, useNavigation } from 'expo-router';
import React from 'react';
import { Card, Image, Text, TouchableOpacity, View } from 'react-native-ui-lib';
import { useDispatch } from 'react-redux';
import images from '~/constants/images';
import { PostStatus } from '~/enums';
import { setViewPostDetail } from '~/slices/serviceBookingSlice';
import { GetPostRespone } from '~/types/post.type';
import { getServiceTypeFromServiceStringEnum, getStringPostStatusEnum } from '~/utils/enumHelper';

interface ActionItemProps {
  item: GetPostRespone;
}

const ActionItem = ({ item }: ActionItemProps) => {
  const dispatch = useDispatch();
  return (
    <Card enableShadow elevation={7} className="relative m-4 p-4 ">
      <TouchableOpacity
        onPress={() => {
          dispatch(setViewPostDetail(item));
          router.push('actionDetails');
        }}>
        <Text className="font-pmedium text-lg">{item.title}</Text>
        <Text
          className={`absolute -right-1 -top-1 !rounded-sm ${item.postStatus == PostStatus.Public || item.postStatus == PostStatus.Posted ? '!bg-secondary' : item.postStatus == PostStatus.Accepted ? '!bg-[#468DE0]' : item.postStatus === PostStatus.Completed ? '!bg-primary' : '!bg-red-500'} px-2 py-1 font-pmedium text-sm !text-white`}>
          {getStringPostStatusEnum(item.postStatus)}
        </Text>
        <View className="mt-2 flex-row items-center gap-4">
          <Image
            source={images.Icons.actionIcon}
            className="h-[60px] w-[60px]"
            resizeMode="contain"
          />

          <View flex>
            <View row>
              <View>
                <Text className="mt-2 font-plight text-base">
                  Người liên hệ: {item.address.contactName}
                </Text>
                <Text className="font-plight text-base">
                  Dịch vụ: {getServiceTypeFromServiceStringEnum(item.serviceId)}
                </Text>
                <Text className="font-plight text-base">Bắt đầu: {item.startTime}</Text>
              </View>
            </View>
          </View>
        </View>
        <View className="mt-1 w-full justify-end">
          <Text className=" self-end text-right font-plight text-sm italic">
            Ngày đăng: {new Date(item.createAt).toLocaleDateString()}
          </Text>
        </View>
      </TouchableOpacity>
    </Card>
  );
};

export default ActionItem;
