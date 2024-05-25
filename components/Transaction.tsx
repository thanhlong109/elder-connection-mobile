import { View, Text, Image } from 'react-native';
import React from 'react';
import images from '~/constants/images';
import { formatDateTime } from '~/utils/date';

export interface TransactionProps {
  isSend: boolean;
  title: string;
  time: Date;
  walletAmount: string;
  transaction: string;
  containerStyle?: string;
}

const Transaction = ({
  isSend,
  time,
  title,
  transaction,
  walletAmount,
  containerStyle,
}: TransactionProps) => {
  return (
    <View className={`flex-row gap-4 bg-white px-8 py-6 ${containerStyle}`}>
      <View className="my-auto self-start rounded-full border-[1px] border-gray-C5 p-4 ">
        <Image
          source={isSend ? images.Icons.sendMoney2 : images.Icons.recevieMoney}
          className="h-6 w-6"
        />
      </View>
      <View className="flex-1 gap-1">
        <Text className="font-pregular text-lg">{title}</Text>
        <Text className="text-gray-700">{formatDateTime(time)}</Text>
        <Text className="text-gray-700">Số dư ví: {walletAmount}</Text>
      </View>
      <Text className="align-middle font-pmedium text-lg">{transaction}</Text>
    </View>
  );
};

export default Transaction;
