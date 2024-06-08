import React from 'react';
import { Image, Text, View } from 'react-native-ui-lib';
import images from '~/constants/images';
import { ActionStatus } from '~/enums';
import { GetPostRespone } from '~/types/post.type';

interface ActionItemProps {
  item: GetPostRespone;
}

const ActionItem = ({ item }: ActionItemProps) => {
  return (
    <View className="flex-row items-center justify-between ">
      {/* <Image source={ images.Icons.actionIcon} className="h-[60px] w-[60px]" resizeMode="contain" />
      <View>
        <Text className="font-psemibold">{item.title}</Text>
        <Text className="mt-2 font-pregular">Ngày: {item.jobSchedule.listDayWork}</Text>
        <Text className="font-pregular">Dịch vụ: {item.postId}</Text>
        <Text className="font-pregular">Bắt đầu: {item.startTime}</Text>
      </View>
      <Text
        className={`rounded-full ${item.jobSchedule.startDate == ActionStatus.APPROVED ? 'bg-[#468DE0]' : item.status == ActionStatus.DONE ? 'bg-primary' : 'bg-secondary'} p-2 font-pmedium text-sm text-white`}>
        {item.status}
      </Text>

      <Text className="w-full text-right font-pthin text-sm italic">
        Ngày đăng: {item.postDate}
      </Text> */}
    </View>
  );
};

export default ActionItem;
