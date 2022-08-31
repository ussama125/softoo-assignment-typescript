import * as Mocks from "./stock-inventory.mock";
import { getCurrentStock } from "../../../src/functions/get_current_stock";
import { readJSONFile } from "../../../src/service/file.service";
import { CONSTANTS } from "../../../src/constants/inventory.constants";

jest.mock("../../../src/service/file.service");

const mockReadFile = () => {
  (readJSONFile as jest.Mock).mockImplementation((file) => {
    if (file === CONSTANTS.STOCKS_FILE) {
      return Mocks.stock;
    } else if (file === CONSTANTS.TRANSACTION_FILE) {
      return Mocks.transactions;
    }
  });
};

describe("Stock Inventory", () => {
  describe("Get Current Stock Levels", () => {
    test("Should return current stock levels", async () => {
      mockReadFile();

      for (const stockLevel of Mocks.currentStockLevel) {
        const result = await getCurrentStock(stockLevel.sku);
        expect(result.sku).toBe(stockLevel.sku);
        expect(result.qty).toBe(stockLevel.qty);
      }
    });
    test("Should throw error - SKU not found", async () => {
      mockReadFile();

      try {
        await getCurrentStock("invalidSKU");
        // Fail test if above expression doesn't throw anything.
        expect(true).toBe(false);
      } catch (e: any) {
        expect(e).toBeInstanceOf(Error);
        expect(e.message).toBe("SKU Not Found");
      }
    });
  });
});
