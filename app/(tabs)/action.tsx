import { FlatList, Image } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ActionStatus } from '~/enums';
import images from '~/constants/images';
import CustomButton from '~/components/CustomButton';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Button, Text, View } from 'react-native-ui-lib';
import colors from '~/constants/colors';

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
    id: 1,
  },
  {
    title: 'Lịch sử',
    id: 2,
  },
];

const action = () => {
  const [selectedNav, setSelectedNav] = useState(1);

  return (
    <SafeAreaView>
      <View className="h-full bg-white ">
        <View className="border-b-[1px] border-gray-C5 bg-white px-6 pb-6 pt-4">
          <Text className="font-pmedium text-2xl">Hoạt động</Text>
        </View>
        <FlatList
          data={[]}
          // renderItem={({ item, index }) => (
          //   <Animated.View
          //     entering={FadeInDown.delay(index * 200)
          //       .duration(1000)
          //       .springify()}
          //     key={index}
          //     className="mx-4 my-4 mt-8 rounded-3xl bg-white  p-4 shadow-md">
          //     <View className="flex-row items-center justify-between ">
          //       <Image source={item.img} className="h-[60px] w-[60px]" resizeMode="contain" />
          //       <View>
          //         <Text className="font-psemibold">{item.serviceTile}</Text>
          //         <Text className="mt-2 font-pregular">Ngày: {item.date}</Text>
          //         <Text className="font-pregular">Dịch vụ: {item.serviceType}</Text>
          //         <Text className="font-pregular">Bắt đầu: {item.startTime}</Text>
          //       </View>
          //       <Text
          //         className={`rounded-full ${item.status == ActionStatus.APPROVED ? 'bg-[#468DE0]' : item.status == ActionStatus.DONE ? 'bg-primary' : 'bg-secondary'} p-2 font-pmedium text-sm text-white`}>
          //         {item.status}
          //       </Text>
          //     </View>
          //     <Text className="w-full text-right font-pthin text-sm italic">
          //       Ngày đăng: {item.postDate}
          //     </Text>
          //   </Animated.View>
          // )}
          renderItem={() => <></>}
          ListHeaderComponent={() => (
            <View>
              <View row className="w-full  border-b-[1px] border-gray-C5 bg-white">
                {nav.map((n) => (
                  <Button
                    backgroundColor={selectedNav === n.id ? colors.primary : '#E0E0E0'}
                    key={n.id}
                    flex
                    className="!rounded-none"
                    center
                    onPress={() => setSelectedNav(n.id)}>
                    <Text
                      color={selectedNav === n.id ? 'white' : '#333'}
                      className="py-1 font-pregular text-lg">
                      {n.title}
                    </Text>
                  </Button>
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
