import { PageContent } from "../models/PageContent.model";
import { TokenModel } from "../models/Token.model";

export function processContent(
  content: string,
  tokens: TokenModel[]
): PageContent[] {
  const result: PageContent[] = [];

  let contentIndex = 0;
  let tokenIndex = 0;

  while (contentIndex < content.length) {
    const char = content[contentIndex];

    // console.log("char", char);

    if (
      tokenIndex < tokens.length &&
      contentIndex >= tokens[tokenIndex].position[0]
    ) {
      const [start, end] = tokens[tokenIndex].position;

      if (contentIndex === start) {
        result.push({
          index: tokenIndex,
          token: tokens[tokenIndex].value,
          content: content.slice(start, end),
          isTappable: true,
        });
        contentIndex = end;
      } else {
        result.push({
          index: null,
          token: null,
          content: char,
          isTappable: false,
        });
        contentIndex++;
      }

      if (contentIndex === end) {
        tokenIndex++;
      }
    } else {
      result.push({
        index: null,
        token: null,
        content: char,
        isTappable: false,
      });
      contentIndex++;
    }
  }

  return result;
}