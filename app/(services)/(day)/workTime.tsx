import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import React, { useMemo, useRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ServiceType } from '~/enums';
import { getDateString } from '~/utils/date';
import { SelectableDate, SelectableDateString } from '~/types/time.type';
import { AntDesign } from '@expo/vector-icons';
import colors from '~/constants/colors';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { Switch } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import { unWorkList, workList } from '~/constants/menus';
import { Image } from 'react-native';
import images from '~/constants/images';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '~/store';
import {
  setIsPriorityFavoriteConnector,
  setServiceType,
  setWokingDates,
  setWokingStartTime,
} from '~/slices/serviceBookingSlice';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { router } from 'expo-router';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';

const dateData = [
  {
    title: 'Theo buổi',
    des: 'Thời gian làm việc tối đa 4 giờ/ngày',
    type: ServiceType.SERVICE_4,
  },
  {
    title: 'Theo ngày',
    des: 'Thời gian làm việc tối đa 8 giờ/ngày',
    type: ServiceType.SERVICE_8,
  },
];

const workTime = () => {
  //const [typeSelected, setTypeSelected] = useState<ServiceType | null>(null);
  const [isChangeTime, setIsChangeTime] = useState(false);
  const dispatch = useDispatch();
  const snapPoints = useMemo(() => ['25%', '50%', '75%', '100%'], []);
  const bottomSheetRef1 = useRef<BottomSheet>(null);
  const bottomSheetRef2 = useRef<BottomSheet>(null);
  const bottomSheetRef3 = useRef<BottomSheet>(null);

  const toggleSwitch = () => {
    dispatch(setIsPriorityFavoriteConnector(!isPriorityFavoriteConnector));
  };

  //slices
  const serviceBooking = useSelector((state: RootState) => state.serviceBooking.uiData);
  const dateList: SelectableDate[] = serviceBooking.schedule.listDayWork.map((d) => {
    return { date: new Date(d.date), isSelected: d.isSelected };
  });
  const timeSelected: Date = new Date(serviceBooking.post.startTime);
  const isPriorityFavoriteConnector = serviceBooking.post.isPriorityFavoriteConnector;
  const typeSelected = serviceBooking.post.serviceType;

  const toggleSelectDate = (index: number) => {
    var tempList = [...dateList];
    var temp = tempList[index];
    tempList.splice(index, 1, { ...temp, isSelected: !temp.isSelected });
    var dates: SelectableDateString[] = tempList.map((d) => {
      return { date: d.date.toISOString(), isSelected: d.isSelected };
    });
    dispatch(setWokingDates(dates));
  };

  const onTimeChange = (e: DateTimePickerEvent, date?: Date) => {
    setIsChangeTime(false);
    if (e.type === 'set') {
      if (date) {
        dispatch(setWokingStartTime(date.toISOString()));
      }
    }
  };

  const onConfirm = () => {
    bottomSheetRef3.current?.close();
    router.push('paymentConfirm');
  };

  return (
    <SafeAreaView>
      <ScrollView className="h-full">
        <View className="m-4 pb-8">
          <Animated.Text
            entering={FadeInDown.duration(1000).springify()}
            className="mb-4 font-psemibold text-xl">
            Thời lượng
          </Animated.Text>
          {dateData.map((d, index) => (
            <Animated.ScrollView
              entering={FadeInDown.delay(index * 200)
                .duration(1000)
                .springify()}
              key={index}>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => dispatch(setServiceType(d.type))}
                className={`my-2 gap-1 rounded-md border-[1px] border-gray-300 p-4  ${typeSelected === d.type ? '!border-secondary bg-secondary-BG' : ''}`}>
                <Text
                  className={`font-psemibold text-lg ${typeSelected === d.type ? 'text-secondary' : ''}`}>
                  {d.title}
                </Text>
                <Text className="font-pregular">{d.des} </Text>
              </TouchableOpacity>
            </Animated.ScrollView>
          ))}

          <Animated.Text
            entering={FadeInDown.delay(400).duration(1000).springify()}
            className="mb-4 mt-6 font-psemibold text-xl">
            Thời gian làm việc
          </Animated.Text>
          <Animated.View
            entering={FadeInDown.delay(600).duration(1000).springify()}
            className="flex-row justify-between">
            <Text className="font-plight">Chọn ngày làm</Text>
            <Text className="text-right font-pbold">
              Tháng{` ${dateList[0].date.getMonth() + 1}/${dateList[0].date.getFullYear()}`}
            </Text>
          </Animated.View>
          <Animated.FlatList
            entering={FadeInDown.delay(800).duration(1000).springify()}
            horizontal
            showsHorizontalScrollIndicator={false}
            data={dateList}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity
                  key={index}
                  activeOpacity={0.7}
                  disabled={index === 0}
                  className={`relative mx-3 my-4 gap-2 rounded-lg border-[1px] border-gray-300 p-4 ${item.isSelected ? 'border-secondary !bg-secondary' : ''}`}
                  onPress={() => toggleSelectDate(index)}>
                  {index === 0 && (
                    <View className="absolute left-[50%] top-0 h-4 w-4 translate-x-1/2 translate-y-[-8px] rounded-full bg-green-B2"></View>
                  )}
                  <Text
                    className={`text-center font-pbold ${index === 0 ? 'text-secondary' : ''} ${item.isSelected ? 'text-white' : ''}`}>
                    {getDateString(item.date.getDay())}
                  </Text>
                  <Text
                    className={`text-center font-pregular ${index === 0 ? 'text-secondary' : ''}  ${item.isSelected ? 'text-white' : ''}`}>
                    {item.date.getDate()}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
          <Animated.View
            entering={FadeInDown.delay(1000).duration(1000).springify()}
            className="mt-4 flex-row items-center justify-between rounded-lg border-[1px] border-gray-C5 p-4">
            <View className="flex-row gap-2">
              <AntDesign name="clockcircle" size={24} color={colors.secondary.DEFAULT} />
              <Text className="font-psemibold text-lg text-textPrimary">Thời gian bắt đầu</Text>
            </View>
            <TouchableOpacity
              onPress={() => setIsChangeTime(true)}
              className="flex-row items-center justify-center rounded-md bg-gray-F6">
              <Text className="h-[48px] w-[64px] text-center align-middle font-psemibold text-lg">
                {timeSelected.getHours()}
              </Text>
              {/* <Divider orientation="vertical" /> */}
              <Text className="h-[48px] w-[64px] text-center align-middle font-psemibold text-lg">
                {timeSelected.getMinutes()}
              </Text>
            </TouchableOpacity>
          </Animated.View>
          {isChangeTime && (
            <DateTimePicker
              is24Hour
              value={timeSelected}
              display="spinner"
              onChange={onTimeChange}
              mode="time"
            />
          )}
          <Animated.View
            entering={FadeInDown.delay(1200).duration(1000).springify()}
            className="mt-4 flex-row items-center justify-between p-4">
            <View className="flex-row items-center gap-4">
              <Image
                className="h-8 w-8"
                resizeMode="contain"
                source={images.Icons.connectorFavorite}
              />
              <Text className="align-middle font-pregular text-lg text-textPrimary">
                Ưu tiên tasker yêu thích
              </Text>
            </View>
            <Switch
              trackColor={{ false: '#767577', true: colors.green.B2 }}
              thumbColor={isPriorityFavoriteConnector ? colors.green.B3 : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isPriorityFavoriteConnector}
            />
          </Animated.View>
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

          <Animated.View entering={FadeInDown.delay(1600).duration(1000).springify()}>
            <TouchableOpacity onPress={() => bottomSheetRef3.current?.snapToIndex(2)}>
              <View className="mx-6 mt-8 flex-row justify-between rounded-lg bg-green-B2 p-4">
                <Text className="font-pbold text-lg text-white">520,000 VND/8h</Text>
                <Text className="font-pregular text-lg text-white">tiếp theo</Text>
              </View>
            </TouchableOpacity>
          </Animated.View>
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
              <View>
                <Text className="font-pregular text-base text-textPrimary">
                  Bằng cách ấn <Text className="font-psemibold">đồng ý</Text> bạn đã xác nhận đã đọc
                  đầy đủ những công việc mà Connector sẽ làm hoặc không làm và{' '}
                  <Text className="font-psemibold">đăng ký dịch vụ của chúng tôi.</Text>
                </Text>
              </View>
            </View>

            <View className="mt-6 flex-row justify-center gap-6">
              <TouchableOpacity
                onPress={() => bottomSheetRef3.current?.close()}
                className="flex-1 rounded-lg bg-gray-F6  py-3  shadow-md">
                <Text className="w-full text-center font-psemibold text-base text-gray-600">
                  Hủy
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={onConfirm}
                className="flex-1 rounded-lg bg-green-B1 py-3  shadow-md">
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

export default workTime;
