import React, { useEffect, useRef, useState } from 'react';
import LottieView from 'lottie-react-native';
import { Button, Modal, Text, View } from 'react-native-ui-lib';

interface ErrorModelProps {
  isError: boolean;
  onReload: () => void;
  message?: string;
}
const defaultErrorMessage = 'Không thể kết nối đến sever, vui lòng thử lại!';
const ErrorModel = ({ isError, onReload, message = defaultErrorMessage }: ErrorModelProps) => {
  const [show, setshow] = useState(true);
  useEffect(() => {
    setshow(isError);
  }, [isError]);
  return (
    <Modal animationType="slide" visible={show} transparent>
      <View center className=" h-full w-full bg-[rgba(0,0,0,0.3)]">
        <View className="mx-10 !rounded-lg !bg-white py-6">
          <Text center className="px-4 font-pbold text-2xl !text-red-400">
            Ops..
          </Text>
          <LottieView
            style={{ width: 'auto', height: 250 }}
            autoPlay
            loop
            renderMode="SOFTWARE"
            source={require('~/assets/animations/opsAnimation.json')}
            resizeMode="contain"
          />
          <Text center className="px-4 font-pregular text-lg !text-red-400">
            {message}
          </Text>
          <View row>
            <Button onPress={onReload} className="mx-4 mt-4 flex-1 !rounded-md !bg-primary">
              <Text className="font-pmedium text-lg !text-white">Thử lại</Text>
            </Button>
            <Button
              backgroundColor={'gray'}
              onPress={() => setshow(false)}
              className=" mx-4 mt-4 !rounded-md">
              <Text className="font-pmedium text-lg !text-white">Hủy</Text>
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ErrorModel;
