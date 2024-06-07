import React, { useEffect, useState } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Avatar,
  Button,
  Card,
  DateTimePicker,
  RadioButton,
  RadioGroup,
  Text,
  TextField,
  View,
} from 'react-native-ui-lib';
import { Gender, MODE } from '~/enums';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { AntDesign, Feather, FontAwesome, Fontisto, Ionicons } from '@expo/vector-icons';
import colors from '~/constants/colors';
import { router } from 'expo-router';
import { useSelector } from 'react-redux';
import { RootState } from '~/store';
import ImagePickerOption from '~/components/imagePickerOption';
import { UploadingStatus, uploadFiles } from '~/utils/uploadMedia';
import * as ImagePicker from 'expo-image-picker';
import { UpdateAccountRequest } from '~/types/auth.type';
import { containSpaceRegex } from '~/regex';
import { useUpdateAccountMutation } from '~/services/accountApi';
import LoadingModel from '~/components/LoadingModel';
import UploadStatus from '~/components/UploadStatus';

const PersonInfor = () => {
  const account = useSelector((state: RootState) => state.accountSlice.account);
  const [uploadStatus, setUploadStatus] = useState<UploadingStatus>({ progress: 0, state: 'none' });
  const [avatar, setavatar] = useState<ImagePicker.ImagePickerAsset | undefined>(undefined);
  const [currentMode, setcurrentMode] = useState(MODE.VIEW);
  const [updateForm, setupdateForm] = useState<UpdateAccountRequest>({ ...account });

  //--------------------- start call api update acc -----------------------//

  const [callUpdateAccount, { isError, isLoading, isSuccess, error }] = useUpdateAccountMutation();

  useEffect(() => {
    if (isSuccess) {
      setcurrentMode(MODE.VIEW);
      setavatar(undefined);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      alert(error);
    }
  }, [isError]);

  //--------------------- end call api update acc -----------------------//

  useEffect(() => {
    setupdateForm({ ...account });
  }, [account]);

  const updateAvatar = () => {
    if (avatar) {
      uploadFiles({
        images: [avatar],
        floderName: 'users/' + account.id,
        onUploading: (uploadStatus) => setUploadStatus(uploadStatus),
        onUploadSucess: (url) => {
          setUploadStatus({ progress: 100, state: 'success' });
          callUpdateAccount({ ...updateForm, profilePicture: url });
        },
        onUploadFailed: (err) => {
          alert(err);
          setUploadStatus({ ...uploadStatus, state: 'error' });
        },
      });
    }
  };

  const onHeaderIconClick = () => {
    if (currentMode === MODE.VIEW) {
      setcurrentMode(MODE.UPDATE);
    } else {
      handleSave();
    }
  };

  const handleSave = () => {
    if (avatar) {
      updateAvatar();
    } else {
      callUpdateAccount(updateForm);
    }
  };

  return (
    <SafeAreaView>
      <LoadingModel isloading={isLoading} />
      <UploadStatus uploadStatus={uploadStatus} />
      <StatusBar backgroundColor="#4045A3" style="light" />
      <LinearGradient colors={['#4045A3', '#FFF']} className=" h-full w-full">
        <View row className=" items-center justify-between p-6">
          <TouchableOpacity
            onPress={() => router.back()}
            className="h-[48px] w-[48px] items-center justify-center rounded-xl bg-[#858DCB]">
            <AntDesign name="left" size={30} color="#fff" />
          </TouchableOpacity>
          <Text className="font-pbold text-xl !text-white ">Thông tin</Text>
          <TouchableOpacity
            onPress={onHeaderIconClick}
            className="h-[48px] w-[48px] items-center justify-center rounded-xl bg-[#858DCB]">
            {currentMode === MODE.VIEW ? (
              <AntDesign name="edit" size={24} color="#fff" />
            ) : (
              <Feather name="save" size={24} color="#fff" />
            )}
          </TouchableOpacity>
        </View>

        <ScrollView scrollEnabled>
          <View className="mx-6 gap-10 pb-20">
            <Card center backgroundColor="#fff" className=" gap-8 p-6">
              <View className="!rounded-full !bg-gray-C5 p-[2px]">
                {/* avatar */}
                <Avatar
                  animate
                  size={150}
                  source={{
                    uri: avatar?.uri ?? account.profilePicture,
                  }}
                  name={account.lastName}
                  autoColorsConfig={{ defaultColor: colors.gray.F2 }}
                  customRibbon={
                    currentMode === MODE.UPDATE ? (
                      <ImagePickerOption
                        onImageSelected={(e) => setavatar(e)}
                        aspect={[1, 1]}
                        buttonContent={
                          <View className="!rounded-full border-[1px] border-gray-C5 !bg-white  p-4">
                            <AntDesign name="camerao" size={24} color="black" />
                          </View>
                        }
                      />
                    ) : (
                      <></>
                    )
                  }
                />
              </View>
              {currentMode === MODE.VIEW && (
                <View center backgroundColor="#fff" className=" gap-8">
                  {/* name */}
                  <Text className="!text-blue-B1 font-psemibold text-2xl">{`${account.firstName} ${account.lastName}`}</Text>

                  <View className="bg-gray-F2 w-full gap-4 !rounded-lg p-6">
                    {/* phone number */}
                    <View row className="w-full gap-2">
                      <Text className="font-pmedium text-base">Số điện thoại:</Text>
                      <Text flex className="!text-blue-B1 font-plight text-lg">
                        {account.accountPhone}
                      </Text>
                    </View>
                    <View className="h-[1px] w-full !bg-gray-C5" />
                    {/* email */}
                    <View row className="w-full gap-2">
                      <Text className="font-pmedium text-base">Email:</Text>
                      <Text className="!text-blue-B1 font-plight text-sm">
                        {account.accountEmail}
                      </Text>
                    </View>
                    <View className="h-[1px] w-full !bg-gray-C5" />
                    {/* sex */}
                    <View row className="w-full gap-2">
                      <Text className="font-pmedium text-base">Giới tính:</Text>
                      <Text className="!text-blue-B1 font-plight text-lg">
                        {account.sex === Gender.MALE ? 'Nam' : 'Nữ'}
                      </Text>
                    </View>
                    <View className="h-[1px] !w-full bg-gray-C5" />
                    {/* sex */}
                    <View row className="w-full gap-2">
                      <Text className="font-pmedium text-base">Ngày sinh:</Text>
                      <Text className="!text-blue-B1 font-plight text-lg">
                        {new Date(account.birthday).toLocaleDateString()}
                      </Text>
                    </View>
                  </View>
                </View>
              )}

              {/* ------------------------ Update --------------------------- */}
              {currentMode === MODE.UPDATE && (
                <View backgroundColor="#fff" className=" w-full gap-4 p-4">
                  {/* ------------- Update Name ------------ */}
                  <TextField
                    placeholder={'Nhập họ tên của bạn'}
                    fieldStyle={{
                      backgroundColor: '#fff',
                      paddingHorizontal: 16,
                      paddingVertical: 12,
                      borderStyle: 'solid',
                      borderWidth: 1,
                      borderRadius: 4,
                      borderColor: colors.gray.C5,
                    }}
                    labelStyle={{
                      fontFamily: 'Poppins-Medium',
                      marginBottom: 4,
                      fontSize: 17,
                    }}
                    containerStyle={{}}
                    validateOnChange
                    //ref={fullNameRef}
                    label="Họ và tên"
                    onChangeText={(value) => {
                      let nameParts = value.trim().split(' ');
                      let firstName = nameParts[0];
                      let lastName = nameParts.slice(1).join(' ');
                      setupdateForm({ ...updateForm, firstName, lastName });
                    }}
                    value={`${updateForm.firstName} ${updateForm.lastName}`}
                    enableErrors
                    validate={[
                      'required',
                      (value: string) => containSpaceRegex.test(value),
                      (value: string) => value.length > 5,
                    ]}
                    validationMessage={[
                      'Vui lòng không bỏ trống trường này!',
                      'Cần có khoảng trắng giữa họ tên!',
                      'Họ tên cần ít nhất 6 ký tự và',
                    ]}
                    showCharCounter
                    maxLength={50}
                  />

                  {/* ------------- Update Sex ------------ */}
                  <View className=" bg-gray-F2 w-full justify-between py-4">
                    <Text className="font-pmedium text-lg">Giới tính</Text>
                    <RadioGroup
                      initialValue={updateForm.sex}
                      className="mt-3"
                      onValueChange={(value: Gender) =>
                        setupdateForm({ ...updateForm, sex: value })
                      }>
                      <View row className="gap-6">
                        <RadioButton color="#333" value={Gender.MALE} label={'Nam'} />
                        <RadioButton color="#333" value={Gender.FEMALE} label={'Nữ'} />
                        <RadioButton color="#333" value={Gender.ORTHER} label={'Khác'} />
                      </View>
                    </RadioGroup>
                  </View>

                  {/* ------------- Update Phone ------------ */}
                  {/* 
                <TextField
          //ref={phoneRef}
          validateOnChange
          placeholder={'0987654321'}
          fieldStyle={{
            backgroundColor: '#fff',
            padding: 16,
            borderStyle: 'solid',
            borderWidth: 1,
            borderRadius: 4,
            borderColor: colors.gray.C5,
          }}
          labelStyle={{
            fontFamily: 'Poppins-Medium',
            marginBottom: 4,
            color: colors.primary,
            fontSize: 15,
          }}
          value={updateForm.accountPhone}
          label="Số điện thoại"
          onChangeText={(value: string) => setupdateForm({ ...updateForm, accountPhone: value })}
          enableErrors
          validate={[
            'required',
            'number',
            (value: string) => value.length === 11 || value.length === 10,
          ]}
          validationMessage={[
            'Vui lòng không bỏ trống trường này!',
            'Số điện thoại không hợp lệ!',
            'Số điện thoại không hợp lệ!',
          ]}
          maxLength={11}
          showCharCounter
        /> */}
                  {/* ------------- Update bird date ------------ */}

                  <View className=" bg-gray-F2 justify-between py-4">
                    <Text className="mb-2 font-pmedium text-lg">Ngày sinh</Text>
                    <DateTimePicker
                      fieldStyle={{
                        backgroundColor: '#fff',
                        paddingHorizontal: 16,
                        paddingVertical: 12,
                        borderStyle: 'solid',
                        borderWidth: 1,
                        borderRadius: 4,
                        borderColor: colors.gray.C5,
                      }}
                      display="spinner"
                      value={new Date(updateForm.birthday)}
                      placeholder={'23-10-2000'}
                      onChange={(date) =>
                        setupdateForm({ ...updateForm, birthday: date.toISOString() })
                      }
                      mode={'date'}
                    />
                  </View>
                </View>
              )}
            </Card>

            {/* btn change password */}
            {currentMode === MODE.VIEW && (
              <Button className="!bg-red-R1 gap-4 py-4">
                <Fontisto name="unlocked" size={24} color="#fff" />
                <Text className=" font-psemibold text-lg !text-white">Đổi mật khẩu</Text>
              </Button>
            )}

            {/* btn sign out */}
            {currentMode === MODE.VIEW && (
              <Button outline outlineColor={colors.red.R1} outlineWidth={1} className="gap-4 py-4">
                <Fontisto name="unlocked" size={24} color={colors.red.R1} />
                <Text className=" !text-red-R1 font-psemibold text-lg">Đăng xuất</Text>
              </Button>
            )}

            {currentMode === MODE.UPDATE && (
              <Button
                onPress={handleSave}
                backgroundColor={colors.primary}
                className="gap-4 !rounded-lg py-4">
                <Feather name="save" size={24} color="#fff" />
                <Text className=" font-psemibold text-lg !text-white">Lưu thay đổi</Text>
              </Button>
            )}
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default PersonInfor;
