import { View, Text } from 'react-native';
import React from 'react';
import { Container } from '~/components/Container';
import { Button } from '@rneui/base';
import { router } from 'expo-router';

const SignIn = () => {
  return (
    <>
      <Container>
        <Text>SignIn</Text>
        <Button title={'Đăng nhập'} type="solid" onPress={() => router.push('/home')} />
      </Container>
    </>
  );
};

export default SignIn;
