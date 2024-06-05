import { View, Text, ScrollView } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { Container } from '~/components/Container';
import { Link, router } from 'expo-router';
import FormField from '~/components/FormField';
import { AntDesign } from '@expo/vector-icons';
import CustomButton from '~/components/CustomButton';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { TextField, TextFieldRef, Toast } from 'react-native-ui-lib';
import { SignUpRequest } from '~/types/auth.type';
import colors from '~/constants/colors';
import { useSignUpMutation } from '~/services/accountApi';

const fullNameRegex = /^(?=.* .{2,}).{6,}$/;
const passwordRegex = /^\S{6,12}$/;

const SignUp = () => {
  const [form, setform] = useState<SignUpRequest>({
    accountEmail: '',
    accountPassword: '',
    accountPhone: '',
    confirmAccountPassword: '',
    firstName: '',
    lastName: '',
  });

  const [signUp, { isLoading, isSuccess, isError, error }] = useSignUpMutation();
  const [showToask, setshowToask] = useState(false);
  const fullNameRef = useRef<TextFieldRef>(null);
  const emailRef = useRef<TextFieldRef>(null);
  const passwordRef = useRef<TextFieldRef>(null);
  const confirmPasswordRef = useRef<TextFieldRef>(null);
  const phoneRef = useRef<TextFieldRef>(null);

  useEffect(() => {
    if (isSuccess) setshowToask(true);
  }, [isSuccess]);

  useEffect(() => {
    if (isError) console.log(error);
  }, [isError]);

  const validateFields = () => {
    const fullNameValid = fullNameRef.current?.validate();
    const emailValid = emailRef.current?.validate();
    const passwordValid = passwordRef.current?.validate();
    const confirmPasswordValid = confirmPasswordRef.current?.validate();
    const phoneValid = phoneRef.current?.validate();
    return fullNameValid && emailValid && passwordValid && confirmPasswordValid && phoneValid;
  };

  const handleSubmit = () => {
    if (validateFields()) signUp(form);
  };

  return (
    <Container style="justify-center  relative">
      <Toast
        visible={showToask}
        position={'top'}
        onDismiss={() => router.push('sign-in')}
        autoDismiss={3000}>
        <Text>Đăng ký tài khoản thành công!</Text>
      </Toast>
      <ScrollView
        contentContainerStyle={{ justifyContent: 'center' }}
        className="max-h-[90%] px-6 ">
        <View className="pb-20 pt-6">
          <Animated.Text
            entering={FadeInUp.duration(1000).springify()}
            className="mb-5 font-psemibold text-4xl text-primary">
            Đăng Ký
          </Animated.Text>
          <View className="gap-6">
            {/* ho ten */}
            <TextField
              placeholder={'Nhập họ tên của bạn'}
              containerStyle={{
                backgroundColor: colors.gray.F2,
                paddingHorizontal: 16,
                paddingVertical: 8,
              }}
              validateOnChange
              ref={fullNameRef}
              label="Họ và tên"
              onChangeText={(value) => {
                let nameParts = value.trim().split(' ');
                let firstName = nameParts[0];
                let lastName = nameParts.slice(1).join(' ');
                setform({ ...form, firstName, lastName });
              }}
              value={`${form.firstName} ${form.lastName}`}
              enableErrors
              validate={['required', (value: string) => fullNameRegex.test(value)]}
              validationMessage={[
                'Vui lòng không bỏ trống trường này!',
                'Họ tên cần ít nhất 6 ký tự và có khoảng trắng giữa họ tên!',
              ]}
              showCharCounter
              maxLength={50}
            />

            {/* phone number */}
            <TextField
              ref={phoneRef}
              validateOnChange
              placeholder={'0987654321'}
              containerStyle={{
                backgroundColor: colors.gray.F2,
                paddingHorizontal: 16,
                paddingVertical: 8,
              }}
              value={form.accountPhone}
              label="Số điện thoại"
              onChangeText={(value: string) => setform({ ...form, accountPhone: value })}
              enableErrors
              validate={[
                'required',
                'number',
                (value: string) => value.length === 11 || value.length === 10,
              ]}
              validationMessage={[
                'Vui lòng không bỏ trống trường này!',
                'Số điện thoại không hợp lệ!',
                'Số điện thoại không hợp lệ!',
              ]}
              maxLength={11}
              showCharCounter
            />
            {/* email */}
            <TextField
              validateOnChange
              ref={emailRef}
              placeholder={'example@gmail.com'}
              containerStyle={{
                backgroundColor: colors.gray.F2,
                paddingHorizontal: 16,
                paddingVertical: 8,
              }}
              value={form.accountEmail}
              label="Email"
              onChangeText={(value: string) => setform({ ...form, accountEmail: value })}
              enableErrors
              validate={['required', 'email']}
              validationMessage={['Vui lòng không bỏ trống trường này!', 'Email không hợp lệ!']}
            />
            {/* password */}
            <TextField
              validateOnChange
              ref={passwordRef}
              placeholder={'Ít nhất 6 ký tự'}
              containerStyle={{
                backgroundColor: colors.gray.F2,
                paddingHorizontal: 16,
                paddingVertical: 8,
              }}
              value={form.accountPassword}
              secureTextEntry
              label="Mật khẩu (để đăng nhập lần sau)"
              onChangeText={(value: string) => setform({ ...form, accountPassword: value })}
              enableErrors
              validate={['required', (value: string) => passwordRegex.test(value)]}
              validationMessage={[
                'Vui lòng không bỏ trống trường này!',
                'Mật khẩu Phải chứa 6-12 ký tự và không có khoảng cách',
              ]}
            />
            {/* password confirm */}
            <TextField
              validateOnChange
              ref={confirmPasswordRef}
              placeholder={'Nhập lại mật khẩu'}
              containerStyle={{
                backgroundColor: colors.gray.F2,
                paddingHorizontal: 16,
                paddingVertical: 8,
              }}
              value={form.confirmAccountPassword}
              secureTextEntry
              label="Xác nhận mật khẩu"
              onChangeText={(value: string) => setform({ ...form, confirmAccountPassword: value })}
              enableErrors
              validate={['required', (value: string) => value === form.accountPassword]}
              validationMessage={['Vui lòng không bỏ trống trường này!', 'Mật khẩu không khớp!']}
            />
          </View>

          <Animated.View entering={FadeInDown.delay(600).duration(1000).springify()}>
            <CustomButton
              title="Đăng Ký"
              containerStyles="mt-[70px] bg-secondary"
              handlePress={handleSubmit}
              isLoading={isLoading}
            />
          </Animated.View>
          <Animated.View entering={FadeInDown.delay(800).duration(1000).springify()}>
            <Link href={{ pathname: '/sign-in' }} className="mx-auto mt-7">
              <View className="flex-row items-center">
                <Text className="text-center text-textPrimary">Đã có tài khoản đăng nhập ngay</Text>
                <View className="ml-2 rounded-full bg-secondary p-[10px]">
                  <AntDesign name="arrowright" size={16} color="#fff" />
                </View>
              </View>
            </Link>
          </Animated.View>
        </View>
      </ScrollView>
    </Container>
  );
};

export default SignUp;
