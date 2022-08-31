import { readJSONFile } from "../../../src/service/file.service";
import { CONSTANTS } from "../../../src/constants/inventory.constants";
import { Stock } from "../../../src/types/stock.type";
import { Transaction } from "../../../src/types/transaction.type";

describe("File Service", () => {
  describe("Should read json file", () => {
    test("Should return current stock levels", async () => {
      const stocks: Stock[] = await readJSONFile(CONSTANTS.STOCKS_FILE);
      const transactions: Transaction[] = await readJSONFile(
        CONSTANTS.TRANSACTION_FILE
      );
      expect(stocks).toBeTruthy();
      expect(transactions).toBeTruthy();
    });
    test("Should throw error - File not found", async () => {
      try {
        await readJSONFile("invalidFileName");
        // Fail test if above expression doesn't throw anything.
        expect(true).toBe(false);
      } catch (e: any) {
        expect(e.message).toBe(
          "ENOENT: no such file or directory, open './data/invalidFileName'"
        );
      }
    });
  });
});
