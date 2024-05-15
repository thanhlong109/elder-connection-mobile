import { View, Text, FlatList, Image, Button } from 'react-native';
import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';
import colors from '~/constants/colors';
import { profileList } from '~/constants/menus';

const profile = () => {
  return (
    <SafeAreaView>
      <FlatList
        data={profileList}
        renderItem={({ item }) => (
          <View className="my-4">
            {item.map((e, index) => (
              <View
                key={index}
                className="my-[2px] flex-row items-center justify-between bg-white p-6">
                <View className="flex-row items-center">
                  <Image source={e.img} className="h-[25px] w-[25px]" resizeMode="contain" />
                  <Text className="ml-4">{e.title}</Text>
                </View>
                <AntDesign name="right" size={24} color="#2D2D2D" />
              </View>
            ))}
          </View>
        )}
        ListHeaderComponent={() => (
          <View className="flex-row items-center justify-between gap-4 bg-white p-6">
            <View className="flex-row items-center gap-4">
              <Image
                resizeMode="cover"
                source={{
                  uri: 'https://lh3.googleusercontent.com/-x-WJ-sxmdj0/AAAAAAAAAAI/AAAAAAAAAAA/ALKGfkn8bHe7DelriE97PP4tJcoAC_Jfbg/photo.jpg?sz=46',
                }}
                className="h-[50px] w-[50px] rounded-full border-[2px] border-gray-400"
              />
              <Text className="my-auto rounded-full bg-secondary px-[16px] py-[10px] text-white">
                Chào, Thắng!
              </Text>
            </View>
            <Link href={{ pathname: 'kkk' }}>
              <View className="rounded-full border-[2px] border-gray-100 bg-[#F8F8F8] p-2">
                <AntDesign name="setting" size={24} color={colors.primary} />
              </View>
            </Link>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default profile;
