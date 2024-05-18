import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { BottomSheet } from '@rneui/themed';

export interface CustomConfirmBottomSheetProp {
  buttonContent: React.ReactNode;
  title: string;
  body: React.ReactNode;
  onCancelPressed?: () => {};
  onAgreePressed?: () => {};
}

const CustomConfirmBottomSheet = ({
  buttonContent,
  title,
  body,
  onCancelPressed,
  onAgreePressed,
}: CustomConfirmBottomSheetProp) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleOnCancelPressed = () => {
    setIsVisible(false);
    onCancelPressed?.();
  };

  const handleOnAgreePressed = () => {
    setIsVisible(false);
    onAgreePressed?.();
  };

  return (
    <View>
      <TouchableOpacity onPress={() => setIsVisible(true)}>{buttonContent}</TouchableOpacity>
      <BottomSheet isVisible={isVisible}>
        <View className="bg-white p-6 pb-10">
          <Text className="flex-1 p-2 text-center align-middle font-psemibold text-lg">
            {title}
          </Text>
          <View className="mt-4">{body}</View>
          <View className="mt-6 flex-row justify-center gap-6">
            <TouchableOpacity
              onPress={handleOnCancelPressed}
              className="flex-1 rounded-lg bg-gray-F6  py-3  shadow-md">
              <Text className="w-full text-center font-psemibold text-base text-gray-600">Hủy</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleOnAgreePressed}
              className="bg-green-B1 flex-1 rounded-lg py-3  shadow-md">
              <Text className="w-full text-center font-psemibold text-base text-white">Đồng ý</Text>
            </TouchableOpacity>
          </View>
        </View>
      </BottomSheet>
    </View>
  );
};

export default CustomConfirmBottomSheet;
