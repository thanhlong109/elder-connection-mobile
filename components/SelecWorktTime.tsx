import { AntDesign } from '@expo/vector-icons';
import React, { memo, useEffect, useState } from 'react';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Text, TouchableOpacity, View } from 'react-native-ui-lib';
import { useDispatch, useSelector } from 'react-redux';
import colors from '~/constants/colors';
import { setWokingDates, setWokingStartTime } from '~/slices/serviceBookingSlice';
import { RootState } from '~/store';
import { SelectableDate, SelectableDateString } from '~/types/time.type';
import { getDateString, getSelectedDaysForNextNMonths } from '~/utils/date';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { ServicePackageType } from '~/enums';
import LoadingModel from './LoadingModel';
import ShowSelectedDates from './ShowSelectedDates';

interface SelecWorktTimeProps {
  onSelectedDateChange: (numDateSelected: number) => void;
}

const durationData = [
  {
    title: 'Thời gian 1 Tháng',
    id: 1,
  },
  {
    title: 'Thời gian 2 Tháng',
    id: 2,
  },
  {
    title: 'Thời gian 3 Tháng',
    id: 3,
  },
];

const SelecWorktTime = ({ onSelectedDateChange }: SelecWorktTimeProps) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [showCalendar, setshowCalendar] = useState(false);
  const [duration, setduration] = useState(1);
  const servicePackage = useSelector(
    (state: RootState) => state.serviceBooking.uiData.post.packageType
  );
  const listDayWork = useSelector(
    (state: RootState) => state.serviceBooking.uiData.schedule.listDayWork
  );
  const startTime = useSelector((state: RootState) => state.serviceBooking.uiData.post.startTime);
  const dateList: SelectableDate[] = listDayWork.map((d) => {
    return { date: new Date(d.date), isSelected: d.isSelected };
  });
  const timeSelected: Date = new Date(startTime);
  const [isChangeTime, setIsChangeTime] = useState(false);
  const [selectedDateOfWeek, setSelectedDateOfWeek] = useState<number[]>([]);

  const toggleSelectDate = async (index: number) => {
    setLoading(true);
    var tempList = [...dateList];
    var temp = tempList[index];
    tempList.splice(index, 1, { ...temp, isSelected: !temp.isSelected });
    var dates: SelectableDateString[] = tempList.map((d) => {
      return { date: d.date.toISOString(), isSelected: d.isSelected };
    });
    if (ServicePackageType.MONTHLY === servicePackage)
      setSelectedDateOfWeek(tempList.filter((d) => d.isSelected).map((d) => d.date.getDay()));
    dispatch(setWokingDates(dates));
    setLoading(false);
  };

  const onTimeChange = (e: DateTimePickerEvent, date?: Date) => {
    setIsChangeTime(false);
    if (e.type === 'set') {
      if (date) {
        dispatch(setWokingStartTime(date.toISOString()));
      }
    }
  };

  useEffect(() => {
    const selectedDates = dateList.filter((d) => d.isSelected);
    if (servicePackage == ServicePackageType.MONTHLY)
      setSelectedDateOfWeek(selectedDates.map((d) => d.date.getDay()));
    if (servicePackage === ServicePackageType.DAILY) onSelectedDateChange(selectedDates.length);
  }, [dateList]);

  return (
    <View>
      <LoadingModel isloading={loading} />
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
              disabled={servicePackage === ServicePackageType.DAILY && index === 0}
              className={`relative mx-3 my-4 gap-2 rounded-lg border-[1px] border-gray-300 p-4 ${item.isSelected ? 'border-secondary !bg-secondary' : ''}`}
              onPress={() => toggleSelectDate(index)}>
              {index === 0 && (
                <View className="absolute left-[50%] top-0 h-4 w-4 translate-x-1/2 translate-y-[-8px] rounded-full bg-green-B2"></View>
              )}
              <Text
                className={`text-center font-pbold ${index === 0 ? '!text-secondary' : ''} ${item.isSelected ? '!text-white' : ''}`}>
                {getDateString(item.date.getDay())}
              </Text>
              <Text
                className={`text-center font-pregular ${index === 0 ? '!text-secondary' : ''}  ${item.isSelected ? '!text-white' : ''}`}>
                {item.date.getDate()}
              </Text>
            </TouchableOpacity>
          );
        }}
      />

      {servicePackage == ServicePackageType.MONTHLY && selectedDateOfWeek.length > 0 && (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            setshowCalendar(true);
          }}
          className={`my-2 !w-fit gap-1 border-l-[2px] !border-secondary bg-secondary-BG p-4`}>
          <Text className={`font-plight text-base !text-secondary`}>
            Xem danh sách ngày làm trong tháng
          </Text>
        </TouchableOpacity>
      )}

      <ShowSelectedDates
        visible={showCalendar}
        setVisible={setshowCalendar}
        initialSelectedDates={selectedDateOfWeek}
        months={duration}
        onDateChange={(d) => onSelectedDateChange(d)}
      />

      {servicePackage == ServicePackageType.MONTHLY && (
        <Animated.View entering={FadeInDown.delay(400).duration(1000).springify()}>
          <Animated.Text className="mb-4 mt-4 font-pregular text-base">Chọn Gói</Animated.Text>
          {durationData.map((d, index) => (
            <Animated.ScrollView key={index}>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => setduration(d.id)}
                className={`my-2 gap-1 rounded-md border-[1px] border-gray-300 p-4  ${d.id === duration ? '!border-secondary bg-secondary-BG' : ''}`}>
                <Text
                  className={`font-pregular text-base ${d.id === duration ? '!text-secondary' : ''}`}>
                  {d.title}
                </Text>
              </TouchableOpacity>
            </Animated.ScrollView>
          ))}
        </Animated.View>
      )}

      <Animated.View
        entering={FadeInDown.delay(1000).duration(1000).springify()}
        className="mt-8 flex-row items-center justify-between rounded-lg border-[1px] border-gray-C5 p-4">
        <View className="flex-row gap-2">
          <AntDesign name="clockcircle" size={24} color={colors.secondary.DEFAULT} />
          <Text className="font-pmedium text-lg text-textPrimary">Thời gian bắt đầu</Text>
        </View>
        <TouchableOpacity
          onPress={() => setIsChangeTime(true)}
          className="flex-row items-center justify-center rounded-md bg-gray-F6">
          <Text className="h-[48px] w-[64px] !text-center align-middle font-psemibold text-lg">
            {timeSelected.getHours()}
          </Text>
          {/* <Divider orientation="vertical" /> */}
          <Text className="h-[48px] w-[64px] !text-center align-middle font-psemibold text-lg">
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
    </View>
  );
};

export default memo(SelecWorktTime);
