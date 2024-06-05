import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Container } from '~/components/Container';
import { Link, router } from 'expo-router';
import FormField from '~/components/FormField';
import { AntDesign } from '@expo/vector-icons';
import CustomButton from '~/components/CustomButton';
import images from '~/constants/images';
import Animated, { FadeInDown, FadeInLeft, FadeInRight } from 'react-native-reanimated';
import { SignInRequest } from '~/types/auth.type';
import LoadingModel from '~/components/LoadingModel';
import { useSignInMutation } from '~/services/accountApi';
import { useDispatch } from 'react-redux';
import { setSignInRespone } from '~/slices/accountSlice';

const SignIn = () => {
  const dispatch = useDispatch();
  const [form, setform] = useState<SignInRequest>({
    accountEmail: '',
    accountPassword: '',
  });
  const [eror, seteror] = useState('');
  const [signIn, { isError, isLoading, isSuccess, data, error, status }] = useSignInMutation();

  useEffect(() => {
    if (isSuccess && data) {
      if (data.status == 401) {
        seteror(
          'Email xác nhận đã được gửi đến tài khoản email bạn đã đăng ký, vui lòng xác thực tài khoản để đăng nhập!'
        );
      } else {
        dispatch(setSignInRespone(data.result));
        router.push('/home');
      }
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      seteror('Tên đăng nhập hoặc mật khẩu không đúng!');
    }
  }, [isError]);

  const handleOnSubmit = () => {
    seteror('');
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
