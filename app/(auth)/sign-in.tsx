import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Container } from '~/components/Container';
import { Link, router } from 'expo-router';
import FormField from '~/components/FormField';
import { AntDesign } from '@expo/vector-icons';
import CustomButton from '~/components/CustomButton';
import images from '~/constants/images';
import Animated, { FadeInDown, FadeInLeft, FadeInRight } from 'react-native-reanimated';
import { JwtDecoded, SignInRequest, SignInRespone } from '~/types/auth.type';
import LoadingModel from '~/components/LoadingModel';
import { useSignInMutation } from '~/services/accountApi';
import { useDispatch } from 'react-redux';
import { setSignInRespone } from '~/slices/accountSlice';
import { jwtDecode } from 'jwt-decode';
import Toast from 'react-native-simple-toast';
import { Role } from '~/enums';

const SignIn = () => {
  const dispatch = useDispatch();
  const [form, setform] = useState<SignInRequest>({
    accountEmail: '',
    accountPassword: '',
  });
  const [eror, seteror] = useState('');
  const [signIn, { isError, isLoading, isSuccess, data, error }] = useSignInMutation();

  useEffect(() => {
    if (isSuccess && data) {
      if (data.status == 401) {
        seteror(
          'Email xác nhận đã được gửi đến tài khoản email bạn đã đăng ký, vui lòng xác thực tài khoản để đăng nhập!'
        );
      } else {
        let tranform: SignInRespone = {
          expired: '',
          jwtRefreshToken: '',
          jwtToken: '',
          accountId: '',
        };
        if (
          'jwtToken' in data &&
          'expired' in data &&
          'jwtRefreshToken' in data &&
          'accountId' in data
        ) {
          tranform.expired = data.expired as string;
          tranform.jwtRefreshToken = data.jwtRefreshToken as string;
          tranform.jwtToken = data.jwtToken as string;
          tranform.accountId = data.accountId as string;
        }
        const decoded = jwtDecode<JwtDecoded>(tranform.jwtToken);
        if (
          decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] === Role.CUSTOMER
        ) {
          dispatch(setSignInRespone(tranform));
          router.push('/home');
        } else {
          Toast.show(
            'Ứng dụng này chỉ được đăng nhập tài khoản khách hàng, bạn vui lòng tải ứng dụng Elder Connector để đăng nhập nhé!',
            Toast.LONG
          );
        }
        // dispatch(setSignInRespone(tranform));
        // router.push('/home');
      }
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      seteror('Tên đăng nhập hoặc mật khẩu không đúng!');
      seteror((error as any).message);
    }
  }, [isError]);

  const handleOnSubmit = () => {
    seteror('');
    console.log(form);
    signIn(form);
  };

  return (
    <>
      <Container style="justify-end relative">
        <Animated.Image
          entering={FadeInLeft.delay(200).duration(1000).springify()}
          source={images.bgShapes.bgShapes1}
          resizeMode="contain"
          className="absolute left-0 top-[-200px] w-[55%]"
        />
        <Animated.Image
          entering={FadeInRight.duration(1000).springify()}
          source={images.bgShapes.bgShapes2}
          resizeMode="contain"
          className="absolute right-0 top-0 w-[35%]"
        />

        <View className="mb-[10%] justify-end p-6">
          <Animated.Text
            entering={FadeInDown.duration(1000).springify()}
            className="mb-5 font-psemibold text-4xl text-primary">
            Đăng Nhập
          </Animated.Text>

          <Animated.View entering={FadeInDown.delay(200).duration(1000).springify()}>
            <FormField
              handleChangeText={(value) => setform({ ...form, accountEmail: value })}
              value={form.accountEmail}
              placeholder="Nhập địa chỉ email"
            />
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(400).duration(1000).springify()}>
            <FormField
              handleChangeText={(value) => setform({ ...form, accountPassword: value })}
              value={form.accountPassword}
              secureTextEntry
              placeholder="Nhập mật khẩu"
            />
          </Animated.View>

          <Text className="mt-5 font-pregular text-base !text-red-500">{eror}</Text>

          <Animated.View entering={FadeInDown.delay(600).duration(1000).springify()}>
            <CustomButton
              title="Đăng Nhập"
              containerStyles="mt-[40px] bg-secondary"
              handlePress={handleOnSubmit}
            />
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(800).duration(1000).springify()}>
            <Link href={{ pathname: '/sign-up' }} className="mx-auto mt-7">
              <View className="flex-row items-center">
                <Text className="text-center font-pregular text-textPrimary">
                  Chưa có tài khoản? đăng ký ngay
                </Text>
                <View className="ml-2 rounded-full bg-secondary p-[10px]">
                  <AntDesign name="arrowright" size={16} color="#fff" />
                </View>
              </View>
            </Link>
          </Animated.View>
        </View>
        <LoadingModel isloading={isLoading} />
      </Container>
    </>
  );
};

export default SignIn;
