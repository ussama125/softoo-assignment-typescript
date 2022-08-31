import { TransactionTypeEnum } from "../enum/transaction-type.enum";

export type Transaction = {
  sku: string;
  type: TransactionTypeEnum;
  qty: number;
};
