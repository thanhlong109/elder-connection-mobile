import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Entypo } from '@expo/vector-icons';
import colors from '~/constants/colors';
import { router } from 'expo-router';

const selectAddress = () => {
  return (
    <SafeAreaView>
      <View className="h-full bg-white px-4">
        <Text className="mb-8 font-psemibold text-lg">Danh sách địa điểm</Text>
        <View className="flex-row gap-3 rounded-lg p-3 shadow-sm">
          <TouchableOpacity
            className="flex-1 flex-row gap-3"
            onPress={() => router.push('workTime')}>
            <Entypo name="location-pin" size={24} color={colors.secondary.DEFAULT} />
            <View className="flex-1">
              <Text className="font-psemibold text-xl">Ahid Quận 9</Text>
              <Text className="line-clamp-3 font-plight text-lg">
                Căn hộ Vinhomes Golden River Ba Son tọa lạc tại số 2 đường Tôn Đức Thắng, quận 1,
                TP.HCM, Việt Nam
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity className="self-start rounded-full bg-primary p-2">
            <Entypo name="edit" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default selectAddress;
