import type { Ttoken } from '../tokensize/types'

// mock tokens
var tokens: Ttoken[] = [
  {
    type: '',
    state: 1,
    value: '',
    col: 1,
    row: 2,
    start: 1,
  }
]


// 报错
export function toThrowError(error: string) {
  console.log(error);
}

// 获取下一个token
export function getNextToken() {
  return tokens.shift() || { value: 'end' }
}
