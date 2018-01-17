import * as fs from "fs";

export module PangeaJSONSchemas {
  export const GetSchema = (path: string): any => {
    return fs.readFileSync(`${__dirname}/${path}`);
  }
}