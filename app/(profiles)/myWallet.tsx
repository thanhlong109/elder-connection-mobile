import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import LottieView from 'lottie-react-native';
import images from '~/constants/images';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import Animated, { FadeInDown } from 'react-native-reanimated';
import Transaction from '~/components/Transaction';
import Divider from '~/components/Divider';

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
      <StatusBar backgroundColor="#48F2DD" />
      <View className="h-full bg-white">
        <LinearGradient colors={['#48F2DD', '#FFF']} className="h-1/3">
          <LottieView
            style={{ flex: 1, width: 'auto', height: '100%' }}
            autoPlay
            renderMode="SOFTWARE"
            source={require('../../assets/animations/wallet_bg_amin.json')}
            resizeMode="contain"
          />
        </LinearGradient>

        <View className="flex-row border-b-[1px] border-gray-C5 bg-white px-4 py-6">
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
              {
                id: 1,
                title: 'Thanh toán dịch vụ',
                isSend: false,
                time: new Date(),
                transaction: '-800,000đ',
                walletAmount: '200,000đ',
              },
              {
                id: 2,
                title: 'Nạp tiền vào ví ',
                isSend: true,
                time: new Date(),
                transaction: '+100,000đ',
                walletAmount: '1,000,000đ',
              },
            ]}
            renderItem={({ index, item }) => (
              <Animated.View
                entering={FadeInDown.delay(index * 200)
                  .duration(1000)
                  .springify()}
                key={index}>
                <Transaction
                  isSend={item.isSend}
                  time={item.time}
                  title={item.title}
                  transaction={item.transaction}
                  walletAmount={item.walletAmount}
                  containerStyle={index % 2 == 0 ? 'bg-white' : 'bg-[#EFFBFA]'}
                />
              </Animated.View>
            )}
          />
        )}
        {active === menu[0].id && (
          <Animated.View
            entering={FadeInDown.duration(1000).springify()}
            className="flex-1 bg-white p-6">
            <View className="rounded-lg border-[1px] border-gray-C5">
              <View className="p-4">
                <Text className="mb-2 font-pregular">Số tiền trong tài khoản</Text>
                <View className="flex-row justify-around ">
                  <Text className="h-full items-center text-center align-middle text-2xl text-[#006D60]">
                    10,000,000đ
                  </Text>
                  <Image
                    source={images.Icons.Eicon}
                    className="h-[50px] w-[50px]"
                    resizeMode="contain"
                  />
                </View>
              </View>
              <Divider />
              <View className="w-full px-8 py-4">
                <TouchableOpacity>
                  <Text className="self-end font-psemibold text-secondary">Nạp thêm</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Animated.View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default myWallet;
