import React from 'react';
import { Modal, ProgressBar, Text, View } from 'react-native-ui-lib';
import { UploadingStatus } from '~/utils/uploadMedia';
import colors from '~/constants/colors';

interface UploadStatuProps {
  uploadStatus: UploadingStatus;
}

const UploadStatus = ({ uploadStatus }: UploadStatuProps) => {
  const { progress, state } = uploadStatus;

  return (
    <Modal animationType="slide" visible={state === 'running'} transparent>
      <View className=" h-full w-full bg-[rgba(0,0,0,0.3)]">
        <View className="m-auto mx-6 !rounded-xl bg-white p-6">
          <Text className="font-pregular">Đang tải ảnh lên: {progress.toFixed(2)}%</Text>
          <ProgressBar
            fullWidth
            progress={Math.ceil(progress)}
            style={{ height: 10, marginTop: 10 }}
            progressColor={Math.ceil(progress) >= 99 ? colors.green.B1 : undefined}
          />
        </View>
      </View>
    </Modal>
  );
};

export default UploadStatus;
