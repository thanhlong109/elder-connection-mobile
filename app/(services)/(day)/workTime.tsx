import { View, Text, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ServiceType } from '~/enums';
import { getDateString } from '~/utils/date';
import { SelectableDate } from '~/types/time.type';

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

const getNextSevenDays = () => {
  const data: SelectableDate[] = [];
  const today = new Date();

  for (let i = 0; i < 7; i++) {
    const nextDate = new Date();
    nextDate.setDate(today.getDate() + i);
    data.push({ date: nextDate, isSelected: false });
  }

  return data;
};

const workTime = () => {
  const [typeSelected, setTypeSelected] = useState<ServiceType | null>(null);
  const [dateList, setDateList] = useState(getNextSevenDays());

  const toggleSelectDate = (index: number) => {
    var tempList = [...dateList];
    var temp = tempList[index];
    tempList.splice(index, 1, { ...temp, isSelected: !temp.isSelected });
    setDateList(tempList);
  };
  return (
    <SafeAreaView>
      <ScrollView className="h-full">
        <View className="m-4">
          <Text className="mb-4 font-psemibold text-xl">Thời lượng</Text>
          {dateData.map((d) => (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setTypeSelected(d.type)}
              className={`my-2 gap-1 rounded-md border-[1px] border-[#fff] p-4 shadow-sm ${typeSelected === d.type ? 'bg-secondary-BG border-secondary' : ''}`}>
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
            <Text className="text-right font-pbold">Tháng 5/2024</Text>
          </View>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={dateList}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity
                  activeOpacity={0.7}
                  disabled={index === 0}
                  className={`relative mx-3 my-4 gap-2 rounded-lg p-4 shadow-sm ${item.isSelected ? 'bg-secondary' : ''}`}
                  onPress={() => toggleSelectDate(index)}>
                  {index === 0 && (
                    <View className="absolute left-[50%] top-0 h-4 w-4 translate-x-1/2 translate-y-[-8px] rounded-full bg-primary"></View>
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
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default workTime;
