import React, { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import { Text, ScrollView, View, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '~/store';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { router } from 'expo-router';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { useGetServiceByIdQuery } from '~/services/serviceApi';
import { getServiceIdByType } from '~/utils/enumHelper';
import { formatNumberToMoney } from '~/utils/formater';
import colors from '~/constants/colors';
import ErrorModel from '~/components/ErrorModel';
import SelectServiceType from '~/components/SelectServiceType';
import SelecWorktTime from '~/components/SelecWorktTime';
import PriorityFavoriteConnector from '~/components/PriorityFavoriteConnector';
import { E } from '~/constants/base';
import { AntDesign, FontAwesome6, MaterialIcons } from '@expo/vector-icons';
import { unWorkList, workList } from '~/constants/menus';

const WorkTime: React.FC = () => {
  const serviceBooking = useSelector((state: RootState) => state.serviceBooking.uiData);
  const walletBalance = useSelector((state: RootState) => state.accountSlice.account.walletBalance);
  const bottomSheetRef3 = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['25%', '50%', '75%', '100%'], []);
  const bottomSheetRef1 = useRef<BottomSheet>(null);
  const bottomSheetRef2 = useRef<BottomSheet>(null);

  const { serviceType, packageType } = serviceBooking.post;
  const [serviceId, setServiceId] = useState(() => getServiceIdByType(serviceType, packageType));
  const [price, setPrice] = useState(0);
  const [payable, setPayable] = useState(true);
  const [numDateSelected, setNumDateSelected] = useState(0);

  const { isError, isLoading, isSuccess, data, refetch } = useGetServiceByIdQuery(serviceId);

  useEffect(() => {
    if (isSuccess && data) {
      const p = data.result.finalPrice * serviceType * numDateSelected;
      setPrice(p);
      setPayable(parseFloat(walletBalance) > p);
    }
  }, [data, isSuccess, numDateSelected]);

  useEffect(() => {
    setServiceId(getServiceIdByType(serviceType, packageType));
  }, [serviceType, packageType]);

  const onConfirm = useCallback(() => {
    bottomSheetRef3.current?.close();
    router.push('paymentConfirm');
  }, []);

  const handlePayment = useCallback(() => {
    if (!isLoading) {
      if (payable) {
        bottomSheetRef3.current?.snapToIndex(2);
      } else {
        router.push('addCoins');
      }
    }
  }, [isLoading, payable]);

  return (
    <SafeAreaView>
      <ErrorModel isError={isError} onReload={refetch} />
      <ScrollView className="h-full">
        <View className="m-4 pb-8">
          <SelectServiceType />
          <SelecWorktTime onSelectedDateChange={setNumDateSelected} />
          <PriorityFavoriteConnector />
          <Animated.View entering={FadeInDown.delay(1400).duration(1000).springify()}>
            {/* control bottom Sheet 1 */}
            <TouchableOpacity
              onPress={() => bottomSheetRef1.current?.snapToIndex(2)}
              className="mt-4 flex-row gap-3 rounded-lg bg-gray-F6 p-4">
              <View className="h-[40px] w-[40px] items-center justify-center rounded-full bg-green-B1">
                <MaterialIcons name="playlist-add-check" size={30} color="white" />
              </View>
              <Text className="flex-1 align-middle font-bold text-textPrimary">
                Nhân viên của Elderconnection sẽ thực hiện các công việc gì?
              </Text>
              <View className="items-center justify-center">
                <FontAwesome6 name="angle-right" size={24} color={colors.green.B1} />
              </View>
            </TouchableOpacity>

            {/* control bottom Sheet 2 */}
            <TouchableOpacity
              onPress={() => bottomSheetRef2.current?.snapToIndex(2)}
              className="mt-4 flex-row gap-3 rounded-lg bg-gray-F6 p-4">
              <View className="h-[40px] w-[40px] items-center justify-center rounded-full bg-green-B1">
                <MaterialIcons name="playlist-remove" size={30} color="white" />
              </View>
              <Text className="flex-1 align-middle font-bold text-textPrimary">
                Các công việc mà nhân viên Elderconnection không thực hiện
              </Text>
              <View className="items-center justify-center">
                <FontAwesome6 name="angle-right" size={24} color={colors.green.B1} />
              </View>
            </TouchableOpacity>
          </Animated.View>
          {price > 0 && (
            <Animated.View entering={FadeInDown.delay(1600).duration(1000).springify()}>
              <TouchableOpacity onPress={handlePayment} className="mx-6 mt-8">
                <View
                  style={{ backgroundColor: !payable ? colors.red.R1 : colors.green.B2 }}
                  className="flex-row justify-between rounded-lg p-4">
                  <Text className="font-pbold text-lg text-white">
                    {formatNumberToMoney(price) + ' ' + E}
                  </Text>
                  <Text className="font-pregular text-lg text-white">
                    {!payable ? 'Nạp thêm' : 'Tiếp theo'}
                  </Text>
                </View>
              </TouchableOpacity>
              {!payable && (
                <View className="mt-1 w-full flex-row justify-center">
                  <Text className="font-pmedium text-base text-red-500">
                    Số dư ví của bạn không đủ!
                  </Text>
                </View>
              )}
            </Animated.View>
          )}
        </View>
      </ScrollView>

      <BottomSheet enablePanDownToClose index={-1} snapPoints={snapPoints} ref={bottomSheetRef2}>
        <BottomSheetView>
          <View className=" bg-white p-6 pb-10">
            <View className="mb-4 flex-row gap-2 align-middle">
              <Text className="flex-1 justify-center p-2 text-center font-psemibold text-lg">
                Các công việc sẽ không thực hiện
              </Text>
              <TouchableOpacity onPress={() => bottomSheetRef2.current?.close()} className="p-2">
                <AntDesign name="close" size={24} color="black" />
              </TouchableOpacity>
            </View>
            <View>
              <View className="gap-4">
                {unWorkList.map((item, index) => (
                  <View key={index} className="flex-row items-center gap-4">
                    <View className="h-3 w-3 rounded-full bg-secondary" />
                    <Text className="flex-1 font-pregular text-base">{item}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </BottomSheetView>
      </BottomSheet>
      <BottomSheet enablePanDownToClose index={-1} snapPoints={snapPoints} ref={bottomSheetRef1}>
        <BottomSheetView>
          <View className=" bg-white p-6 pb-10">
            <View className="mb-4 flex-row gap-2 align-middle">
              <Text className="flex-1 justify-center p-2 text-center font-psemibold text-lg">
                Các công việc sẽ thực hiện
              </Text>
              <TouchableOpacity onPress={() => bottomSheetRef1.current?.close()} className="p-2">
                <AntDesign name="close" size={24} color="black" />
              </TouchableOpacity>
            </View>
            <View>
              <View className="gap-4">
                {workList.map((item, index) => (
                  <View key={index} className="flex-row items-center gap-4">
                    <View className="h-3 w-3 rounded-full bg-secondary" />
                    <Text className="flex-1 font-pregular text-base">{item}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </BottomSheetView>
      </BottomSheet>

      <BottomSheet index={-1} snapPoints={snapPoints} ref={bottomSheetRef3}>
        <BottomSheetView>
          <View className="bg-white p-6 pb-10">
            <Text className="w-full text-center font-pmedium text-lg">Xác nhận đăng kí</Text>
            <View className="mt-4">
              <Text className="font-pregular text-base text-textPrimary">
                Bằng cách ấn <Text className="font-psemibold">đồng ý</Text> bạn đã xác nhận đã đọc
                đầy đủ những công việc mà Connector sẽ làm hoặc không làm và{' '}
                <Text className="font-psemibold">đăng ký dịch vụ của chúng tôi.</Text>
              </Text>
            </View>

            <View className="mt-6 flex-row justify-center gap-6">
              <TouchableOpacity
                onPress={() => bottomSheetRef3.current?.close()}
                className="flex-1 rounded-lg bg-gray-F6 py-3 shadow-md">
                <Text className="w-full text-center font-psemibold text-base text-gray-600">
                  Hủy
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={onConfirm}
                className="flex-1 rounded-lg bg-green-B1 py-3 shadow-md">
                <Text className="w-full text-center font-psemibold text-base text-white">
                  Đồng ý
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </BottomSheetView>
      </BottomSheet>
    </SafeAreaView>
  );
};

export default WorkTime;
