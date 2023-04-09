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

// var col = -1;
// var row = 0
var col = -1;
var row = 0

const tokenTypes: string[] = ['', 'Keyword', 'Identifier', 'Number', 'Punctuator', 'Punctuator', 'Operators', 'String', 'Template', 'Error', 'Comment']

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

        case State.CHARACTER:
          if (isKeyword(c)) {
            pushToken(token, tokenTypes[TokenState.KEYWORD], TokenState.KEYWORD, c, _col, _row, _col - c.length + 1)
          } else {
            pushToken(token, tokenTypes[TokenState.IDNTIFIER], TokenState.IDNTIFIER, c, _col, _row, _col - c.length + 1)
          }
          break
        case State.OPERATORS:
          if (isOperators(c)) {
            pushToken(token, tokenTypes[TokenState.OPERATORS], TokenState.OPERATORS, c, _col, _row, _col - c.length + 1)
          } else {
            pushToken(token, tokenTypes[TokenState.ERROR], TokenState.ERROR, c, col, row, col - c.length + 1)
          }
      }
    } else {
      pushToken(token, tokenTypes[tokenState], tokenState, c, _col, _row, _col - c.length + 1)

    }
    chars.length = 0
  }
  return c
}

export function tokenize(s: string) {
  let token: Ttoken[] = []
  const chars: string[] = []
  let currentState = State.INITIAL
  col = -1;
  row = 0
  while (s) {
    let c = s[0]

    switch (currentState) {
      case State.INITIAL:
        if (isAlpha(c)) {
          // chars.push(c)
          // s = s.slice(1)
          // col++
          currentState = State.CHARACTER
        } else if (isDigit(c)) {
          // console.log(c);
          // chars.push(c)
          // s = s.slice(1)
          // col++
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
      case State.CHARACTER:
        if (isAlpha(c)) {
          chars.push(c)
          s = s.slice(1)
          col++
        } else if (isDigit(c)) {
          handlePush(chars, token, null, col, row, State.CHARACTER)
          currentState = State.NUMBER
        } else if (isSpace(c)) {
          const c = handlePush(chars, token, null, col, row, State.CHARACTER)
          if (c && isKeyword(c)) {
            currentState = State.KEYWORD_OPEN
          } else {
            currentState = State.INITIAL
          }
        } else if (isPunctuator(c)) {
          handlePush(chars, token, null, col, row, State.CHARACTER)
          currentState = State.PUNCTUATOR
        } else if (isOperators(c)) {
          handlePush(chars, token, null, col, row, State.CHARACTER)
          currentState = State.OPERATORS
        }
        break
      case State.KEYWORD_OPEN:
        if (chars.length === 0) {
          if (isSpace(c)) {
            s = s.slice(1)
            col++
          } else if (isDigit(c) || isOperators(c)) {
            pushToken(token, tokenTypes[TokenState.ERROR], TokenState.ERROR, c, col, row, col - c.length + 1)
            return token
          } else if (isPunctuator(c)) {
            currentState = State.PUNCTUATOR
          } else {
            chars.push(c)
            s = s.slice(1)
            col++
          }
        } else {
          if (isSpace(c)) {
            handlePush(chars, token, TokenState.IDNTIFIER, col, row)
            currentState = State.INITIAL
          } else if (isOperators(c) && c !== '.') { // #8: expect(return obj.fn()).not.toWarnError() 
            pushToken(token, tokenTypes[TokenState.ERROR], TokenState.ERROR, c, col, row, col - c.length + 1)
            return token
          } else if (isPunctuator(c)) {
            handlePush(chars, token, TokenState.IDNTIFIER, col, row)
            currentState = State.PUNCTUATOR
          } else {
            chars.push(c)
            s = s.slice(1)
            col++
          }
        }
        break
      case State.STRING:
        chars.push(c)
        // #2: the case like let a = 'rea or let a = 'dwa(/r/n)
        if (/(\r)/.test(c) || (s.length === 1 && c !== chars[0])) {
          handlePush(chars, token, TokenState.ERROR, col, row)
          return token
        } else if (chars.length > 1 && c === chars[0]) {
          handlePush(chars, token, TokenState.STRING, col, row)
          currentState = State.INITIAL
        }
        s = s.slice(1)
        col++
        break
      case State.NUMBER:
        console.log(c, 'c');
        if (isDigit(c) || c === '.') {
          col++
          if (
            // #5: when the chars begin of 0x or 0X，can no longer be assigned with a dot 
            (chars.length >= 2 && chars[0] === '0' && isOct(chars[1]) && c === '.')
            // #1: the case like 01.213(begin of 0 and not end with a dot) 
            || (chars.length >= 2 && chars[0] === '0' && c === '.')
            // #4: the case like 0.0.123(multiple dot)
            || (c === '.' && chars.join('').indexOf('.') != -1)
          ) {
            chars.push(c)
            handlePush(chars, token, TokenState.ERROR, col, row)
            return token
          }
          chars.push(c)
          s = s.slice(1)
        } else if (isAlpha(c)) {
          if (chars.length === 1 && chars[0] === '0' && (isOct(c) || isE(c))) {
            currentState = State.OCT
          } else if (chars.length === 1 && chars[0] === '0' && isX(c)) {
            chars.push(c)
            s = s.slice(1)
            currentState = State.HEX
          } else if (chars.length > 0 && isE(c) && !isE(chars[chars.length - 1])) {
            chars.push(c)
            s = s.slice(1)
          } else {
            chars.push(c)
            handlePush(chars, token, TokenState.ERROR, col, row)
            return token
          }
        } else if (isOperators(c)) {
          if (c === '+' || c === '-' && isE(chars[chars.length - 1])) {
            chars.push(c)
            s = s.slice(1)
            currentState = State.E_OPEN
          } else {
            handlePush(chars, token, TokenState.NUMBER, col, row)
            currentState = State.OPERATORS
          }
        } else if (isPunctuator(c)) {
          handlePush(chars, token, TokenState.NUMBER, col, row)
          currentState = State.PUNCTUATOR
        } else if (isSpace(c)) {
          handlePush(chars, token, TokenState.NUMBER, col, row)
          currentState = State.INITIAL
        }
        break
      case State.OCT:
        if (isAlpha(c)) {
          if (isE(c) && chars.join('').indexOf('E') === -1 && chars.join('').indexOf('e') === -1) {
            chars.push(c)
            s = s.slice(1)
          } else {
            chars.push(c)
            handlePush(chars, token, TokenState.ERROR, col, row)
            return token
          }
        } else if (isOct(c)) {
          chars.push(c)
          s = s.slice(1)
        } else if (isOperators(c)) {
          if (c === '+' || c === '-' && isE(chars[chars.length - 1])) {
            chars.push(c)
            s = s.slice(1)
            currentState = State.E_OPEN
          } else {
            handlePush(chars, token, TokenState.NUMBER, col, row)
            currentState = State.OPERATORS
          }
        } else if (isPunctuator(c)) {
          handlePush(chars, token, TokenState.NUMBER, col, row)
          currentState = State.PUNCTUATOR
        } else if (isSpace(c)) {
          handlePush(chars, token, TokenState.NUMBER, col, row)
          currentState = State.INITIAL
        }
        break
      case State.HEX:
        console.log('31', c);
        if (isAlpha(c)) {
          if (isHex(c)) {
            chars.push(c)
            s = s.slice(1)
          } else {
            chars.push(c)
            handlePush(chars, token, TokenState.ERROR, col, row)
            return token
          }
        } else if (isDigit(c)) {
          chars.push(c)
          s = s.slice(1)
        } else if (isOperators(c)) {
          if (c === '+' || c === '-' && isE(chars[chars.length - 1])) {
            chars.push(c)
            s = s.slice(1)
            currentState = State.E_OPEN
          } else {
            handlePush(chars, token, TokenState.NUMBER, col, row)
            currentState = State.OPERATORS
          }
        } else if (isPunctuator(c)) {
          handlePush(chars, token, TokenState.NUMBER, col, row)
          currentState = State.PUNCTUATOR
        } else if (isSpace(c)) {
          handlePush(chars, token, TokenState.NUMBER, col, row)
          currentState = State.INITIAL
        }
        break
      case State.E_OPEN:
        if (isDigit(c)) {
          chars.push(c)
          s = s.slice(1)
        } else if (isPunctuator(c)) {
          handlePush(chars, token, TokenState.NUMBER, col, row)
          currentState = State.PUNCTUATOR
        } else if (isSpace(c)) {
          handlePush(chars, token, TokenState.NUMBER, col, row)
          currentState = State.INITIAL
        } else {
          chars.push(c)
          handlePush(chars, token, TokenState.ERROR, col, row)
          return token
        }
        break
      case State.PUNCTUATOR:
        if (isPunctuator(c)) {
          if (/(\r)/.test(c)) {
            c = '//r'
          } else if (/(\n)/.test(c)) {
            c = '//n'
          } else if (c === '"' || c === "'" || c === '`') {
            currentState = State.STRING
            break
          } else {
            col++
            // console.log(c);
            pushToken(token, tokenTypes[TokenState.PUNCTUATOR], TokenState.PUNCTUATOR, c, col, row, col - c.length + 1)
          }
          s = s.slice(1)
        } else if (isAlpha(c)) {
          handlePush(chars, token, TokenState.PUNCTUATORBREAK, col, row)
          currentState = State.CHARACTER
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
      case State.COMMENT:
        if (chars[0] === '/' && chars[1] === '/') {
          if (!/(\r)/.test(c)) {
            chars.push(c)
            s = s.slice(1)
            col++
          } else {
            handlePush(chars, token, TokenState.COMMENT, col, row)
            currentState = State.INITIAL
          }
        } else {
          chars.push(c)
          s = s.slice(1)
          col++
          if (c === '/' && chars[chars.length - 2] === '*') {
            handlePush(chars, token, TokenState.COMMENT, col, row)
            currentState = State.INITIAL
          }
        }
        break
      case State.OPERATORS:
        let temp
        if (isOperators(c)) {
          chars.push(c)
          s = s.slice(1)
          col++
        } else if (chars.length === 1 && chars[0] === '/' && (c !== '/' && c !== '*')) {
          handlePush(chars, token, TokenState.ERROR, col, row)
          return token
        } else if (chars.length === 2 && chars[0] === '/' && (chars[1] === '/' || chars[1] === "*")) {
          currentState = State.COMMENT
        } else if (isAlpha(c)) {
          temp = handlePush(chars, token, null, col, row, State.OPERATORS)
          currentState = State.CHARACTER
        } else if (isDigit(c)) {
          temp = handlePush(chars, token, null, col, row, State.OPERATORS)
          currentState = State.NUMBER
        } else if (isSpace(c)) {
          temp = handlePush(chars, token, null, col, row, State.OPERATORS)
          currentState = State.INITIAL
        } else if (isPunctuator(c)) {
          temp = handlePush(chars, token, null, col, row, State.OPERATORS)
          currentState = State.PUNCTUATOR
        }
        // #6: when the temp is not a legitimate operators，return 

        if (temp && !isOperators(temp)) {
          return token
        }
        break
    }
  }
  if (chars.length !== 0) {
    if (chars[0] === '/' && chars[1] === '*')
      handlePush(chars, token, TokenState.ERROR, col, row)
  }

  return token
}



