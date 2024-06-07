import React, { useRef, useState } from 'react';
import { Pressable, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Avatar, AvatarProps, Button, Card, Text, View } from 'react-native-ui-lib';
import { Gender } from '~/enums';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { AntDesign, FontAwesome, Fontisto } from '@expo/vector-icons';
import colors from '~/constants/colors';
import { router } from 'expo-router';
import { useSelector } from 'react-redux';
import { RootState } from '~/store';
import ImagePickerOption from '~/components/imagePickerOption';
import { UploadingStatus, uploadFiles } from '~/utils/uploadMedia';
import * as ImagePicker from 'expo-image-picker';

const PersonInfor = () => {
  const account = useSelector((state: RootState) => state.accountSlice.account);
  const [uploadStatus, setUploadStatus] = useState<UploadingStatus>({ progress: 0, state: 'none' });
  const [avatar, setavatar] = useState<ImagePicker.ImagePickerAsset | undefined>(undefined);

  const updateAvatar = () => {
    if (avatar) {
      uploadFiles({
        images: [avatar],
        floderName: 'users/' + account.id,
        onUploading: (uploadStatus) => setUploadStatus(uploadStatus),
        onUploadSucess: (url) => {
          setUploadStatus({ progress: 100, state: 'success' });
        },
        onUploadFailed: (err) => {
          setUploadStatus({ ...uploadStatus, state: 'error' });
        },
      });
    }
  };
  return (
    <SafeAreaView>
      <StatusBar backgroundColor="#4045A3" style="light" />
      <LinearGradient colors={['#4045A3', '#FFF']} className=" h-full w-full">
        <View row className=" items-center justify-between p-6">
          <TouchableOpacity
            onPress={() => router.back()}
            className="h-[48px] w-[48px] items-center justify-center rounded-xl bg-[#858DCB]">
            <AntDesign name="left" size={30} color="#fff" />
          </TouchableOpacity>
          <Text className="font-pbold text-xl !text-white ">Thông tin</Text>
          <TouchableOpacity className="h-[48px] w-[48px] items-center justify-center rounded-xl bg-[#858DCB]">
            <AntDesign name="edit" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        <ScrollView scrollEnabled>
          <View className="mx-6 gap-10 pb-20">
            <Card center backgroundColor="#fff" className=" gap-8 p-8">
              <View className="!rounded-full !bg-gray-C5 p-[2px]">
                {/* avatar */}
                <Avatar
                  animate
                  size={150}
                  source={{
                    uri: account.profilePicture,
                  }}
                  name={account.lastName}
                  useAutoColors
                  customRibbon={
                    <ImagePickerOption
                      onImageSelected={(e) => setavatar(e)}
                      aspect={[1, 1]}
                      buttonContent={
                        <View className="!rounded-full border-[1px] border-gray-C5 !bg-white  p-4">
                          <AntDesign name="camerao" size={24} color="black" />
                        </View>
                      }
                    />
                  }
                />
              </View>
              {/* name */}
              <Text className="!text-blue-B1 font-psemibold text-2xl">{`${account.firstName} ${account.lastName}`}</Text>

              <View className="bg-gray-F2 w-full gap-4 !rounded-lg p-6">
                {/* phone number */}
                <View row className="w-full justify-between">
                  <Text className="font-pregular text-base">Số điện thoại:</Text>
                  <Text className="!text-blue-B1 font-psemibold text-lg">
                    {account.accountPhone}
                  </Text>
                </View>
                <View className="h-[1px] w-full bg-gray-C5" />
                {/* email */}
                <View row className="w-full justify-between">
                  <Text className="font-pregular text-base">Email:</Text>
                  <Text className="!text-blue-B1 font-psemibold text-sm">
                    {account.accountEmail}
                  </Text>
                </View>
                <View className="h-[1px] w-full bg-gray-C5" />
                {/* sex */}
                <View row className="w-full justify-between">
                  <Text className="font-pregular text-base">Giới tính:</Text>
                  <Text className="!text-blue-B1 font-psemibold text-lg">
                    {account.sex === Gender.MALE ? 'Nam' : 'Nữ'}
                  </Text>
                </View>
                <View className="h-[1px] w-full bg-gray-C5" />
              </View>
            </Card>

            {/* btn change password */}
            <Button className="!bg-red-R1 gap-4 py-4">
              <Fontisto name="unlocked" size={24} color="#fff" />
              <Text className=" font-psemibold text-lg !text-white">Đổi mật khẩu</Text>
            </Button>
            {/* btn sign out */}
            <Button outline outlineColor={colors.red.R1} outlineWidth={1} className="gap-4 py-4">
              <Fontisto name="unlocked" size={24} color={colors.red.R1} />
              <Text className=" !text-red-R1 font-psemibold text-lg">Đăng xuất</Text>
            </Button>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default PersonInfor;
