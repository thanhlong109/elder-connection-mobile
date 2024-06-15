import React, { memo } from 'react';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Text, TouchableOpacity, View } from 'react-native-ui-lib';
import { useDispatch, useSelector } from 'react-redux';
import { ServiceType } from '~/enums';
import { setServiceType } from '~/slices/serviceBookingSlice';
import { RootState } from '~/store';

const dateData = [
  {
    title: 'Theo buổi',
    des: 'Thời gian làm việc tối đa 4 giờ/ngày',
    type: ServiceType.SERVICE_4,
  },
  {
    title: 'Theo ngày',
    des: 'Thời gian làm việc tối đa 8 giờ/ngày',
    type: ServiceType.SERVICE_8,
  },
];

const SelectServiceType = () => {
  const serviceBooking = useSelector((state: RootState) => state.serviceBooking.uiData);
  const { serviceType, packageType } = serviceBooking.post;
  const dispatch = useDispatch();
  return (
    <View>
      <Animated.Text
        entering={FadeInDown.duration(1000).springify()}
        className="mb-4 font-psemibold text-xl">
        Thời lượng
      </Animated.Text>
      {dateData.map((d, index) => (
        <Animated.ScrollView
          entering={FadeInDown.delay(index * 200)
            .duration(1000)
            .springify()}
          key={index}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => dispatch(setServiceType(d.type))}
            className={`my-2 gap-1 rounded-md border-[1px] border-gray-300 p-4  ${serviceType === d.type ? '!border-secondary bg-secondary-BG' : ''}`}>
            <Text
              className={`font-psemibold text-lg ${serviceType === d.type ? '!text-secondary' : ''}`}>
              {d.title}
            </Text>
            <Text className="font-pregular">{d.des} </Text>
          </TouchableOpacity>
        </Animated.ScrollView>
      ))}
    </View>
  );
};

export default memo(SelectServiceType);
