import { Ttoken } from "./types";
import { isAlpha, isDigit, isOperators, isPunctuator, isSpace, isKeyword, } from "./shared";

enum State {
  INITIAL = 0,
  STRING = 1,
  NUMBER = 2,
  PUNCTUATOR = 3,
  OPERATORS = 4,
}

enum TokenState {
  KEYWORD = 1,
  IDNTIFIER = 2,
  NUMBER = 3,
  PUNCTUATOR = 4,
  PUNCTUATORBREAK = 5,
  OPERATORS = 6
}

var col = -1;
var row = 0

const tokenTypes: string[] = ['', 'Keyword', 'Identifier', 'Number', 'Punctuator', 'Punctuator', 'Operators']

function pushToken(
  token: Ttoken[],
  type: string,
  state: number,
  value: string,
  col: number,
  row: number,
  start: number,
) {
  token.push({
    type,
    state,
    value,
    col,
    row,
    start,
  })
}

function handlePush(
  chars: string[],
  token: Ttoken[],
  tokenState: number | null,
  _col: number,
  _row: number,
  state?: number
) {
  let c
  if (chars.length > 0) {
    c = chars.join('')
    if (!tokenState) {
      switch (state) {
        case State.STRING:
          if (isKeyword(c)) {
            pushToken(token, tokenTypes[TokenState.KEYWORD], TokenState.KEYWORD, c, _col, _row, _col - c.length + 1)
          } else {
            pushToken(token, tokenTypes[TokenState.IDNTIFIER], TokenState.IDNTIFIER, c, _col, _row, _col - c.length + 1)
          }
          break
      }
    } else {
      if (c === 'rn') {
        _col += 2
      }
      pushToken(token, tokenTypes[tokenState], tokenState, c, _col, _row, _col - c.length + 1)
      if (c === 'rn') {
        col = -1
        row++
      }
    }
    chars.length = 0
  }
  return c
}

export function tokenize(s: string) {
  let token: Ttoken[] = []
  const chars: string[] = []
  let currentState = State.INITIAL

  while (s) {
    const c = s[0]
    switch (currentState) {
      case State.INITIAL:
        if (isAlpha(c)) {
          chars.push(c)
          s = s.slice(1)
          col++
          currentState = State.STRING
        } else if (isDigit(c)) {
          chars.push(c)
          s = s.slice(1)
          col++
          currentState = State.NUMBER
        } else if (isSpace(c)) {
          s = s.slice(1)
          col++
        } else if (isPunctuator(c)) {
          currentState = State.PUNCTUATOR
        } else if (isOperators(c)) {
          currentState = State.OPERATORS
        }
        break
      case State.STRING:
        if (isAlpha(c)) {
          chars.push(c)
          s = s.slice(1)
          col++
        } else if (isDigit(c)) {
          handlePush(chars, token, null, State.STRING, col, row)
          currentState = State.NUMBER
        } else if (isSpace(c)) {
          handlePush(chars, token, null, col, row, State.STRING)
          currentState = State.INITIAL
        } else if (isPunctuator(c)) {
          handlePush(chars, token, null, col, row, State.STRING)
          currentState = State.PUNCTUATOR
        } else if (isOperators(c)) {
          handlePush(chars, token, null, col, row, State.STRING)
          currentState = State.OPERATORS
        }
        break
      case State.NUMBER:
        if (isDigit(c)) {
          chars.push(c)
          s = s.slice(1)
          col++
        } else if (isAlpha(c)) {
          handlePush(chars, token, TokenState.NUMBER, col, row)
          currentState = State.STRING
        } else if (isSpace(c)) {
          handlePush(chars, token, TokenState.NUMBER, col, row)
          currentState = State.INITIAL
        } else if (isPunctuator(c)) {
          handlePush(chars, token, TokenState.NUMBER, col, row)
          currentState = State.PUNCTUATOR
        } else if (isOperators(c)) {
          handlePush(chars, token, TokenState.NUMBER, col, row)
          currentState = State.OPERATORS
        }
        break
      case State.PUNCTUATOR:
        if (isPunctuator(c)) {
          if (/(\r)/.test(c)) {
            chars.push('r')
          } else if (/(\n)/.test(c)) {
            chars.push('n')
          } else {
            col++
            handlePush(chars, token, TokenState.PUNCTUATORBREAK, col, row)
            pushToken(token, tokenTypes[TokenState.PUNCTUATOR], TokenState.PUNCTUATOR, c, col, row, col - c.length + 1)
          }
          s = s.slice(1)
        } else if (isAlpha(c)) {
          handlePush(chars, token, TokenState.PUNCTUATORBREAK, col, row)
          currentState = State.STRING
        } else if (isDigit(c)) {
          handlePush(chars, token, TokenState.PUNCTUATORBREAK, col, row)
          currentState = State.NUMBER
        } else if (isSpace(c)) {
          handlePush(chars, token, TokenState.PUNCTUATORBREAK, col, row)
          currentState = State.INITIAL
        } else if (isOperators(c)) {
          handlePush(chars, token, TokenState.PUNCTUATORBREAK, col, row)
          currentState = State.OPERATORS
        }
        break
      case State.OPERATORS:
        if (isOperators(c)) {
          chars.push(c)
          s = s.slice(1)
          col++
        } else if (isAlpha(c)) {
          handlePush(chars, token, TokenState.OPERATORS, col, row)
          currentState = State.STRING
        } else if (isDigit(c)) {
          handlePush(chars, token, TokenState.OPERATORS, col, row)
          currentState = State.NUMBER
        } else if (isSpace(c)) {
          handlePush(chars, token, TokenState.OPERATORS, col, row)
          currentState = State.INITIAL
        } else if (isPunctuator(c)) {
          handlePush(chars, token, TokenState.OPERATORS, col, row)
          currentState = State.PUNCTUATOR
        }
        break
    }
  }
  return token
}

