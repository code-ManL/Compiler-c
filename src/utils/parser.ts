
var keywords: {
  [k: string]: any
} = {
  "char": 101,
  "int": 102,
  "float": 103,
  "break": 104,
  "const": 105,
  "return": 106,
  "void": 107,
  "continue": 108,
  "do": 109,
  "while": 110,
  "if": 111,
  "else": 112,
  "for": 113,
  "function": 114
}



var separators = {
  "{": 301,
  "}": 302,
  ";": 303,
  ",": 304,
  "(": 201,
  ")": 202,
  "[": 203,
  "]": 204,
}


var operators = {
  "!": 205,
  "*": 206,
  "/": 207,
  "%": 208,
  "+": 209,
  "-": 210,
  "<": 211,
  "<=": 212,
  ">": 213,
  ">=": 214,
  "==": 215,
  "!=": 216,
  "&&": 217,
  "||": 218,
  "=": 219,
  ".": 220
}

const state = {
  "error": -1,
  "initial": 0,
  "charOpen": 1,
  "charEnd": 2,
  "numOpen": 3,
  "numEnd": 4,
  "separators": 5,
  "operators": 6,
  "logOpen": 7,
  "logEnd": 8,
  "fnOpen": 9,
  "putOpen": 10,
  "putEnd": 11,
  "fnCharOpen": 12,
  "fnCharEnd": 13,
}

function isAlpha(c: string) {
  return (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z') || '_'
}

function isDigit(d: string) {
  return d >= '0' && d <= '9'
}

function isSpace(s: string) {
  return /s/.test(s)
}


type Ttoken = {
  type: string,
  state: number,
  value: string
}



const punctuator = ["{", "}", ";", ",", "(", ")", "[", "]"]
const keyword = ['function', 'var', 'let', 'const']



export function tokenize(s: string) {
  let i = 0;
  let token: Ttoken[] = []
  const chars: string[] = []
  let currentState = state.initial

  while (s) {
    const c = s[i]
    switch (currentState) {
      case state.initial:
        if (isAlpha(c)) {
          currentState = state.charOpen
          chars.push(c)
          s = s.slice(1)
        }
        else if (isDigit(c)) {
          currentState = state.numOpen
          chars.push(c)
          s = s.slice(1)
        }
        else if (isSpace(c)) {
          s = s.slice(1)
        }
        break
      case state.charOpen:
        if (isAlpha(c)) {
          chars.push(c)
          s = s.slice(1)
        }
        else if (isDigit(c)) {
          const c = chars.join('')
          token.push({
            type: 'Identifier',
            state: 2,
            value: c
          })
          chars.length = 0
          currentState = state.numOpen
        }
        else if (isSpace(c)) {
          const c = chars.join('')
          if (keyword.includes(c)) {
            token.push({
              type: 'Keyword',
              state: 1,
              value: c
            })
          }
          else {
            token.push({
              type: 'Identifier',
              state: 2,
              value: c
            })
          }
          chars.length = 0
          s = s.slice(1)
          currentState = state.initial
        }
        else if (punctuator.includes(c)) {
          const c = chars.join('')
          if (keyword.includes(c)) {
            token.push({
              type: 'Keyword',
              state: 1,
              value: c
            })
          }
          else {
            token.push({
              type: 'Identifier',
              state: 2,
              value: c
            })
          }
          chars.length = 0
          currentState = state.putOpen
        }
        break
      case state.numOpen:
        if (isDigit(c)) {
          chars.push(c)
          s = s.slice(1)
        } else if (isAlpha(c) || isSpace(c)) {
          const c = chars.join('')
          token.push({
            type: 'Number',
            state: 3,
            value: c
          })
          chars.length = 0
          currentState = state.charOpen
        }
        break
      case state.putOpen:
        if (punctuator.includes(c)) {
          token.push({
            type: 'Punctuator',
            state: 4,
            value: c
          })
          s = s.slice(1)
        }
        else if (isAlpha(c)) {
          currentState = state.charOpen
        }
        else if (isDigit(c)) {
          currentState = state.numOpen
        }
    }
    i++
  }
}

