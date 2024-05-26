import { View, Text, TouchableOpacity } from 'react-native';
import React, { useMemo, useRef } from 'react';
import { AntDesign } from '@expo/vector-icons';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';

export interface CustomBottomSheetProps {
  ref: React.RefObject<BottomSheetMethods>;
  showItems: React.ReactNode;
  bottomSheetTitle: string;
  index?: number;
}

const CustomBottomSheet = ({
  ref,
  showItems,
  bottomSheetTitle,
  index = 0,
}: CustomBottomSheetProps) => {
  const snapPoints = useMemo(() => ['25%', '50%', '75%', '100%'], []);

  return (
    <BottomSheet index={index} snapPoints={snapPoints} ref={ref}>
      <BottomSheetView>
        <View className=" bg-white p-6 pb-10">
          <View className="mb-4 flex-row gap-2 align-middle">
            <Text className="font-psemibold flex-1 justify-center p-2 text-center text-lg">
              {bottomSheetTitle}
            </Text>
            <TouchableOpacity onPress={() => ref.current?.close()} className="p-2">
              <AntDesign name="close" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <View>{showItems}</View>
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
};

export default CustomBottomSheet;
