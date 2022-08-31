import * as fs from "fs/promises";
import { CONSTANTS } from "../constants/inventory.constants";

export const readJSONFile = async (file: string): Promise<any> => {
  try {
    // For large JSON files we can use https://github.com/dominictarr/JSONStream
    const data = await fs.readFile(CONSTANTS.FILES_BASE_PATH + file, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    throw err;
  }
};
