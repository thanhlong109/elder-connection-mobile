import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import LottieView from 'lottie-react-native';
import { animations } from '~/constants/animations';
import images from '~/constants/images';
import { LinearGradient } from 'expo-linear-gradient';
import { Divider } from '@rneui/themed';

const menu = [
  {
    id: 1,
    title: 'ePay',
  },
  {
    id: 2,
    title: 'Giao dịch',
  },
];

const myWallet = () => {
  const [active, setActive] = useState(menu[0].id);

  return (
    <SafeAreaView>
      <View className="h-full">
        <LinearGradient colors={['#48F2DD', '#FFF']} className="h-1/3">
          <Image
            source={images.bgShapes.bgShapes5}
            className="h-full w-full"
            resizeMode="contain"
          />
        </LinearGradient>
        <View className="flex-row border-b-[1px] border-gray-F6 bg-white px-4 py-6">
          {menu.map((e) => (
            <TouchableOpacity key={e.id} onPress={() => setActive(e.id)} className="flex-1">
              <Text
                className={` text-center font-psemibold text-lg ${active === e.id ? 'text-[#004CFF]' : 'text-[#666]'}`}>
                {e.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        {active === menu[1].id && (
          <FlatList
            data={[
              { id: 1, title: 'Thanh toán dịch vụ' },
              { id: 2, title: 'Nạp tiền vào ví ' },
            ]}
            renderItem={({ index, item }) => (
              <View key={index}>
                <Text>{item.title}</Text>
              </View>
            )}
          />
        )}
        {active === menu[0].id && (
          <View className="p-6">
            <View>
              <View className="p-4">
                <Text>Số tiền trong tài khoản</Text>
                <View className="flex-row justify-around ">
                  <Text className="text-[#006D60]">10,000,000đ</Text>
                  <Image
                    source={images.Icons.Eicon}
                    className="h-[50px] w-[50px]"
                    resizeMode="contain"
                  />
                </View>
              </View>
              <Divider />
              <View className="p-4">
                <Text>Nạp thêm</Text>
              </View>
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default myWallet;
