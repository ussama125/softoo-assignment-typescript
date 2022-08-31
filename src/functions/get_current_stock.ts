import { readJSONFile } from "../service/file.service";
import { CONSTANTS } from "../constants/inventory.constants";
import { TransactionTypeEnum } from "../enum/transaction-type.enum";
import { Stock } from "../types/stock.type";
import { Transaction } from "../types/transaction.type";

export const getCurrentStock = async (
  sku: string
): Promise<{ sku: string; qty: number }> => {
  const stock: Stock[] = await readJSONFile(CONSTANTS.STOCKS_FILE);
  const transactions: Transaction[] = await readJSONFile(
    CONSTANTS.TRANSACTION_FILE
  );

  const skuStock: Stock = stock.find((obj) => obj.sku === sku);
  const skuTransactions: Transaction[] = transactions.filter(
    (obj) => obj.sku === sku
  );

  if (!skuStock && !skuTransactions.length) {
    throw new Error("SKU Not Found");
  }

  let currentStock: number = skuStock ? skuStock.stock : 0;

  for (const transaction of skuTransactions) {
    if (transaction.type === TransactionTypeEnum.ORDER) {
      currentStock -= transaction.qty;
    } else if (transaction.type === TransactionTypeEnum.REFUND) {
      currentStock += transaction.qty;
    }
  }

  // current stock can not be a negative value
  currentStock = currentStock >= 0 ? currentStock : 0;

  return { sku, qty: currentStock };
};
