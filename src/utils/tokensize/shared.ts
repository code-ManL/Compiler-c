import { Ttoken } from "./types"

var operators = ["+", "-", "*", "/", "=", "<", ">", "!", "=", ".", "?", ":"]
const punctuator = ["{", "}", ";", ",", "(", ")", "[", "]", '\r', '\n', '"', "'"]
const keyword = [
  "break",
  "case",
  "catch",
  "continue",
  "const",
  "default",
  "delete",
  "do",
  "else",
  "finally",
  "for",
  "function",
  "if",
  "in",
  "instanceof",
  "let",
  "new",
  "return",
  "switch",
  "this",
  "throw",
  "try",
  "typepf",
  "var",
  "void",
  "while",
  "with"
]

function isAlpha(c: string) {
  return (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z') || c === '_'
}

function isDigit(d: string) {
  return d >= '0' && d <= '9'
}

function isSpace(s: string) {
  return s === ' '
}

function isPunctuator(c: string) {
  return punctuator.includes(c)
}

function isOperators(c: string) {
  return operators.includes(c)
}

function isKeyword(c: string) {
  return keyword.includes(c)
}




export {
  isAlpha,
  isDigit,
  isSpace,
  isPunctuator,
  isOperators,
  isKeyword,
}
