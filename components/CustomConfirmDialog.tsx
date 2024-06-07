import { AntDesign, FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { Pressable } from 'react-native';
import { Button, Modal, Text, View } from 'react-native-ui-lib';
import colors from '~/constants/colors';
import { DialogType } from '~/enums';

export interface CustomConfirmDialogProps {
  visble: boolean;
  message: string;
  onCancelPress: () => void;
  cancelLable?: string;
  onConfirmPress: () => void;
  confirmLable?: string;
  title?: string;
  cancelButtonStyle?: string;
  confirmButtonStyle?: string;
}

const CustomConfirmDialog = ({
  visble,
  title = 'Xác nhận',
  message,
  onCancelPress,
  onConfirmPress,
  cancelLable = 'Hủy',
  confirmLable = 'Xác nhận',
  cancelButtonStyle,
  confirmButtonStyle,
}: CustomConfirmDialogProps) => {
  return (
    <Modal animationType="slide" visible={visble} transparent>
      <View className=" h-full w-full bg-[rgba(0,0,0,0.3)]">
        <View className="m-auto mx-6 !rounded-xl bg-white p-6">
          <View>
            <View center className="gap-6">
              <FontAwesome name="warning" size={50} color={colors.Type.warning} />
              <View className="gap-2">
                <Text center className="font-pbold text-xl !text-[#333]">
                  {title}
                </Text>
                <Text center className="font-pregular !text-[#7b7b7b]">
                  {message}
                </Text>
              </View>
              <View row className="w-full justify-around">
                <Button
                  className={`!rounded-lg !bg-gray-300 ${cancelButtonStyle}`}
                  onPress={onCancelPress}>
                  <Text className="font-psemibold text-base !text-gray-800">{cancelLable}</Text>
                </Button>
                <Button
                  backgroundColor={colors.Type.warning}
                  className={`!rounded-lg ${confirmButtonStyle}`}
                  onPress={onConfirmPress}>
                  <Text className="font-psemibold text-base !text-white">{confirmLable}</Text>
                </Button>
              </View>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CustomConfirmDialog;
