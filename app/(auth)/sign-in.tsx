import { View, Text, Image, ScrollView, ScrollViewBase } from 'react-native';
import React, { useState } from 'react';
import { Container } from '~/components/Container';
import { Link, router } from 'expo-router';
import FormField from '~/components/FormField';
import { SignUpForm } from '~/types/auth.type';
import { AntDesign } from '@expo/vector-icons';
import CustomButton from '~/components/CustomButton';
import images from '~/constants/images';
import Animated, { FadeInDown, FadeInLeft, FadeInRight } from 'react-native-reanimated';

const SignIn = () => {
  const [form, setform] = useState<SignUpForm>({
    email: '',
    password: '',
  });
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
              handleChangeText={(value) => setform({ ...form, email: value })}
              value={form.email}
              placeholder="Nhập địa chỉ email"
            />
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(400).duration(1000).springify()}>
            <FormField
              handleChangeText={(value) => setform({ ...form, password: value })}
              value={form.password}
              secureTextEntry
              placeholder="Nhập mật khẩu"
            />
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(600).duration(1000).springify()}>
            <CustomButton
              title="Đăng Nhập"
              containerStyles="mt-[60px] bg-secondary"
              handlePress={() => router.push('/home')}
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
      </Container>
    </>
  );
};

export default SignIn;
