import { View, Text } from 'react-native';
import React from 'react';
import { Container } from '~/components/Container';
import { Button } from '@rneui/base';
import { router } from 'expo-router';

const SignUp = () => {
  return (
    <Container>
      <Text>SignUp</Text>
      <Button title={'Đăng ký'} type="solid" onPress={() => router.push('/sign-in')} />
    </Container>
  );
};

export default SignUp;
