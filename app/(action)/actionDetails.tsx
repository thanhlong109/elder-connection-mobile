import React, { useEffect } from 'react';
import { ScrollView } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Text, View } from 'react-native-ui-lib';
import { useSelector } from 'react-redux';
import { PostStatus } from '~/enums';
import { RootState } from '~/store';
import {
  getStringEnum,
  getStringPostStatusEnum,
  getTimeFromServiceStringEnum,
} from '~/utils/enumHelper';
import { formatNumberToMoney } from '~/utils/formater';

const actionDetails = () => {
  const action = useSelector((state: RootState) => state.serviceBooking.viewPostDetails);
  const {
    address,
    jobSchedule,
    serviceName,
    startTime,
    title,
    serviceId,
    postDescription,
    createAt,
    postStatus,
    isPriorityFavoriteConnector,
    price,
  } = action;
  console.log(serviceName);
  const getEndtime = (time: string) => {
    const parts = time.split(':');
    const t = parseInt(parts[0]) + getTimeFromServiceStringEnum(serviceId);
    return `${t.toString().padStart(2, '0')}:${parts[1]}:${parts[2]}`;
  };
  return (
    <View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="h-full w-full gap-10 px-5 pb-10">
          <View className="mt-6">
            <Animated.Text
              entering={FadeInDown.duration(1000).springify()}
              className="font-psemibold text-lg">
              Thông tin cơ bản
            </Animated.Text>
            <Animated.View
              entering={FadeInDown.delay(200).duration(1000).springify()}
              className="mt-5 gap-4 rounded-md border-[1px] border-gray-300 p-4">
              <View className="gap-1">
                <View row centerV className="gap-1">
                  <Text className="font-pregular text-base text-black/50">Trạng thái:</Text>
                  <Text
                    className={` !rounded-sm ${postStatus == PostStatus.Public || postStatus == PostStatus.Posted ? '!bg-secondary' : postStatus == PostStatus.Accepted ? '!bg-[#468DE0]' : postStatus === PostStatus.Completed ? '!bg-primary' : '!bg-red-500'} px-2 py-1 font-pmedium text-sm !text-white`}>
                    {getStringPostStatusEnum(postStatus)}
                  </Text>
                </View>
                <View row centerV className="gap-1">
                  <Text className="font-pregular text-base text-black/50">Ngày đăng:</Text>
                  <Text className="font-plight text-base text-black/50">
                    {new Date(createAt).toLocaleDateString()}
                  </Text>
                </View>
                <View row centerV className="gap-1">
                  <Text className="font-pregular text-base text-black/50">
                    Ưu tiên connector yêu thích:
                  </Text>
                  <Text className="font-plight text-base text-black/50">
                    {isPriorityFavoriteConnector ? 'Có' : 'Không'}
                  </Text>
                </View>
                <View row centerV className="gap-1">
                  <Text className="font-pregular text-base text-black/50">Giá:</Text>
                  <Text className="font-pmedium text-base !text-red-500">
                    {formatNumberToMoney(price) + ' VND'}
                  </Text>
                </View>
              </View>
            </Animated.View>
          </View>
          {/* vi tri lm viec */}
          <View>
            <Animated.Text
              entering={FadeInDown.duration(1000).springify()}
              className="font-psemibold text-lg">
              Vị trí làm việc
            </Animated.Text>
            <Animated.View
              entering={FadeInDown.delay(200).duration(1000).springify()}
              className="mt-5 gap-4 rounded-md border-[1px] border-gray-300 p-4">
              <View className="gap-1">
                <Text className="font-pmedium text-base">{address.addressName}</Text>
                <Text className="line-clamp-1 font-plight text-base text-black/65">
                  {`${getStringEnum(address.homeType)} tại ${address.addressDescription}`}
                </Text>
              </View>
              <View className="gap-1">
                <Text className="font-pmedium text-base">Thông tin liên hệ</Text>
                <View row centerV className="gap-1">
                  <Text className="font-pregular text-base text-black/50">Họ tên:</Text>
                  <Text className="font-plight text-base text-black/50">{address.contactName}</Text>
                </View>
                <View row centerV className="gap-1">
                  <Text className="font-pregular text-base text-black/50">Số điện thoại:</Text>
                  <Text className="font-plight text-base text-black/50">
                    {address.contactPhone}
                  </Text>
                </View>
              </View>
            </Animated.View>
          </View>

          {/* thong tin cong viec */}
          <View>
            <Animated.Text
              entering={FadeInDown.delay(400).duration(1000).springify()}
              className="font-psemibold text-lg ">
              Thông tin công việc
            </Animated.Text>
            <Animated.View
              entering={FadeInDown.delay(600).duration(1000).springify()}
              className="mt-5 gap-6 rounded-md border-[1px] border-gray-300 p-4">
              <View className="gap-2">
                <Text className="font-pmedium text-base">Thời gian làm việc</Text>
                <View className="gap-1">
                  <View className=" justify-between gap-1">
                    <Text className="font-plight text-base  text-black/90">
                      {jobSchedule.listDayWork}
                    </Text>
                  </View>

                  <View className="flex-row  gap-1">
                    <Text className="font-plight text-base text-black/55">Thời gian: </Text>
                    <Text className="font-plight text-base  text-black/90">{`${startTime} đến ${getEndtime(startTime)}`}</Text>
                  </View>
                </View>
              </View>

              <View className="gap-1">
                <Text className="font-pmedium text-base">Chi tiết công việc</Text>
                <View className="mt-2 justify-between gap-1">
                  <Text className="flex-1 font-plight text-base text-black/90">{title}</Text>
                  <View className="flex-row  gap-1">
                    <Text className="font-plight text-base text-black/55">Gói dịch vụ: </Text>
                    <Text className="font-plight text-base  text-black/90">{serviceName}</Text>
                  </View>
                </View>
              </View>
            </Animated.View>
          </View>

          {/* Ghi chu */}
          <Animated.View entering={FadeInDown.delay(800).duration(1000).springify()}>
            <Text className="mb-2 font-psemibold text-lg ">Ghi chú cho Connector</Text>
            <Text className="font-plight text-base  text-black/90">
              {postDescription === 'string' || postDescription.length === 0
                ? 'Không có ghi chú nào'
                : postDescription}
            </Text>
          </Animated.View>
        </View>
      </ScrollView>
    </View>
  );
};

export default actionDetails;
