import { Ttoken } from "./types";
import { isAlpha, isDigit, isOperators, isPunctuator, isSpace, isKeyword, pushToken } from "./shared";

enum State {
  INITIAL = 0,
  STRING = 1,
  NUMBER = 2,
  PUNCTUATOR = 3,
  OPERATORS = 4
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
        }
        else if (isDigit(c)) {
          const c = chars.join('')
          if (isKeyword(c)) {
            pushToken(token, 'Keyword', 1, c)
          } else {
            pushToken(token, 'Identifier', 2, c)
          }
          chars.length = 0
          currentState = State.NUMBER
        }
        else if (isSpace(c)) {
          const c = chars.join('')
          if (isKeyword(c)) {
            pushToken(token, 'Keyword', 1, c)
          } else {
            pushToken(token, 'Identifier', 2, c)
          }
          chars.length = 0
          currentState = State.INITIAL
        }
        else if (isPunctuator(c)) {
          const c = chars.join('')
          if (isKeyword(c)) {
            pushToken(token, 'Keyword', 1, c)
          } else {
            pushToken(token, 'Identifier', 2, c)
          }
          chars.length = 0
          currentState = State.PUNCTUATOR
        } else if (isOperators(c)) {
          const c = chars.join('')
          if (isKeyword(c)) {
            pushToken(token, 'Keyword', 1, c)
          } else {
            pushToken(token, 'Identifier', 2, c)
          }
          chars.length = 0
          currentState = State.OPERATORS
        }
        break
      case State.NUMBER:
        if (isDigit(c)) {
          chars.push(c)
          s = s.slice(1)
        } else if (isAlpha(c)) {
          const c = chars.join('')
          pushToken(token, 'Number', 3, c)
          chars.length = 0
          currentState = State.STRING
        } else if (isSpace(c)) {
          const c = chars.join('')
          pushToken(token, 'Number', 3, c)
          chars.length = 0
          currentState = State.INITIAL

        } else if (isPunctuator(c)) {
          const c = chars.join('')
          pushToken(token, 'Number', 3, c)
          chars.length = 0
          currentState = State.PUNCTUATOR
        } else if (isOperators(c)) {
          const c = chars.join('')
          pushToken(token, 'Number', 3, c)
          chars.length = 0
          currentState = State.OPERATORS
        }
        break
      case State.PUNCTUATOR:
        if (isPunctuator(c)) {
          if (/(\r)/.test(c)) {
            pushToken(token, 'Punctuator', 5, 'r')
          } else if (/\n/.test(c)) {
            pushToken(token, 'Punctuator', 5, 'n')
          } else {
            pushToken(token, 'Punctuator', 4, c)
          }
          s = s.slice(1)
        } else if (isAlpha(c)) {
          currentState = State.STRING
        } else if (isDigit(c)) {
          currentState = State.NUMBER
        } else if (isSpace(c)) {
          currentState = State.INITIAL
        }
        break
      case State.OPERATORS:
        if (isOperators(c)) {
          chars.push(c)
          s = s.slice(1)
        } else if (isAlpha(c)) {
          const c = chars.join('')
          pushToken(token, 'Operators', 6, c)
          chars.length = 0
          currentState = State.STRING
        }
        else if (isDigit(c)) {
          const c = chars.join('')
          pushToken(token, 'Operators', 6, c)
          chars.length = 0
          currentState = State.NUMBER
        } else if (isSpace(c)) {
          const c = chars.join('')
          pushToken(token, 'Operators', 6, c)
          chars.length = 0
          currentState = State.INITIAL
        } else if (isPunctuator(c)) {
          const c = chars.join('')
          pushToken(token, 'Operators', 6, c)
          chars.length = 0
          currentState = State.PUNCTUATOR
        }
        break
    }
  }
  return token
}

