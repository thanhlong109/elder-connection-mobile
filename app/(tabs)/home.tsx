import { View, Text, ImageBackground, Image, TouchableOpacity, ScrollView } from 'react-native';
import React, { useEffect } from 'react';
import { Container } from '~/components/Container';
import images from '~/constants/images';
import { AntDesign } from '@expo/vector-icons';
import CustomIconButton from '~/components/CustomIconButton';
import { UtilListItems } from '~/constants/menus';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import Divider from '~/components/Divider';
import { useAccountDetailsQuery } from '~/services/accountApi';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '~/store';
import LoadingModel from '~/components/LoadingModel';
import { setAccountDetails } from '~/slices/accountSlice';
import { router } from 'expo-router';
import ErrorModel from '~/components/ErrorModel';
import { formatNumberToMoney } from '~/utils/formater';
import { setServicePackage } from '~/slices/serviceBookingSlice';
import { ServicePackageType } from '~/enums';
import Toast from 'react-native-simple-toast';
import { Card, Carousel } from 'react-native-ui-lib';
import { useGetAllSaleQuery } from '~/services/serviceApi';

const home = () => {
  const dispatch = useDispatch();
  const account = useSelector((state: RootState) => state.accountSlice.account);
  //-------------------------- start load user account infor ------------------------------//
  const {
    data: userData,
    isLoading: isGetUserLoading,
    isSuccess: isGetUserSuccess,
    isError: isGetUserError,
    error: getUserError,
    refetch: refetchGetUser,
  } = useAccountDetailsQuery(account.id);

  useEffect(() => {
    if (isGetUserSuccess && userData) {
      dispatch(setAccountDetails(userData.result));
    }
  }, [isGetUserSuccess, userData]);

  useEffect(() => {
    if (isGetUserError) {
      console.log('error load user:', getUserError);
    }
  }, [isGetUserError]);

  //-------------------------- end load user account infor ------------------------------//

  //-------------------------- start load sale ------------------------------//

  const { isError, isLoading, isSuccess, data, error } = useGetAllSaleQuery();

  useEffect(() => {
    if (isSuccess && data.result) {
      console.log(data);
    }
  }, [isSuccess]);

  useEffect(() => {
    console.log(error);
  }, [isError]);

  //-------------------------- end load sale ------------------------------//

  useEffect(() => {
    refetchGetUser();
  }, [account.id]);

  const onPress = (id: number) => {
    switch (id) {
      case 1: {
        dispatch(setServicePackage(ServicePackageType.DAILY));
        break;
      }
      case 2: {
        dispatch(setServicePackage(ServicePackageType.MONTHLY));
        break;
      }
      case 3: {
        Toast.show('Tính năng đang trong quá trình phát triển!', Toast.SHORT);
        break;
      }
      case 4: {
        router.push('myWallet');
        break;
      }
      case 5: {
        Toast.show('Tính năng đang trong quá trình phát triển!', Toast.SHORT);
        break;
      }
    }
  };
  return (
    <Container style="item-center relative">
      <LoadingModel isloading={isGetUserLoading || isLoading} />
      <ErrorModel isError={isGetUserError} onReload={() => refetchGetUser()} />
      <ImageBackground
        source={images.bgShapes.bgShapes3}
        className="absolute h-[150px] w-full"
        resizeMode="contain"
      />
      <ScrollView>
        <View className="pb-20">
          <View className="p-6">
            <Animated.Text
              entering={FadeInDown.delay(200).duration(1000).springify()}
              className="mt-4 font-psemibold text-lg text-white">
              Xin Chào {account.lastName}
            </Animated.Text>
            <Animated.View
              entering={FadeInUp.duration(1000).springify()}
              className="mt-4 w-full  rounded-lg bg-white shadow-md">
              <Text className="px-6 py-4 font-pregular text-primary">
                Khám phá và trải nghiệm dịch vụ chăm sóc ngay hôm nay.
              </Text>
              <Divider />
              <View className="w-full flex-row">
                <View className="flex-1 flex-row items-center justify-around px-4 py-4">
                  <Image
                    source={images.Icons.Eicon}
                    className="h-[25px] w-[25px]"
                    resizeMode="contain"
                  />
                  <Text className="h-full align-middle font-bold !text-secondary">
                    {formatNumberToMoney(parseFloat(account.walletBalance))}
                  </Text>
                </View>
                <View className="h-full w-[1px] bg-gray-C5" />
                <TouchableOpacity
                  onPress={() => router.push('addCoins')}
                  className="flex-1 flex-row items-center justify-around px-4 py-4">
                  <Text className="h-full align-middle font-plight">Nạp tiền</Text>
                  <AntDesign name="right" size={24} color="#37474F" />
                </TouchableOpacity>
              </View>
            </Animated.View>
          </View>
          {data && data.result && (
            <View className="">
              <Carousel
                animated
                pagingEnabled
                autoplay
                loop
                className=""
                pageControlPosition="under">
                {data.result.items.map((item, index) => (
                  <View key={index} className="px-6 py-2">
                    <Card enableShadow elevation={5} className="max-h-[150px] w-[150px] p-4" center>
                      <View className="flex flex-row gap-3">
                        <View className="flex-1 justify-around">
                          <Text className="font-pmedium text-lg">{item.saleName}</Text>
                          <Text className="font-plight text-base">{item.saleDescription}</Text>
                          <View className="self-center rounded-md border-[1px] border-[#f7d0d0] bg-[#F1FAFF] px-4 py-2">
                            <Text className="font-pmedium text-base text-[#E94C4C]">
                              Giảm ngay {item.salePercent}%
                            </Text>
                          </View>
                        </View>
                        <View className="">
                          <Image
                            className="h-[100px] max-h-[100px] w-[80px] max-w-[80px] rounded-md"
                            source={{ uri: item.imageURL }}
                            resizeMode="stretch"
                          />
                        </View>
                      </View>
                    </Card>
                  </View>
                ))}
              </Carousel>
            </View>
          )}

          <View className="px-6">
            <Animated.Text
              entering={FadeInDown.duration(1000).springify()}
              className="font-psemibold">
              Tiện ích
            </Animated.Text>
            <Animated.View
              entering={FadeInDown.delay(200).duration(1000).springify()}
              style={{ flexDirection: 'row', flexWrap: 'wrap' }}
              className="mt-6 flex-row gap-3">
              {UtilListItems.map((e, index) => (
                <CustomIconButton
                  key={index}
                  containerStyle="w-[30%] max-w-[30%]"
                  title={e.title}
                  extend={e?.extend}
                  onPress={() => onPress(e.id)}
                  icon={<Image tintColor={'#fff'} source={e.img} className="h-full w-full" />}
                />
              ))}
            </Animated.View>
          </View>
        </View>
      </ScrollView>
    </Container>
  );
};

export default home;
