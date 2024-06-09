import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import LottieView from 'lottie-react-native';
import images from '~/constants/images';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import Animated, { FadeInDown } from 'react-native-reanimated';
import Transaction from '~/components/Transaction';
import Divider from '~/components/Divider';
import { useGetTransactionHistoryQuery, useGetWalletBalanceQuery } from '~/services/accountApi';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '~/store';
import { setWalletRespone } from '~/slices/accountSlice';
import LoadingModel from '~/components/LoadingModel';
import { E } from '~/constants/base';

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
  const accountId = useSelector((state: RootState) => state.accountSlice.account.id);
  const dispatch = useDispatch();
  //-------------------- call api get wallet balance ------------------------------//

  const { data, isSuccess, isLoading, isError, error } = useGetWalletBalanceQuery(accountId);

  useEffect(() => {
    if (data && isSuccess) {
      dispatch(setWalletRespone(data.result));
    }
  }, [data, isSuccess]);

  useEffect(() => {
    if (isError) {
      console.log('error load balance:', error);
      alert('Lỗi không thể load số dư ví!');
    }
  }, [isError]);

  //-------------------- end call api get wallet balance ------------------------------//

  //-------------------- call api get transaction history ------------------------------//

  const {
    data: transactionData,
    isSuccess: isGetTransactionSuccess,
    isLoading: isGetTransactionLoading,
    isError: isGetTransactionError,
    error: transactionError,
  } = useGetTransactionHistoryQuery(accountId);

  useEffect(() => {
    if (isGetTransactionError) {
      console.log('error load balance:', transactionError);
      alert('Lỗi không thể load lịch sử giao dịch!');
    }
  }, [isGetTransactionError]);

  //-------------------- end call api get transaction history ------------------------------//
  return (
    <SafeAreaView>
      <LoadingModel isloading={isLoading || isGetTransactionLoading} />
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
        {active === menu[1].id && isGetTransactionSuccess && (
          <FlatList
            data={transactionData.result.items}
            renderItem={({ index, item }) => (
              <Animated.View
                entering={FadeInDown.delay(index * 200)
                  .duration(1000)
                  .springify()}
                key={index}>
                <Transaction
                  transaction={item}
                  containerStyle={index % 2 == 0 ? '!bg-white' : '!bg-[#EFFBFA]'}
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
                    {isSuccess && data && data.result.walletBalance + ' ' + E}
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
