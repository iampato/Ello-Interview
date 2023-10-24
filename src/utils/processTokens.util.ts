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
      // console.log("start ->", start, "end ->", end, "contentIndex ->", contentIndex);

      if (contentIndex === start) {
        result.push({
          index: tokenIndex,
          token: tokens[tokenIndex].value,
          content: content.slice(start, end),
          isTappable: true,
        });
        // start for the next iteration updated to the end of the token position
        contentIndex = end;
      } else {
        // console.log("Char under else ->", char);
        result.push({
          index: null,
          token: null,
          content: char,
          isTappable: false,
        });
        contentIndex++;
      }

      if (contentIndex === end) {
        // move to the next token
        // console.log("move to the next token");
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