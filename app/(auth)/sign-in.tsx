import { View, Text, Image, ScrollView, ScrollViewBase } from 'react-native';
import React, { useState } from 'react';
import { Container } from '~/components/Container';
import { Link, router } from 'expo-router';
import FormField from '~/components/FormField';
import { SignUpForm } from '~/types/auth.type';
import { AntDesign } from '@expo/vector-icons';
import CustomButton from '~/components/CustomButton';
import images from '~/constants/images';
import { ScrollViewStyleReset } from 'expo-router/html';

const SignIn = () => {
  const [form, setform] = useState<SignUpForm>({
    email: '',
    password: '',
  });
  return (
    <>
      <Container style="justify-end relative">
        <Image
          source={images.bgShapes.bgShapes1}
          resizeMode="contain"
          className="absolute left-0 top-[-200px] w-[55%]"
        />
        <Image
          source={images.bgShapes.bgShapes2}
          resizeMode="contain"
          className="absolute right-0 top-0 w-[35%]"
        />
        <View className="mb-[10%] justify-end p-6">
          <Text className="mb-5 font-psemibold text-4xl text-primary">Đăng Nhập</Text>
          <FormField
            handleChangeText={(value) => setform({ ...form, email: value })}
            value={form.email}
            placeholder="Nhập địa chỉ email"
          />

          <FormField
            handleChangeText={(value) => setform({ ...form, password: value })}
            value={form.password}
            secureTextEntry
            placeholder="Nhập mật khẩu"
          />
          <CustomButton
            title="Đăng Nhập"
            containerStyles="mt-[60px] bg-secondary"
            handlePress={() => router.push('/home')}
          />
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
        </View>
      </Container>
    </>
  );
};

export default SignIn;
