//import { Button } from '@rneui/base';
import { Link, router } from 'expo-router';
import { Text, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Container } from '~/components/Container';
import images from '~/constants/images';
import colors from '~/constants/colors';
import Animated, { FadeInDown, FadeInLeft, FadeInRight, FadeInUp } from 'react-native-reanimated';
import CustomButton from '~/components/CustomButton';

export default function Home() {
  return (
    <>
      <Container>
        <View className="my-auto max-h-[80%] flex-1 p-6">
          <View className="flex-1">
            <Animated.Image
              entering={FadeInUp.duration(1000).springify()}
              source={images.bannerStart}
              className="mx-auto h-[230px] w-[200px]"
              resizeMode="contain"
            />
            <View className="mx-auto mt-12 items-center justify-center">
              <View className="flex-row">
                <Animated.Text
                  entering={FadeInLeft.duration(1000).springify()}
                  className="font-psemibold text-secondary text-3xl">
                  Elder{' '}
                </Animated.Text>
                <Animated.Text
                  entering={FadeInRight.duration(1000).springify()}
                  className="font-psemibold text-primary text-3xl">
                  Connection
                </Animated.Text>
              </View>
              <Animated.Text
                entering={FadeInDown.delay(200).duration(1000).springify()}
                className="font-pregular mx-5 mt-6 text-center text-base">
                Hãy để chúng tôi thay bạn chăm sóc người cao tuổi
              </Animated.Text>
            </View>
          </View>

          <View>
            <Animated.View entering={FadeInDown.delay(400).duration(1000).springify()}>
              <CustomButton
                title="Bắt Đầu"
                handlePress={() => router.push('sign-up')}
                containerStyles="mb-5"
              />
            </Animated.View>
            <Animated.View entering={FadeInDown.delay(600).duration(1000).springify()}>
              <Link href={{ pathname: '/sign-in' }} className="mx-auto">
                <View className="flex-row items-center">
                  <Text className="text-center">Đã có tài khoản đăng nhập ngay</Text>
                  <View className="bg-primary ml-2 rounded-full p-[10px]">
                    <AntDesign name="arrowright" size={16} color="#fff" />
                  </View>
                </View>
              </Link>
            </Animated.View>
          </View>
        </View>
      </Container>
    </>
  );
}
