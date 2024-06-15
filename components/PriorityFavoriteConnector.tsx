import { View, Text, Image, Switch } from 'react-native';
import React, { memo } from 'react';
import Animated, { FadeInDown } from 'react-native-reanimated';
import images from '~/constants/images';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '~/store';
import { setIsPriorityFavoriteConnector } from '~/slices/serviceBookingSlice';
import colors from '~/constants/colors';

const PriorityFavoriteConnector = () => {
  const dispatch = useDispatch();
  const serviceBooking = useSelector((state: RootState) => state.serviceBooking.uiData);
  const isPriorityFavoriteConnector = serviceBooking.post.isPriorityFavoriteConnector;
  const toggleSwitch = () => {
    dispatch(setIsPriorityFavoriteConnector(!isPriorityFavoriteConnector));
  };

  return (
    <View>
      <Animated.View
        entering={FadeInDown.delay(1200).duration(1000).springify()}
        className="mt-4 flex-row items-center justify-between p-4">
        <View className="flex-row items-center gap-4">
          <Image className="h-8 w-8" resizeMode="contain" source={images.Icons.connectorFavorite} />
          <Text className="align-middle font-pregular text-lg text-textPrimary">
            Ưu tiên tasker yêu thích
          </Text>
        </View>
        <Switch
          trackColor={{ false: '#767577', true: colors.green.B2 }}
          thumbColor={isPriorityFavoriteConnector ? colors.green.B3 : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isPriorityFavoriteConnector}
        />
      </Animated.View>
    </View>
  );
};

export default memo(PriorityFavoriteConnector);
