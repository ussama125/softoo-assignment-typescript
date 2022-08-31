import { getCurrentStock } from "./functions/get_current_stock";

const main = async () => {
  try {
    const currentStock = await getCurrentStock("LTV719449/39/39");
    console.log(currentStock);
  } catch (err) {
    console.error(err);
  }
};

main();
