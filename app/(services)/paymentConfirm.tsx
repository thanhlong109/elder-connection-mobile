import { TextInput, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getDateString, getTimeFromDate } from '~/utils/date';
import { DateStringType, DialogType, SERVICE_ID, ServicePackageType, ServiceType } from '~/enums';
import CustomButton from '~/components/CustomButton';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '~/store';
import { getServiceIdByType, getServiceTypeStringEnum, getStringEnum } from '~/utils/enumHelper';
import { Text, TextField, View } from 'react-native-ui-lib';
import colors from '~/constants/colors';
import { setClearBookingState, setPostDescription } from '~/slices/serviceBookingSlice';
import { CreatePostAndScheduleRequest } from '~/types/post.type';
import { useAddPostMutation } from '~/services/postApi';
import LoadingModel from '~/components/LoadingModel';
import CustomDialog from '~/components/CustomDialog';
import { router } from 'expo-router';

const paymentConfirm = () => {
  const serviceBooking = useSelector((state: RootState) => state.serviceBooking.uiData);
  const accountId = useSelector((state: RootState) => state.accountSlice.account.id);
  const [dialogVisible, setDialogVisible] = useState(false);
  const dispatch = useDispatch();
  const {
    address,
    isPriorityFavoriteConnector,
    title,
    postDescription,
    packageType,
    serviceType,
    startTime,
  } = serviceBooking.post;

  const { listDayWork } = serviceBooking.schedule;

  //------------------------ call api add post ---------------------//

  const [callAddpost, { isError, isLoading, isSuccess, error }] = useAddPostMutation();

  useEffect(() => {
    if (isSuccess) {
      setDialogVisible(true);
      dispatch(setClearBookingState());
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      alert(error);
      console.log('error add post: ', error);
    }
  }, [isError]);

  //------------------------ end api add post ---------------------//

  const getWorkDates = (isFormatDate: boolean) => {
    const list = listDayWork.map((date) => {
      if (date.isSelected) {
        const d = new Date(date.date);
        const dateString = isFormatDate
          ? `${getDateString(d.getDay(), DateStringType.SHORT)} - ${d.getDate()}\/${d.getMonth()}`
          : d.toISOString();
        return dateString;
      }
      return '';
    });
    return list.filter((value) => value.trim().length > 0).join(' | ');
  };

  const onSubmit = () => {
    let selectedService = getServiceIdByType(serviceType, packageType);
    const lastIndex = listDayWork.findLastIndex((d) => d.isSelected);
    const endDate = new Date(listDayWork[lastIndex].date);
    const firstIndex = listDayWork.findIndex((d) => d.isSelected);
    const startDate = new Date(listDayWork[firstIndex].date);
    const createPostAndScheduleRequest: CreatePostAndScheduleRequest = {
      jobScheduleCreateViewModel: {
        description: '',
        endDate: endDate.toISOString(),
        listDayWork: getWorkDates(false),
        startDate: startDate.toISOString(),
      },
      postCreateViewModel: {
        addressId: address.addressId,
        customerId: accountId,
        isPriorityFavoriteConnector,
        postDescription: postDescription,
        serviceId: selectedService,
        startTime: getTimeFromDate(startTime),
        title,
      },
    };
    callAddpost(createPostAndScheduleRequest);
  };

  return (
    <SafeAreaView className="h-full">
      <CustomDialog
        visble={dialogVisible}
        body="Bạn đã đăng việc thành công, vui lòng chờ connector nhận việc!"
        setVisible={setDialogVisible}
        type={DialogType.SUCCESS}
        bgDismissable={false}
        buttonCloseTitle="Quay lại trang chủ"
        onDismiss={() => router.push('home')}
      />
      <LoadingModel isloading={isLoading} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="h-full w-full gap-10 px-5 pb-10">
          {/* vi tri lm viec */}
          <View>
            <Animated.Text
              entering={FadeInDown.duration(1000).springify()}
              className="font-psemibold text-lg">
              Vị trí làm việc
            </Animated.Text>
            <Animated.View
              entering={FadeInDown.delay(200).duration(1000).springify()}
              className="mt-5 gap-4 rounded-md border-[1px] border-gray-300 p-4">
              <View className="gap-1">
                <Text className="font-pmedium text-base">{address.addressName}</Text>
                <Text className="line-clamp-1 font-plight text-base text-black/65">
                  {`${getStringEnum(address.homeType)} tại ${address.addressDescription}`}
                </Text>
              </View>
              <View className="gap-1">
                <Text className="font-pmedium text-base">Thông tin liên hệ</Text>
                <View row centerV className="gap-1">
                  <Text className="font-pregular text-base text-black/50">Họ tên:</Text>
                  <Text className="font-plight text-base text-black/50">{address.contactName}</Text>
                </View>
                <View row centerV className="gap-1">
                  <Text className="font-pregular text-base text-black/50">Số điện thoại:</Text>
                  <Text className="font-plight text-base text-black/50">
                    {address.contactPhone}
                  </Text>
                </View>
              </View>
            </Animated.View>
          </View>

          {/* thong tin cong viec */}
          <View>
            <Animated.Text
              entering={FadeInDown.delay(400).duration(1000).springify()}
              className="font-psemibold text-lg ">
              Thông tin công việc
            </Animated.Text>
            <Animated.View
              entering={FadeInDown.delay(600).duration(1000).springify()}
              className="mt-5 gap-6 rounded-md border-[1px] border-gray-300 p-4">
              <View className="gap-2">
                <Text className="font-pmedium text-base">Thời gian làm việc</Text>
                <View className="gap-1">
                  <View className=" justify-between gap-1">
                    <Text className="font-plight text-base  text-black/90">
                      {getWorkDates(true)}
                    </Text>
                  </View>
                  <View className="flex-row  gap-1">
                    <Text className="font-plight text-base text-black/55">Thời gian: </Text>
                    <Text className="font-plight text-base  text-black/90">{`${getServiceTypeStringEnum(serviceType)}, ${getTimeFromDate(startTime)} đến  ${getTimeFromDate(startTime, serviceType)}`}</Text>
                  </View>
                </View>
              </View>

              <View className="gap-1">
                <Text className="font-pmedium text-base">Chi tiết công việc</Text>
                <View className="mt-2 flex-row justify-between gap-10">
                  <Text className="flex-1 font-plight text-base text-black/90">
                    Chăm xóc người cao tuổi tại nhà.
                  </Text>
                </View>
              </View>
            </Animated.View>
          </View>

          {/* Ghi chu */}
          <Animated.View entering={FadeInDown.delay(800).duration(1000).springify()}>
            <Text className="mb-2 font-psemibold text-lg ">Ghi chú cho Connector</Text>
            <TextField
              validateOnChange
              placeholder={'Ghi chú gì đó giúp Connector làm việc tốt hơn.'}
              fieldStyle={{
                backgroundColor: '#fff',
                padding: 16,
                borderStyle: 'solid',
                borderWidth: 1,
                borderRadius: 4,
                borderColor: colors.gray.C5,
              }}
              value={postDescription}
              onChangeText={(value: string) => dispatch(setPostDescription(value))}
              multiline
              maxLength={500}
              showCharCounter
            />
          </Animated.View>
          <Animated.View entering={FadeInDown.delay(1000).duration(1000).springify()}>
            <CustomButton handlePress={onSubmit} title="Đăng việc" containerStyles="!bg-green-B2" />
          </Animated.View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default paymentConfirm;
