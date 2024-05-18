import { View, Text, ScrollView, TouchableOpacity, FlatList, Pressable } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ServiceType } from '~/enums';
import { getDateString, isDate } from '~/utils/date';
import { SelectableDate, SelectableDateString } from '~/types/time.type';
import { AntDesign } from '@expo/vector-icons';
import colors from '~/constants/colors';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { Divider } from '@rneui/themed';
import { Switch } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import CustomBottomSheet from '~/components/CustomBottomSheet';
import { unWorkList, workList } from '~/constants/menus';
import { Image } from 'react-native';
import images from '~/constants/images';
import CustomConfirmBottomSheet from '~/components/CustomConfirmBottomSheet';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '~/store';
import {
  setIsPriorityFavoriteConnector,
  setServiceType,
  setWokingDates,
  setWokingStartTime,
} from '~/slices/serviceBookingSlice';

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

  const toggleSwitch = () => {
    dispatch(setIsPriorityFavoriteConnector(!isPriorityFavoriteConnector));
  };

  //slices
  const serviceBooking = useSelector((state: RootState) => state.serviceBooking);
  const dateList: SelectableDate[] = serviceBooking.workingDates.map((d) => {
    return { date: new Date(d.date), isSelected: d.isSelected };
  });
  const timeSelected: Date = new Date(serviceBooking.workingStartTime);
  const isPriorityFavoriteConnector = serviceBooking.isPriorityFavoriteConnector;
  const typeSelected = serviceBooking.serviceType;

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

  return (
    <SafeAreaView>
      <ScrollView className="h-full">
        <View className="m-4 pb-8">
          <Text className="mb-4 font-psemibold text-xl">Thời lượng</Text>
          {dateData.map((d, index) => (
            <TouchableOpacity
              key={index}
              activeOpacity={0.7}
              onPress={() => dispatch(setServiceType(d.type))}
              className={`my-2 gap-1 rounded-md border-[1px] border-[#fff] p-4 shadow-sm ${typeSelected === d.type ? 'border-secondary bg-secondary-BG' : ''}`}>
              <Text
                className={`font-psemibold text-lg ${typeSelected === d.type ? 'text-secondary' : ''}`}>
                {d.title}
              </Text>
              <Text className="font-pregular">{d.des} </Text>
            </TouchableOpacity>
          ))}

          <Text className="mb-4 mt-6 font-psemibold text-xl">Thời gian làm việc</Text>
          <View className="flex-row justify-between">
            <Text className="font-plight">Chọn ngày làm</Text>
            <Text className="text-right font-pbold">
              Tháng{` ${dateList[0].date.getMonth() + 1}/${dateList[0].date.getFullYear()}`}
            </Text>
          </View>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={dateList}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity
                  key={index}
                  activeOpacity={0.7}
                  disabled={index === 0}
                  className={`relative mx-3 my-4 gap-2 rounded-lg p-4 shadow-sm ${item.isSelected ? 'bg-secondary' : ''}`}
                  onPress={() => toggleSelectDate(index)}>
                  {index === 0 && (
                    <View className="bg-green-B2 absolute left-[50%] top-0 h-4 w-4 translate-x-1/2 translate-y-[-8px] rounded-full"></View>
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
          <View className="mt-4 flex-row items-center justify-between rounded-lg border-[1px] border-gray-C5 p-4">
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
              <Divider orientation="vertical" />
              <Text className="h-[48px] w-[64px] text-center align-middle font-psemibold text-lg">
                {timeSelected.getMinutes()}
              </Text>
            </TouchableOpacity>
          </View>
          {isChangeTime && (
            <DateTimePicker
              is24Hour
              value={timeSelected}
              display="spinner"
              onChange={onTimeChange}
              mode="time"
            />
          )}
          <View className="mt-4 flex-row items-center justify-between p-4">
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
          </View>
          <CustomBottomSheet
            endIcon={<FontAwesome6 name="angle-right" size={24} color={colors.green.B1} />}
            startIcon={<MaterialIcons name="playlist-add-check" size={30} color="white" />}
            title="Nhân viên của Elderconnection sẽ thực hiện các công việc gì?"
            showItems={
              <View className="gap-4">
                {workList.map((item, index) => (
                  <View key={index} className="flex-row items-center gap-4">
                    <View className="h-3 w-3 rounded-full bg-secondary" />
                    <Text className="flex-1 font-pregular text-base">{item}</Text>
                  </View>
                ))}
              </View>
            }
          />

          <CustomBottomSheet
            endIcon={<FontAwesome6 name="angle-right" size={24} color={colors.green.B1} />}
            startIcon={<MaterialIcons name="playlist-remove" size={30} color="white" />}
            title="Các công việc mà nhân viên Elderconnection không thực hiện"
            showItems={
              <View className="gap-4">
                {unWorkList.map((item, index) => (
                  <View key={index} className="flex-row items-center gap-4">
                    <View className="h-3 w-3 rounded-full bg-secondary" />
                    <Text className="flex-1 font-pregular text-base">{item}</Text>
                  </View>
                ))}
              </View>
            }
          />

          <CustomConfirmBottomSheet
            buttonContent={
              <View className="bg-green-B2 mx-6 mt-8 flex-row justify-between rounded-lg p-4">
                <Text className="font-pbold text-lg text-white">520,000 VND/8h</Text>
                <Text className="font-pregular text-lg text-white">tiếp theo</Text>
              </View>
            }
            title="Xác nhận đăng kí"
            body={
              <View>
                <Text className="font-pregular text-base text-textPrimary">
                  Bằng cách ấn <Text className="font-psemibold">đồng ý</Text> bạn đã xác nhận đã đọc
                  đầy đủ những công việc mà Connector sẽ làm hoặc không làm và{' '}
                  <Text className="font-psemibold">đăng ký dịch vụ của chúng tôi.</Text>
                </Text>
              </View>
            }
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default workTime;
