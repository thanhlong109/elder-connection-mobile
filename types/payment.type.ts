import { TransactionStatus, TransactionTypeString } from '~/enums';

export interface Transaction {
  transactionId: number;
  transactionAmount: number;
  walletBalanceChange: number;
  paymentMethod: string;
  transactionNo: string;
  paymentDate: string;
  currencyCode: string;
  status: TransactionStatus;
  transactionType: TransactionTypeString;
}

export type GetTransactionByAccountResponse = Pick<
  Transaction,
  | 'currencyCode'
  | 'paymentDate'
  | 'paymentMethod'
  | 'status'
  | 'transactionAmount'
  | 'transactionId'
  | 'transactionNo'
  | 'transactionType'
  | 'walletBalanceChange'
>;

export interface TopUpWalletRequest {
  amount: number;
  accountId: string;
}

export interface TopUpWalletResponse {
  result: string;
  transId: number;
  status: number;
  message: string;
}
