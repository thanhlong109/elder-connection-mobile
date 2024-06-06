import { View, Text, ScrollView, Pressable } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '~/store';
import { HomeType } from '~/enums';
import { Button, TextField, TextFieldRef, TouchableOpacity } from 'react-native-ui-lib';
import colors from '~/constants/colors';
import { router } from 'expo-router';
import { setAddAddress } from '~/slices/addressSlice';
import { useAddAddressMutation } from '~/services/addressApi';
import LoadingModel from '~/components/LoadingModel';

const homeData = [
  {
    type: HomeType.TOWN_HOUSE,
    title: 'Nhà / Nhà phố',
  },
  {
    type: HomeType.APARTMENT,
    title: 'Căn hộ',
  },
  {
    type: HomeType.MANSION,
    title: 'Biệt thự',
  },
];
const addAddress = () => {
  const accountId = useSelector((state: RootState) => state.accountSlice.account.id);
  const dispatch = useDispatch();
  const form = useSelector((state: RootState) => state.addressSlice.addAdress);

  //---------------------- start call api add address --------------------//

  const [callAddAddress, { isError, isSuccess, isLoading, error }] = useAddAddressMutation();

  useEffect(() => {
    if (isSuccess) {
      router.back();
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      console.log('error add address:', error);
    }
  }, [isError]);

  //---------------------- end call api add address --------------------//

  const phoneRef = useRef<TextFieldRef>(null);
  const addressNameRef = useRef<TextFieldRef>(null);
  const addressDescriptionRef = useRef<TextFieldRef>(null);
  const addressDetailRef = useRef<TextFieldRef>(null);
  const contactNameRef = useRef<TextFieldRef>(null);

  const handleSubmit = () => {
    let isValidPhone = phoneRef.current?.validate();
    let isValidAddressName = addressNameRef.current?.validate();
    let isValidAddressDetail = addressDetailRef.current?.validate();
    let isValidContactName = contactNameRef.current?.validate();
    let isValidDescription = addressDescriptionRef.current?.validate();
    if (
      isValidAddressDetail &&
      isValidAddressName &&
      isValidContactName &&
      isValidPhone &&
      isValidDescription
    ) {
      callAddAddress(form);
    }
  };

  useEffect(() => {
    dispatch(setAddAddress({ ...form, accountId }));
  }, [accountId]);

  return (
    <ScrollView>
      <LoadingModel isloading={isLoading} />
      <View className="gap-8 p-6">
        {/* address name */}
        <TextField
          ref={addressNameRef}
          validateOnChange
          placeholder={'Đặt một cái tên dễ nhớ cho địa chỉ của bạn'}
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
          value={form.addressName}
          label="Tên địa điểm"
          onChangeText={(value: string) => dispatch(setAddAddress({ ...form, addressName: value }))}
          enableErrors
          validate={['required', (value: string) => value.length > 4]}
          validationMessage={['Vui lòng không bỏ trống trường này!', 'Tên quá ngắn!']}
          maxLength={50}
          showCharCounter
        />

        {/* address detail - postion */}
        <Pressable onPress={() => router.push('addLocation')}>
          <TextField
            ref={addressDetailRef}
            validateOnChange
            placeholder={'Bạn chưa chọn vị trí nào'}
            editable={false}
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
            value={form.addressDetail}
            label="Chọn vị trí"
            enableErrors
            validate={['required']}
            validationMessage={['Vui lòng chọn vị trí!']}
            showCharCounter
          />
        </Pressable>

        {/* home type */}
        <View>
          <Text className="font-pmedium text-base !text-primary">Loại nhà</Text>
          <View className="mt-4 gap-3">
            {homeData.map((e) => (
              <TouchableOpacity
                key={e.type}
                activeOpacity={70}
                onPress={() => dispatch(setAddAddress({ ...form, homeType: e.type }))}
                className={`!rounded-md border-[1px] p-6 ${form.homeType === e.type ? 'border-secondary' : 'border-gray-C5'}`}>
                <Text
                  className={`font-pregular text-base ${form.homeType === e.type ? '!text-secondary' : ''}`}>
                  {e.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* address description */}
        <TextField
          ref={addressDescriptionRef}
          validateOnChange
          placeholder={'Số nhà 1, hẻm 2'}
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
          validate={['required', (value: string) => value.trim().length > 10]}
          validationMessage={['Vui lòng không bỏ trống trường này!', 'Thông tin quá ngắn']}
          value={form.addressDescription}
          label="Số nhà, hẻm ngõ"
          onChangeText={(value: string) =>
            dispatch(setAddAddress({ ...form, addressDescription: value }))
          }
          enableErrors
          maxLength={100}
          showCharCounter
        />

        {/* contact name */}
        <TextField
          ref={contactNameRef}
          validateOnChange
          placeholder={'Nguyễn Văn A'}
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
          value={form.contactName}
          label="Họ tên người liên hệ liên hệ"
          onChangeText={(value: string) => dispatch(setAddAddress({ ...form, contactName: value }))}
          enableErrors
          validate={['required', (value: string) => value.trim().length > 5]}
          validationMessage={[
            'Vui lòng không bỏ trống trường này!',
            'vui lòng nhập đầy đủ họ tên!',
          ]}
          maxLength={50}
          showCharCounter
        />

        {/* contact phone */}
        <TextField
          ref={phoneRef}
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
          }}
          value={form.contactPhone}
          label="Số điện thoại liên hệ"
          onChangeText={(value: string) =>
            dispatch(setAddAddress({ ...form, contactPhone: value }))
          }
          enableErrors
          validate={[
            'required',
            'number',
            (value: string) => value.trim().length === 11 || value.trim().length === 10,
          ]}
          validationMessage={[
            'Vui lòng không bỏ trống trường này!',
            'Số điện thoại không hợp lệ!',
            'Số điện thoại không hợp lệ!',
          ]}
          maxLength={11}
          showCharCounter
        />

        <Button
          onPress={handleSubmit}
          fullWidth
          className="!rounded-lg"
          backgroundColor={colors.primary}>
          <Text className="py-2 font-psemibold text-base !text-white">Thêm địa chỉ</Text>
        </Button>
      </View>
    </ScrollView>
  );
};

export default addAddress;
