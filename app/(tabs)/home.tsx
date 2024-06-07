import { View, Text, ImageBackground, Image } from 'react-native';
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
      console.log('de');
    }
  }, [isGetUserSuccess, userData]);

  useEffect(() => {
    if (isGetUserError) {
      console.log('error load user:', getUserError);
    }
  }, [isGetUserError]);

  //-------------------------- end load user account infor ------------------------------//

  useEffect(() => {
    refetchGetUser();
  }, [account.id]);

  return (
    <Container style="item-center relative">
      <LoadingModel isloading={isGetUserLoading} />

      <ImageBackground
        source={images.bgShapes.bgShapes3}
        className="absolute h-[150px] w-full"
        resizeMode="contain"
      />
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
              <Text className="h-full align-middle font-pregular">{account.walletBalance}đ</Text>
            </View>
            <View className="h-full w-[1px] bg-gray-C5" />
            <View className="flex-1 flex-row items-center justify-around px-4 py-4">
              <Text className="h-full align-middle font-pregular">Nạp tiền</Text>
              <AntDesign name="right" size={24} color="#37474F" />
            </View>
          </View>
        </Animated.View>
      </View>
      <View className="px-6">
        <Animated.Text entering={FadeInDown.duration(1000).springify()} className="font-psemibold">
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
              icon={<Image tintColor={'#fff'} source={e.img} className="h-full w-full" />}
            />
          ))}
        </Animated.View>
      </View>
    </Container>
  );
};

export default home;
