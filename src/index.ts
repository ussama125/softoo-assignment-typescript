import { getCurrentStock } from "./functions/get_current_stock";

export const app = async () => {
  try {
    let sku = 'LTV719449/39/39';
    console.log('*********', process.argv[2]);
    if (process.argv && process.argv.length) {
      sku = process.argv[2];
    }
    const currentStock = await getCurrentStock(sku);
    console.log(currentStock);
  } catch (err) {
    console.error(err);
  }
};

app();
