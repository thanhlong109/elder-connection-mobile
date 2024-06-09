import { Image } from 'react-native';
import React from 'react';
import images from '~/constants/images';
import { formatDateTime } from '~/utils/date';
import { GetTransactionByAccountResponse } from '~/types/payment.type';
import { TransactionStatus, TransactionTypeString } from '~/enums';
import { getStringTransactionStatusEnum, getStringTransactionTypeEnum } from '~/utils/enumHelper';
import { Text, View } from 'react-native-ui-lib';
import { formatNumberToMoney } from '~/utils/formater';

export interface TransactionProps {
  transaction: GetTransactionByAccountResponse;
  containerStyle: string;
}

const Transaction = ({ transaction, containerStyle }: TransactionProps) => {
  const {
    currencyCode,
    paymentDate,
    paymentMethod,
    status,
    transactionAmount,
    transactionId,
    transactionNo,
    transactionType,
    walletBalanceChange,
  } = transaction;
  return (
    <View className={`relative flex-row gap-4 px-8 py-6 ${containerStyle}`}>
      <View className="my-auto self-start rounded-full border-[1px] border-gray-C5 p-4 ">
        <Image
          source={
            transactionType === TransactionTypeString.THANH_TOAN
              ? images.Icons.sendMoney2
              : images.Icons.recevieMoney
          }
          className="h-6 w-6"
        />
      </View>
      <View className="flex-1 gap-1">
        <Text className="font-pregular text-lg">
          {getStringTransactionTypeEnum(transactionType, true)}
        </Text>
        <Text className="text-gray-700">{formatDateTime(new Date(paymentDate))}</Text>
        <Text className="text-gray-700">Số dư ví: ****</Text>
      </View>
      <Text
        className={
          'align-middle ' +
          (status === TransactionStatus.Success &&
          (TransactionTypeString.NAP_TIEN === transactionType ||
            TransactionTypeString.NHAN_TIEN === transactionType)
            ? ' font-pmedium text-xl !text-green-B2'
            : status === TransactionStatus.Success &&
                TransactionTypeString.THANH_TOAN === transactionType
              ? ' font-pmedium text-xl !text-Type-error'
              : 'font-plight text-lg !text-gray-500')
        }>
        {status === TransactionStatus.Success
          ? transactionType === TransactionTypeString.THANH_TOAN
            ? '-'
            : '+'
          : ''}{' '}
        {formatNumberToMoney(transactionAmount) + 'E'}
      </Text>
      <Text
        className={
          'absolute right-3 top-2 !rounded-full border-[1px] px-2 py-1 font-pmedium text-sm ' +
          (status === TransactionStatus.Success
            ? '!border-green-B2 !text-green-B2'
            : status === TransactionStatus.Pending
              ? '!border-Type-warning !text-Type-warning'
              : '!border-Type-error !text-Type-error')
        }>
        {getStringTransactionStatusEnum(status)}
      </Text>
    </View>
  );
};

export default Transaction;
