import { Button, Icon } from '@rneui/base';
import { Stack, Link, router } from 'expo-router';
import { Text, View } from 'react-native';

import { Container } from '~/components/Container';

export default function Home() {
  return (
    <>
      <Container>
        <View className="items-center justify-center">
          <Text className="text-2xl font-bold">Elder Connection</Text>
          <Text className="text-base">Hãy để chúng tôi thay bạn chăm sóc người cao tuổi</Text>
        </View>

        <Button
          title={'Bắt Đầu'}
          type="solid"
          onPress={() => {
            router.push('sign-up');
          }}
        />

        <Link href={{ pathname: '/sign-in' }} className="flex-row items-center justify-center">
          <Text className="text-base">Đã có tài khoản đăng nhập ngay</Text>
        </Link>
      </Container>
    </>
  );
}
