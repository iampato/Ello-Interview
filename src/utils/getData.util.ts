/// src/utils/getData.util.ts

import { BookModel } from "../models/Book.model";
import fs from "fs";
import path from "path";

// readResourcesData
// read data from resources
export const readResourcesData = (): Promise<BookModel[]> => {
  const data: BookModel[] = [];
  const resourcesDir = path.join(__dirname, "../../resources/");

  return new Promise((resolve, reject) => {
    fs.readdir(resourcesDir, (err, files) => {
      if (err) {
        console.error(`Error reading resources directory: ${err}`);
        reject(err);
        return;
      }

      const readFilePromises = files.map((file) => {
        return new Promise<void>((resolve, reject) => {
          fs.readFile(
            path.join(resourcesDir, file),
            "utf8",
            (err, fileData) => {
              if (err) {
                console.error(`Error reading file ${file}: ${err}`);
                reject(err);
                return;
              }

              try {
                const jsonData = JSON.parse(fileData);
                data.push(jsonData);
                resolve();
              } catch (parseErr) {
                console.error(`Error parsing file ${file}: ${parseErr}`);
                reject(parseErr);
              }
            }
          );
        });
      });

      Promise.all(readFilePromises)
        .then(() => resolve(data))
        .catch(reject);
    });
  });
};
