import { View, Text, FlatList, Image, Button } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ActionStatus, MenuStatus } from '~/enums';
import images from '~/constants/images';
import CustomButton from '~/components/CustomButton';

const data1 = [
  {
    serviceTile: 'Chăm sóc tại nhà',
    date: '13/03/2024',
    postDate: '01/03/2024',
    serviceType: 'Gói dịch vụ 4h',
    startTime: '08:00',
    img: images.Icons.actionIcon,
    status: ActionStatus.APPROVED,
  },
  {
    serviceTile: 'Chăm sóc tại nhà',
    date: '26/03/2024',
    postDate: '08/03/2024',
    serviceType: 'Gói dịch vụ 4h',
    startTime: '08:00',
    img: images.Icons.actionIcon,
    status: ActionStatus.PENDING,
  },
];
const data2 = [
  {
    serviceTile: 'Chăm sóc tại nhà',
    date: '13/03/2024',
    postDate: '01/03/2024',
    serviceType: 'Gói dịch vụ 4h',
    startTime: '08:00',
    img: images.Icons.actionIcon,
    status: ActionStatus.DONE,
  },
  {
    serviceTile: 'Chăm sóc tại nhà',
    date: '26/03/2024',
    postDate: '08/03/2024',
    serviceType: 'Gói dịch vụ 4h',
    startTime: '08:00',
    img: images.Icons.actionIcon,
    status: ActionStatus.DONE,
  },
];

const nav = [
  {
    title: 'Chờ làm',
    data: data1,
  },
  {
    title: 'Lịch sử',
    data: data2,
  },
];

const action = () => {
  const [data, setData] = useState({
    selected: nav[0].title,
    datalist: nav[0].data,
  });

  return (
    <SafeAreaView>
      <View className="h-full bg-white">
        <FlatList
          data={data.datalist}
          renderItem={({ item, index }) => (
            <View key={index} className="mx-4 my-4 mt-8 rounded-3xl bg-white  p-4 shadow-md">
              <View className="flex-row items-center justify-between ">
                <Image source={item.img} className="h-[60px] w-[60px]" resizeMode="contain" />
                <View>
                  <Text className="font-psemibold">{item.serviceTile}</Text>
                  <Text className="mt-2 font-pregular">Ngày: {item.date}</Text>
                  <Text className="font-pregular">Dịch vụ: {item.serviceType}</Text>
                  <Text className="font-pregular">Bắt đầu: {item.startTime}</Text>
                </View>
                <Text
                  className={`rounded-full ${item.status == ActionStatus.APPROVED ? 'bg-[#468DE0]' : item.status == ActionStatus.DONE ? 'bg-primary' : 'bg-secondary'} p-2 font-pmedium text-sm text-white`}>
                  {item.status}
                </Text>
              </View>
              <Text className="w-full text-right font-pthin text-sm italic">
                Ngày đăng: {item.postDate}
              </Text>
            </View>
          )}
          ListHeaderComponent={() => (
            <View>
              <View className="w-full flex-row border-b-[1px] border-gray-C5 bg-white">
                {nav.map((n) => (
                  <CustomButton
                    key={n.title}
                    handlePress={() => {
                      setData({
                        datalist: n.data,
                        selected: n.title,
                      });
                    }}
                    containerStyles={`${n.title === data.selected ? 'bg-primary' : 'bg-gray-C5'} flex-1 rounded-none`}
                    title={n.title}
                  />
                ))}
              </View>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default action;
