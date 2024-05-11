import { Button, Icon } from '@rneui/base';
import { Stack, Link, router } from 'expo-router';
import { Image, ScrollView, Text, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Container } from '~/components/Container';
import images from '~/constants/images';
import colors from '~/constants/colors';

export default function Home() {
  return (
    <>
      <Container>
        <View className="my-auto max-h-[80%] flex-1 p-6">
          <View className="flex-1">
            <Image
              source={images.bannerStart}
              className="mx-auto h-[230px] w-[200px]"
              resizeMode="contain"
            />
            <View className="mx-auto mt-12 items-center justify-center">
              <Text className="font-psemibold text-3xl text-secondary">
                Elder <Text className="text-primary">Connection</Text>
              </Text>
              <Text className="mx-5 mt-6 text-center font-pregular text-base">
                Hãy để chúng tôi thay bạn chăm sóc người cao tuổi
              </Text>
            </View>
          </View>

          <View>
            <Button
              buttonStyle={{ backgroundColor: colors.primary }}
              title={'Bắt Đầu'}
              type="solid"
              titleStyle={{ paddingVertical: 10, color: colors.buttonTextPrimary }}
              onPress={() => {
                router.push('sign-up');
              }}
              containerStyle={{ marginBottom: 20 }}
            />

            <Link href={{ pathname: '/sign-in' }} className="mx-auto">
              <View className="flex-row items-center">
                <Text className="text-center">Đã có tài khoản đăng nhập ngay</Text>
                <View className="ml-2 rounded-full bg-primary p-[10px]">
                  <AntDesign name="arrowright" size={16} color="#fff" />
                </View>
              </View>
            </Link>
          </View>
        </View>
      </Container>
    </>
  );
}
