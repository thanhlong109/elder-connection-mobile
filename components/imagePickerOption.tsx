import { AntDesign, Entypo, MaterialIcons } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Card, Modal, Text, View } from 'react-native-ui-lib';
import colors from '~/constants/colors';
import * as ImagePicker from 'expo-image-picker';

export interface ImagePickerOptionProps {
  onImageSelected: (img: ImagePicker.ImagePickerAsset) => void;
  buttonContent: React.ReactNode;
  aspect?: [number, number] | undefined;
}

enum PickerMode {
  CAMERA,
  GALLERY,
}

const ImagePickerOption = ({ onImageSelected, buttonContent, aspect }: ImagePickerOptionProps) => {
  const [image, setImgae] = useState<ImagePicker.ImagePickerAsset | undefined>(undefined);
  const [visible, setVisible] = useState(false);
  const uploadImage = async (mode: PickerMode) => {
    try {
      let result: ImagePicker.ImagePickerResult | undefined = undefined;
      if (mode === PickerMode.CAMERA) {
        await ImagePicker.requestCameraPermissionsAsync();
        result = await ImagePicker.launchCameraAsync({
          cameraType: ImagePicker.CameraType.front,
          allowsEditing: true,
          aspect,
          quality: 1,
        });
      } else {
        await ImagePicker.requestCameraPermissionsAsync();
        result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect,
          quality: 1,
        });
      }

      if (!result?.canceled) {
        await saveImage(result.assets[0]);
      }
    } catch (error: any) {
      alert('Lỗi tải ảnh: ' + error.message);
      setVisible(false);
    }
  };
  const saveImage = async (image: ImagePicker.ImagePickerAsset) => {
    try {
      setImgae(image);
      onImageSelected(image);
      setVisible(false);
    } catch (error) {}
  };

  return (
    <>
      <TouchableOpacity onPress={() => setVisible(true)}>{buttonContent}</TouchableOpacity>
      <Modal animationType="slide" visible={visible} transparent>
        <View className=" h-full w-full bg-[rgba(0,0,0,0.3)]">
          <View className="m-auto mx-6 !rounded-xl bg-white p-6">
            <Text center className="mb-6 font-psemibold text-lg text-textPrimary ">
              Chọn ảnh từ
            </Text>
            <View row className="justify-around">
              <TouchableOpacity
                onPress={() => uploadImage(PickerMode.CAMERA)}
                className="!rounded-xl bg-gray-200 p-4">
                <View centerH className="gap-1">
                  <AntDesign name="camerao" size={24} color={colors.secondary.DEFAULT} />
                  <Text className="font-pregular text-[#333]">Máy ảnh</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => uploadImage(PickerMode.GALLERY)}
                className="!rounded-xl bg-gray-200 p-4">
                <View centerH className="gap-1">
                  <Entypo name="images" size={24} color={colors.secondary.DEFAULT} />
                  <Text className="font-pregular text-[#333]">Thư viện</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setVisible(false)}
                className="!rounded-xl bg-gray-200 p-4">
                <View centerH className="gap-1">
                  <MaterialIcons name="cancel" size={24} color="#777" />
                  <Text className="font-pregular text-[#333]">Hủy</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default ImagePickerOption;
