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

const tokenTypes: string[] = ['Keyword', 'Identifier', 'Number', 'Punctuator', 'Punctuator', 'Operators']

function pushToken(token: Ttoken[], type: string, state: number, value: string) {
  token.push({
    type,
    state,
    value
  })
}

function handlePush(chars: string[], token: Ttoken[], tokenState: number | null, state?: number) {
  if (chars.length > 0) {
    const c = chars.join('')
    if (!tokenState) {
      switch (state) {
        case State.STRING:
          if (isKeyword(c)) {
            pushToken(token, tokenTypes[TokenState.KEYWORD], TokenState.KEYWORD, c)
          } else {
            pushToken(token, tokenTypes[TokenState.IDNTIFIER], TokenState.IDNTIFIER, c)
          }
          break
      }
    } else {
      pushToken(token, tokenTypes[tokenState], tokenState, c)
    }
    chars.length = 0
  }
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
          currentState = State.STRING
          chars.push(c)
          s = s.slice(1)
        } else if (isDigit(c)) {
          currentState = State.NUMBER
          chars.push(c)
          s = s.slice(1)
        } else if (isSpace(c)) {
          s = s.slice(1)
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
        } else if (isDigit(c)) {
          handlePush(chars, token, null, State.STRING)
          currentState = State.NUMBER
        } else if (isSpace(c)) {
          handlePush(chars, token, null, State.STRING)
          currentState = State.INITIAL
        } else if (isPunctuator(c)) {
          handlePush(chars, token, null, State.STRING)
          currentState = State.PUNCTUATOR
        } else if (isOperators(c)) {
          handlePush(chars, token, null, State.STRING)
          currentState = State.OPERATORS
        }
        break
      case State.NUMBER:
        if (isDigit(c)) {
          chars.push(c)
          s = s.slice(1)
        } else if (isAlpha(c)) {
          handlePush(chars, token, TokenState.NUMBER)
          currentState = State.STRING
        } else if (isSpace(c)) {
          handlePush(chars, token, TokenState.NUMBER)
          currentState = State.INITIAL
        } else if (isPunctuator(c)) {
          handlePush(chars, token, TokenState.NUMBER)
          currentState = State.PUNCTUATOR
        } else if (isOperators(c)) {
          handlePush(chars, token, TokenState.NUMBER)
          currentState = State.OPERATORS
        }
        break
      case State.PUNCTUATOR:
        if (isPunctuator(c)) {
          if (/(\r)/.test(c)) {
            chars.push('r')
          }
          else if (/(\n)/.test(c)) {
            chars.push('n')
          } else {
            handlePush(chars, token, TokenState.PUNCTUATORBREAK)
            pushToken(token, tokenTypes[TokenState.PUNCTUATOR], TokenState.PUNCTUATOR, c)
          }
          s = s.slice(1)
        } else if (isAlpha(c)) {
          handlePush(chars, token, TokenState.PUNCTUATORBREAK)
          currentState = State.STRING
        } else if (isDigit(c)) {
          handlePush(chars, token, TokenState.PUNCTUATORBREAK)
          currentState = State.NUMBER
        } else if (isSpace(c)) {
          handlePush(chars, token, TokenState.PUNCTUATORBREAK)
          currentState = State.INITIAL
        } else if (isOperators(c)) {
          handlePush(chars, token, TokenState.PUNCTUATORBREAK)
          currentState = State.OPERATORS
        }
        break
      case State.OPERATORS:
        if (isOperators(c)) {
          chars.push(c)
          s = s.slice(1)
        } else if (isAlpha(c)) {
          handlePush(chars, token, TokenState.OPERATORS)
          currentState = State.STRING
        } else if (isDigit(c)) {
          handlePush(chars, token, TokenState.OPERATORS)
          currentState = State.NUMBER
        } else if (isSpace(c)) {
          handlePush(chars, token, TokenState.OPERATORS)
          currentState = State.INITIAL
        } else if (isPunctuator(c)) {
          handlePush(chars, token, TokenState.OPERATORS)
          currentState = State.PUNCTUATOR
        }
        break
    }
  }
  return token
}

