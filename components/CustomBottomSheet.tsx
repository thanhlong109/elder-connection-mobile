import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { BottomSheet } from '@rneui/themed';
import { AntDesign } from '@expo/vector-icons';

export interface CustomBottomSheetProps {
  startIcon: React.ReactNode;
  endIcon: React.ReactNode;
  showItems: React.ReactNode;
  title: string;
}

const CustomBottomSheet = ({ endIcon, startIcon, title, showItems }: CustomBottomSheetProps) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <View>
      <TouchableOpacity
        onPress={() => setIsVisible(true)}
        className="mt-4 flex-row gap-3 rounded-lg bg-gray-F6 p-4">
        <View className="bg-green-B1 h-[40px] w-[40px] items-center justify-center rounded-full">
          {startIcon}
        </View>
        <Text className="flex-1 align-middle font-bold text-textPrimary">{title}</Text>
        <View className="items-center justify-center">{endIcon}</View>
      </TouchableOpacity>
      <BottomSheet isVisible={isVisible}>
        <View className=" bg-white p-6 pb-10">
          <View className="mb-4 flex-row gap-2 align-middle">
            <Text className="flex-1 justify-center p-2 text-center font-psemibold text-lg">
              Những công việc làm
            </Text>
            <TouchableOpacity onPress={() => setIsVisible(false)} className="p-2">
              <AntDesign name="close" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <View>{showItems}</View>
        </View>
      </BottomSheet>
    </View>
  );
};

export default CustomBottomSheet;
