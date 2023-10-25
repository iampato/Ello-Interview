import { processContent } from "../../src/utils/processTokens.util";

describe("processTokens", () => {
  it("Simple dry run", async () => {
    const content = "1 The Wonder Ship It is April 10, 1912.";
    const tokens = [
      { value: "one", position: [0, 1] },
      { value: "the", position: [2, 5] },
      { value: "wonder", position: [6, 12] },
      { value: "ship", position: [13, 17] },
      { value: "it", position: [18, 20] },
      { value: "is", position: [21, 23] },
      { value: "april", position: [24, 29] },
      { value: "ten", position: [30, 32] },
      { value: "nineteen twelve", position: [34, 38] },
    ];

    const processedTokens = processContent(content, tokens);

    // Assert that data contains the expected booksc
    expect(processedTokens).toEqual([
      { index: 0, token: "one", content: "1", isTappable: true },
      { index: null, token: null, content: " ", isTappable: false },
      { index: 1, token: "the", content: "The", isTappable: true },
      { index: null, token: null, content: " ", isTappable: false },
      { index: 2, token: "wonder", content: "Wonder", isTappable: true },
      { index: null, token: null, content: " ", isTappable: false },
      { index: 3, token: "ship", content: "Ship", isTappable: true },
      { index: null, token: null, content: " ", isTappable: false },
      { index: 4, token: "it", content: "It", isTappable: true },
      { index: null, token: null, content: " ", isTappable: false },
      { index: 5, token: "is", content: "is", isTappable: true },
      { index: null, token: null, content: " ", isTappable: false },
      { index: 6, token: "april", content: "April", isTappable: true },
      { index: null, token: null, content: " ", isTappable: false },
      { index: 7, token: "ten", content: "10", isTappable: true },
      { index: null, token: null, content: ",", isTappable: false },
      { index: null, token: null, content: " ", isTappable: false },
      {
        index: 8,
        token: "nineteen twelve",
        content: "1912",
        isTappable: true,
      },
      { index: null, token: null, content: ".", isTappable: false },
    ]);
  });
});
