import { AntDesign } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';
import React from 'react';
import { Pressable } from 'react-native';
import { Button, Modal, Text, View } from 'react-native-ui-lib';
import colors from '~/constants/colors';
import { DialogType } from '~/enums';

export interface CustomDialogProps {
  type: DialogType;
  body: string;
  visble: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  onDismiss?: () => void;
  bgDismissable?: boolean;
  showCloseButton?: boolean;
  buttonCloseTitle?: string;
  title?: string;
}

const CustomDialog = ({
  body,
  type,
  onDismiss,
  setVisible,
  visble,
  bgDismissable = false,
  showCloseButton = true,
  buttonCloseTitle = 'Đóng',
  title = 'Thành công!',
}: CustomDialogProps) => {
  const handleDismiss = () => {
    setVisible(false);
    onDismiss?.();
  };
  return (
    <Modal animationType="slide" visible={visble} transparent>
      <Pressable
        onPress={bgDismissable ? handleDismiss : () => {}}
        className=" h-full w-full bg-[rgba(0,0,0,0.3)]">
        <Pressable className="m-auto mx-6 !rounded-xl bg-white p-6">
          <View>
            <View center className="gap-4">
              <AntDesign name="checkcircle" size={70} color={colors.Type.success} />
              <Text center className="!text-Type-success font-pbold text-xl">
                {title}
              </Text>
              <Text center className="font-pregular !text-[#7b7b7b]">
                {body}
              </Text>
              {showCloseButton && (
                <Button backgroundColor={colors.Type.success} onPress={handleDismiss}>
                  <Text className="font-psemibold text-base !text-white">{buttonCloseTitle}</Text>
                </Button>
              )}
            </View>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default CustomDialog;
