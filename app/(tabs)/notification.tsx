import { FlatList, SafeAreaView, Text, View } from 'react-native';
import React, { useState } from 'react';
import { Entypo } from '@expo/vector-icons';
import { Notification } from '~/types/notification.type';
import { NotificationType } from '~/enums';

const fdata: Notification[] = [
  {
    isRead: false,
    action: '',
    message: 'Bạn đã đăng thành công công việc chăm sóc người cao tuổi',
    notificationId: 1,
    sendDate: new Date(),
    title: 'Thanh toán thành công',
    type: NotificationType.NORMAL,
  },
  {
    isRead: true,
    action: '',
    message: 'meassage 2',
    notificationId: 2,
    sendDate: new Date(),
    title: 'Title message 2',
    type: NotificationType.NORMAL,
  },
];

const notification = () => {
  const [data, setData] = useState<Notification[]>(fdata);
  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 flex-col">
        <View className="border-b-[1px] border-gray-C5 bg-white px-6 py-8">
          <Text className="mt-6 font-psemibold text-2xl">Thông báo</Text>
        </View>
        {data.length > 0 && (
          <FlatList
            data={data}
            renderItem={({ index, item }) => (
              <View className="border-b-[1px] border-gray-C5 bg-white p-6">
                <Text>{item.title}</Text>
                <Text>{item.message}</Text>
              </View>
            )}
            className="h-full"
          />
        )}
        {data.length == 0 && (
          <View className="flex-1 items-center justify-center">
            <Entypo name="bell" size={100} color="#C5C5C5" />
            <Text className="mt-2 font-pregular text-lg text-gray-600">
              Bạn chưa có thông báo nào
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default notification;
