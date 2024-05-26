import { View, Text, TouchableOpacity } from 'react-native';
import React, { useMemo, useRef, useState } from 'react';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';

export interface CustomConfirmBottomSheetProp {
  buttonContent: React.ReactNode;
  title: string;
  body: React.ReactNode;
  onCancelPressed?: () => void;
  onAgreePressed?: () => void;
}

const CustomConfirmBottomSheet = ({
  buttonContent,
  title,
  body,
  onCancelPressed,
  onAgreePressed,
}: CustomConfirmBottomSheetProp) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['25%', '50%', '75%'], []);
  const [isVisible, setIsVisible] = useState(false);

  const handleClosePress = () => {
    setIsVisible(false);
    if (bottomSheetRef.current) {
      bottomSheetRef.current.close();
    }
  };

  const handleOnCancelPressed = () => {
    handleClosePress();
    onCancelPressed?.();
  };

  const handleOnAgreePressed = () => {
    handleClosePress();
    onAgreePressed?.();
  };

  return (
    <View>
      <TouchableOpacity onPress={() => setIsVisible(true)}>{buttonContent}</TouchableOpacity>
      {isVisible && (
        <BottomSheet snapPoints={snapPoints} ref={bottomSheetRef}>
          <BottomSheetView>
            <View className="bg-white p-6 pb-10">
              <Text className="font-psemibold flex-1 p-2 text-center align-middle text-lg">
                {title}
              </Text>
              <View className="mt-4">{body}</View>
              <View className="mt-6 flex-row justify-center gap-6">
                <TouchableOpacity
                  onPress={handleOnCancelPressed}
                  className="bg-gray-F6 flex-1 rounded-lg  py-3  shadow-md">
                  <Text className="font-psemibold w-full text-center text-base text-gray-600">
                    Hủy
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleOnAgreePressed}
                  className="bg-green-B1 flex-1 rounded-lg py-3  shadow-md">
                  <Text className="font-psemibold w-full text-center text-base text-white">
                    Đồng ý
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </BottomSheetView>
        </BottomSheet>
      )}
    </View>
  );
};

export default CustomConfirmBottomSheet;
