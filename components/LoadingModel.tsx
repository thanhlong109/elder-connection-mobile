import React from 'react';

import LottieView from 'lottie-react-native';
import { Modal, View } from 'react-native-ui-lib';

interface LoadingModelProps {
  isloading: boolean;
}

const LoadingModel = ({ isloading }: LoadingModelProps) => {
  return (
    <Modal animationType="slide" visible={isloading} transparent>
      <View center className=" h-full w-full bg-[rgba(0,0,0,0.1)]">
        <LottieView
          style={{ width: 300, height: 300 }}
          autoPlay
          loop
          renderMode="SOFTWARE"
          source={require('~/assets/animations/Loading2.json')}
          resizeMode="contain"
        />
      </View>
    </Modal>
  );
};

export default LoadingModel;
