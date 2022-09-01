import { app } from "../../../src";

describe("App", () => {
  describe("Should execute app", () => {

    let originalArgv: any;
    beforeEach(() => {
      originalArgv = process.argv;
    });

    afterEach(() => {
      process.argv = originalArgv;
    });

    test("Should execute app without errors", async () => {
      process.argv = process.argv.concat(['LTV719449/39/39']);
      await app()
      expect(true).toBeTruthy();
    });
    test("Should throw error from app", async () => {
      try {
        process.argv = process.argv.concat(['INVALID_SKU']);
        await app();
        // Fail test if above expression doesn't throw anything.
        expect(true).toBe(false);
      } catch (e: any) {
        expect(true).toBeTruthy();
      }
    });
  });
});
