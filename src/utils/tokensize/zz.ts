import { Ttoken } from "./types";
import { isAlpha, isDigit, isOperators, isPunctuator, isSpace, isKeyword, isOct, isHex, isX, isE } from "./shared";

enum State {
  INITIAL = 0,
  CHARACTER = 1,
  NUMBER = 2,
  PUNCTUATOR = 3,
  OPERATORS = 4,
  STRING = 5,
  TEMPLATE = 6,
  KEYWORD_OPEN = 7,
  COMMENT = 8,
  E_OPEN = 9,
  OCT = 10,
  HEX = 11
}

enum TokenState {
  KEYWORD = 1,
  IDNTIFIER = 2,
  NUMBER = 3,
  PUNCTUATOR = 4,
  PUNCTUATORBREAK = 5,
  OPERATORS = 6,
  STRING = 7,
  TEMPLATE = 8,
  ERROR = 9,
  COMMENT = 10,
  E_OPEN = 11,
  OCT = 12,
  HEX = 13
}



const tokenTypes: string[] = ['', 'Keyword', 'Identifier', 'Number', 'Punctuator', 'Punctuator', 'Operators', 'String', 'Template', 'Error', 'Comment']

export function tokensize_z(s: string) {
  



}


