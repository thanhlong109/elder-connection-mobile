import { TextInput, ScrollView } from 'react-native';
import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getDateString } from '~/utils/date';
import { DateStringType } from '~/enums';
import CustomButton from '~/components/CustomButton';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useSelector } from 'react-redux';
import { RootState } from '~/store';
import { getServiceTypeStringEnum, getStringEnum } from '~/utils/enumHelper';
import { Text, View } from 'react-native-ui-lib';

const paymentConfirm = () => {
  const serviceBooking = useSelector((state: RootState) => state.serviceBooking.uiData);
  const {
    address,
    isPriorityFavoriteConnector,
    packageType,
    postDescription,
    serviceType,
    startTime,
    title,
  } = serviceBooking.post;

  const { listDayWork } = serviceBooking.schedule;
  const dateStartTime = new Date(startTime);
  const dateEndTime = new Date();
  dateEndTime.setHours(dateEndTime.getHours() + serviceType, dateEndTime.getMinutes());
  return (
    <SafeAreaView className="h-full">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="h-full w-full gap-10 px-5 pb-10">
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
                <Text className="line-clamp-1 font-pregular text-base text-black/65">
                  {`${getStringEnum(address.homeType)} tại ${address.addressDescription}`}
                </Text>
              </View>
              <View className="gap-1">
                <Text className="font-pmedium text-base">Thông tin liên hệ</Text>
                <View row centerV>
                  <Text className="font-pregular text-base text-black/50">Họ tên:</Text>
                  <Text className="font-pregular text-base text-black/50">
                    {address.contactName}
                  </Text>
                </View>
                <View row centerV>
                  <Text className="font-pregular text-base text-black/50">Số điện thoại:</Text>
                  <Text className="font-pregular text-base text-black/50">
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
                    <Text className="font-pregular text-sm text-black/55">Ngày làm việc</Text>
                    <Text className="font-pregular text-sm  text-black/90">{`${listDayWork.map(
                      (date) => {
                        const d = new Date(date.date);
                        return `${getDateString(d.getDate(), DateStringType.SHORT)} - ${d.getDate()}\/${d.getMonth()} `;
                      }
                    )}`}</Text>
                  </View>
                  <View className="flex-row justify-between gap-10">
                    <Text className="font-pregular text-sm text-black/55">Làm trong</Text>
                    <Text className="font-pregular text-sm  text-black/90">{`${getServiceTypeStringEnum(serviceType)}, ${dateStartTime.getHours()}:${dateStartTime.getMinutes()} đến ${dateEndTime.getHours()}:${dateEndTime.getMinutes()}`}</Text>
                  </View>
                </View>
              </View>

              <View className="gap-1">
                <Text className="font-pmedium text-base">Chi tiết công việc</Text>
                <View className="mt-2 flex-row justify-between gap-10">
                  <Text className="font-pregular text-sm text-black/55">Chi tiết công việc</Text>
                  <Text className="flex-1 font-pregular text-sm text-black/90">
                    Chăm xóc người cao tuổi tại nhà.
                  </Text>
                </View>
              </View>
            </Animated.View>
          </View>

          {/* Ghi chu */}
          <Animated.View entering={FadeInDown.delay(800).duration(1000).springify()}>
            <Text className="font-psemibold text-lg ">Ghi chú cho Connector</Text>
            <TextInput
              placeholder="Ghi chú gì đó giúp Connector làm việc tốt hơn."
              numberOfLines={3}
              multiline
              className="mt-5 rounded-md border-[1px] border-gray-300 p-4"
            />
          </Animated.View>
          <Animated.View entering={FadeInDown.delay(1000).duration(1000).springify()}>
            <CustomButton handlePress={() => {}} title="Đăng việc" containerStyles="!bg-green-B2" />
          </Animated.View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default paymentConfirm;
