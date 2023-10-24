import mockFs from "mock-fs";
import { readResourcesData } from "../../src/utils/getData.util";
import path from "path";

describe("readResourcesData", () => {
  beforeAll(() => {
    // Mock the filesystem
    const resourcesDir = path.join(__dirname, "../../resources/");
    const colorJsonPath = path.join(resourcesDir, "a_color_of_his_own.json");
    const fishingJsonPath = path.join(resourcesDir, "fishing_in_the_air.json");

    mockFs({
      [colorJsonPath]:
        '{"title": "Book 1", "author": "Leo Lionni", "pages": []}',
      [fishingJsonPath]:
        '{"title": "Book 2", "author": "Joan Miro", "pages": []}',
      "/path/test/error/invalid.json": "invalid JSON",
    });
  });

  afterAll(() => {
    // Restore the original filesystem
    mockFs.restore();
  });

  it("should read data from resources", async () => {
    const data = await readResourcesData();

    // Assert that data contains the expected booksc
    expect(data).toEqual([
      { title: "Book 1", author: "Leo Lionni", pages: [] },
      { title: "Book 2", author: "Joan Miro", pages: [] },
    ]);
  });
});
