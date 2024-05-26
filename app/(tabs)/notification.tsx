import { FlatList, SafeAreaView, Text, View } from 'react-native';
import React, { useState } from 'react';
import { Entypo } from '@expo/vector-icons';

const notification = () => {
  const [data, setData] = useState([]);
  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 flex-col">
        <View className="border-b-[1px] border-gray-C5 bg-white px-6 py-8">
          <Text className="font-psemibold text-2xl">Thông báo</Text>
        </View>
        {data.length > 0 && (
          <FlatList
            data={data}
            renderItem={({ index, item }) => <Text>{item}</Text>}
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
