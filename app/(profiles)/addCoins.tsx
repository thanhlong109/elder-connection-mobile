import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { Image } from 'react-native';
import { Button, Text, TextField, TouchableOpacity, View } from 'react-native-ui-lib';
import { useSelector } from 'react-redux';
import LoadingModel from '~/components/LoadingModel';
import { E } from '~/constants/base';
import colors from '~/constants/colors';
import images from '~/constants/images';
import { useTopUpWalletMutation } from '~/services/accountApi';
import { RootState } from '~/store';
import { formatNumberToMoney } from '~/utils/formater';
import * as Linking from 'expo-linking';

const priceList = [100000, 200000, 300000, 500000, 1000000, 2000000];

const addCoins = () => {
  const account = useSelector((state: RootState) => state.accountSlice.account);
  const [nap, setnap] = useState(0);

  //------------------------ call api top up wallet -----------------------------//

  const [callToUpWallet, { isError, isLoading, isSuccess, data, error }] = useTopUpWalletMutation();

  useEffect(() => {
    if (isSuccess && data) {
      Linking.openURL(data.result);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      console.log('error top up wallet:', error);
    }
  }, [isError]);

  //------------------------ end call api top up wallet -----------------------------//

  return (
    <ScrollView style={{ flex: 1 }}>
      <LoadingModel isloading={isLoading} />
      <View className="gap-8 px-6 pb-10 pt-6">
        <View>
          <Text className="mb-1 font-pmedium text-lg">Nạp tiền vào</Text>
          <View
            row
            backgroundColor={colors.primary}
            centerV
            className="gap-2 !rounded-md border-[1px] border-gray-C5 p-2">
            <Image
              className="h-8 w-8"
              resizeMode="contain"
              tintColor={'#fff'}
              source={images.Icons.Eicon}
            />
            <View>
              <Text className="font-pregular text-lg !text-white">Ví ePay</Text>
              <Text className="font-pmedium text-lg !text-white">
                {formatNumberToMoney(parseFloat(account.walletBalance)) + E}
              </Text>
            </View>
          </View>
        </View>
        <View>
          <TextField
            validateOnChange
            placeholder={'0đ'}
            fieldStyle={{
              backgroundColor: '#fff',
              padding: 16,
              borderStyle: 'solid',
              borderWidth: 1,
              borderRadius: 4,
              borderColor: colors.gray.C5,
            }}
            labelStyle={{
              fontFamily: 'Poppins-Medium',
              marginBottom: 4,
              color: '#333',
              fontSize: 15,
            }}
            label="Số tiền cần nạp"
            onChangeText={(value: string) => {
              let d = parseFloat(value);
              isNaN(d) ? setnap(0) : setnap(d);
            }}
            value={'' + nap}
            formatter={(value) => (value ? formatNumberToMoney(parseFloat(value)) + ' VND' : value)}
            enableErrors
            validate={['required', 'number']}
            validationMessage={[
              'Vui lòng không bỏ trống trường này!',
              'Vui lòng nhập số tiền hợp lệ!',
            ]}
            showCharCounter
          />
          <Text className=" font-light italic !text-red-400">Lưu ý: 1 VND = 1 E coin</Text>
        </View>
        <View row className="flex-wrap justify-center gap-3">
          {priceList.map((p, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setnap(p)}
              className={
                'max-w-1/2 w-[40%] !rounded-md border-[1px] p-4 ' +
                (nap == p ? 'border-secondary !bg-secondary-BG' : 'border-gray-C5')
              }
              center>
              <Text
                color={nap == p ? colors.secondary.DEFAULT : '#333'}
                className={'text-lg font-bold'}>
                {formatNumberToMoney(p) + ' VND'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <View>
          <Text className="mb-2 font-pmedium text-lg">Phương thức thanh toán</Text>
          <View className="gap-2 !rounded-md border-[1px] border-gray-C5 p-2">
            <Image
              source={images.logo.vnpayLogo}
              className="h-[50px] w-[200px]"
              resizeMode="contain"
            />
          </View>
          <Text className="mt-1 font-light italic !text-red-400">
            Hiện tại hệ thống chỉ hỗ chợ thanh toán thông qua vnPay, mong quý khách thông cảm!
          </Text>
        </View>
        <Button
          backgroundColor={colors.primary}
          onPress={() => callToUpWallet({ accountId: account.id, amount: nap })}
          className="!rounded-md">
          <Text className="!rounded-md py-1 font-pmedium text-lg !text-white">Nạp ngay</Text>
        </Button>
      </View>
    </ScrollView>
  );
};

export default addCoins;
