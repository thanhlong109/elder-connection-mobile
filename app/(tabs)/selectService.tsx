import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import images from '~/constants/images';
import { AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';
import { ServicePackageType } from '~/enums';
import { useDispatch } from 'react-redux';
import { setServicePackage } from '~/slices/serviceBookingSlice';
import Animated, { FadeInRight, FadeInUp } from 'react-native-reanimated';

const selectService = () => {
  const dispatch = useDispatch();
  const goToSelectAdress = (packageType: ServicePackageType) => {
    dispatch(setServicePackage(packageType));
  };

  return (
    <SafeAreaView>
      <View className="relative h-full bg-white">
        <Image
          source={images.bgShapes.bgShapes4}
          className="absolute left-0 top-0 h-[170px] w-full"
          resizeMode="cover"
        />

        <ScrollView>
          <View className="p-6 pb-10">
            <Animated.Text
              entering={FadeInUp.duration(1000).springify()}
              className="font-pmedium text-2xl text-[#333]">
              Chọn dịch vụ
            </Animated.Text>
            {/* first */}
            <Animated.View
              entering={FadeInRight.duration(1000).springify()}
              className="mt-6 gap-4 rounded-lg bg-white p-6 shadow-md">
              <View className="flex-row gap-4">
                <View className="flex-1 gap-1">
                  <Text className="font-pbold text-primary">Dịch vụ theo Buổi/Ngày</Text>
                  <Text className="font-pregular">
                    Giúp khách hàng linh hoạt lựa chọn cần buổi nào đặt lịch buổi đó, nhanh chóng
                    tiện lợi.
                  </Text>
                </View>
                <Image
                  source={images.service.service1}
                  className="h-[100px] w-[123px]"
                  resizeMode="contain"
                />
              </View>
              <View className="flex-row gap-4">
                <Image
                  source={images.service.service2}
                  className="h-[90px] w-[123px]"
                  resizeMode="contain"
                />
                <Text className="flex-1 font-pregular">
                  Giúp khách hàng được đăng việc chỉ với 2 phút đặt lịch. Linh hoạt 4 tiếng hoặc 8
                  tiếng.
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => goToSelectAdress(ServicePackageType.DAILY)}
                className="self-end rounded-full bg-[#5C7FE1] p-3">
                <AntDesign name="right" size={20} color="white" />
              </TouchableOpacity>
            </Animated.View>

            {/* second */}
            <Animated.View
              entering={FadeInRight.delay(200).duration(1000).springify()}
              className="mt-6 gap-6 rounded-lg bg-white p-6 shadow-md">
              <View className="flex-row gap-4">
                <View className="flex-1 gap-1">
                  <Text className="font-pbold text-primary">Dịch vụ theo gói tháng</Text>
                  <Text className="font-pregular">
                    Hỗ trợ Connector cố định chất lượng nhất cho khách hàng.
                  </Text>
                </View>
                <View>
                  <Image
                    source={images.service.service3}
                    className="h-[24px] w-[110px]"
                    resizeMode="contain"
                  />
                  <Image
                    source={images.service.service4}
                    className="h-[79px] w-[123px]"
                    resizeMode="contain"
                  />
                </View>
              </View>
              <View className="flex-row gap-4">
                <Image
                  source={images.service.service5}
                  className="h-[114px] w-[124px]"
                  resizeMode="contain"
                />
                <Text className="flex-1 font-pregular">
                  Linh hoạt xếp lịch làm việc cố định theo thời gian mong muốn. Tiết kiệm thời gian
                  đăng việc, tránh thanh toán nhiều lần.
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => goToSelectAdress(ServicePackageType.MONTHLY)}
                className="self-end rounded-full bg-[#5C7FE1] p-3">
                <AntDesign name="right" size={20} color="white" />
              </TouchableOpacity>
            </Animated.View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default selectService;
