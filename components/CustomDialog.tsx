import { AntDesign } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';
import React from 'react';
import { Modal, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Text, View } from 'react-native-ui-lib';
import colors from '~/constants/colors';
import { DialogType } from '~/enums';
import { getStringTileDialog } from '~/utils/enumHelper';

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
  transparent?: boolean;
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
  title = getStringTileDialog(type),
  transparent = true,
}: CustomDialogProps) => {
  const handleDismiss = () => {
    setVisible(false);
    onDismiss?.();
  };

  return (
    <Modal animationType="slide" visible={visble} transparent={transparent}>
      <Pressable
        onPress={bgDismissable ? handleDismiss : () => {}}
        className=" h-full w-full bg-[rgba(0,0,0,0.3)]">
        <Pressable className="m-auto mx-6 !rounded-xl bg-white p-6">
          <View>
            <View animated center className="gap-4">
              <LottieView
                style={{ width: 200, height: 200 }}
                autoPlay
                loop={false}
                renderMode="SOFTWARE"
                source={
                  type === DialogType.ERROR
                    ? require('../assets/animations/failedAnim.json')
                    : require('../assets/animations/Success3.json')
                }
                resizeMode="contain"
              />
              <Text
                center
                className={
                  'font-pbold text-xl ' +
                  (type === DialogType.SUCCESS
                    ? '!text-Type-success'
                    : type === DialogType.ERROR
                      ? '!text-Type-error'
                      : type === DialogType.INFO
                        ? '!text-Type-info'
                        : '!text-Type-warning')
                }>
                {title}
              </Text>
              <Text center className="font-pregular !text-[#7b7b7b]">
                {body}
              </Text>
              {showCloseButton && (
                <Button
                  backgroundColor={
                    type === DialogType.SUCCESS ? colors.Type.success : colors.Type.error
                  }
                  onPress={handleDismiss}>
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
