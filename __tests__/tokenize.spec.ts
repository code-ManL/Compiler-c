import { describe, expect, it } from 'vitest'
import fs from 'node:fs'
import { resolve } from 'node:path';
import { tokenize } from '../src/utils/tokensize'

describe.only('parser', async () => {

  const id = resolve(__dirname, './fixtures/source.js')
  const code = await fs.promises.readFile(id, 'utf-8')

  it('should be parser to Tooken', () => {

    expect(tokenize(code)).toMatchInlineSnapshot(`
      [
        {
          "state": 1,
          "type": "Identifier",
          "value": "function",
        },
        {
          "state": 2,
          "type": "Number",
          "value": "add",
        },
        {
          "state": 4,
          "type": "Punctuator",
          "value": "(",
        },
        {
          "state": 2,
          "type": "Number",
          "value": "a",
        },
        {
          "state": 4,
          "type": "Punctuator",
          "value": ",",
        },
        {
          "state": 2,
          "type": "Number",
          "value": "b",
        },
        {
          "state": 4,
          "type": "Punctuator",
          "value": ")",
        },
        {
          "state": 4,
          "type": "Punctuator",
          "value": "{",
        },
        {
          "state": 5,
          "type": "Operators",
          "value": "rn",
        },
        {
          "state": 1,
          "type": "Identifier",
          "value": "let",
        },
        {
          "state": 2,
          "type": "Number",
          "value": "a",
        },
        {
          "state": 6,
          "type": undefined,
          "value": "=",
        },
        {
          "state": 3,
          "type": "Punctuator",
          "value": "1",
        },
        {
          "state": 5,
          "type": "Operators",
          "value": "rn",
        },
        {
          "state": 1,
          "type": "Identifier",
          "value": "for",
        },
        {
          "state": 4,
          "type": "Punctuator",
          "value": "(",
        },
        {
          "state": 1,
          "type": "Identifier",
          "value": "let",
        },
        {
          "state": 2,
          "type": "Number",
          "value": "i",
        },
        {
          "state": 6,
          "type": undefined,
          "value": "=",
        },
        {
          "state": 3,
          "type": "Punctuator",
          "value": "0",
        },
        {
          "state": 4,
          "type": "Punctuator",
          "value": ";",
        },
        {
          "state": 2,
          "type": "Number",
          "value": "i",
        },
        {
          "state": 6,
          "type": undefined,
          "value": "<",
        },
        {
          "state": 3,
          "type": "Punctuator",
          "value": "3",
        },
        {
          "state": 4,
          "type": "Punctuator",
          "value": ";",
        },
        {
          "state": 2,
          "type": "Number",
          "value": "i",
        },
        {
          "state": 6,
          "type": undefined,
          "value": "++",
        },
        {
          "state": 4,
          "type": "Punctuator",
          "value": ")",
        },
        {
          "state": 4,
          "type": "Punctuator",
          "value": "{",
        },
        {
          "state": 5,
          "type": "Operators",
          "value": "rn",
        },
        {
          "state": 1,
          "type": "Identifier",
          "value": "let",
        },
        {
          "state": 2,
          "type": "Number",
          "value": "j",
        },
        {
          "state": 6,
          "type": undefined,
          "value": "=",
        },
        {
          "state": 3,
          "type": "Punctuator",
          "value": "0",
        },
        {
          "state": 5,
          "type": "Operators",
          "value": "rn",
        },
        {
          "state": 1,
          "type": "Identifier",
          "value": "while",
        },
        {
          "state": 4,
          "type": "Punctuator",
          "value": "(",
        },
        {
          "state": 2,
          "type": "Number",
          "value": "j",
        },
        {
          "state": 6,
          "type": undefined,
          "value": "<",
        },
        {
          "state": 2,
          "type": "Number",
          "value": "i",
        },
        {
          "state": 4,
          "type": "Punctuator",
          "value": ")",
        },
        {
          "state": 4,
          "type": "Punctuator",
          "value": "{",
        },
        {
          "state": 5,
          "type": "Operators",
          "value": "rn",
        },
        {
          "state": 2,
          "type": "Number",
          "value": "j",
        },
        {
          "state": 6,
          "type": undefined,
          "value": "++",
        },
        {
          "state": 5,
          "type": "Operators",
          "value": "rn",
        },
        {
          "state": 2,
          "type": "Number",
          "value": "console",
        },
        {
          "state": 6,
          "type": undefined,
          "value": ".",
        },
        {
          "state": 2,
          "type": "Number",
          "value": "log",
        },
        {
          "state": 4,
          "type": "Punctuator",
          "value": "(",
        },
        {
          "state": 2,
          "type": "Number",
          "value": "j",
        },
        {
          "state": 6,
          "type": undefined,
          "value": "+",
        },
        {
          "state": 4,
          "type": "Punctuator",
          "value": "\\"",
        },
        {
          "state": 3,
          "type": "Punctuator",
          "value": "123",
        },
        {
          "state": 4,
          "type": "Punctuator",
          "value": "\\"",
        },
        {
          "state": 4,
          "type": "Punctuator",
          "value": ")",
        },
        {
          "state": 5,
          "type": "Operators",
          "value": "rn",
        },
        {
          "state": 4,
          "type": "Punctuator",
          "value": "}",
        },
        {
          "state": 5,
          "type": "Operators",
          "value": "rn",
        },
        {
          "state": 4,
          "type": "Punctuator",
          "value": "}",
        },
        {
          "state": 5,
          "type": "Operators",
          "value": "rn",
        },
        {
          "state": 1,
          "type": "Identifier",
          "value": "return",
        },
        {
          "state": 2,
          "type": "Number",
          "value": "a",
        },
        {
          "state": 6,
          "type": undefined,
          "value": ">",
        },
        {
          "state": 2,
          "type": "Number",
          "value": "b",
        },
        {
          "state": 6,
          "type": undefined,
          "value": "?",
        },
        {
          "state": 3,
          "type": "Punctuator",
          "value": "1",
        },
        {
          "state": 6,
          "type": undefined,
          "value": ":",
        },
        {
          "state": 3,
          "type": "Punctuator",
          "value": "2",
        },
        {
          "state": 4,
          "type": "Punctuator",
          "value": ";",
        },
        {
          "state": 5,
          "type": "Operators",
          "value": "rn",
        },
        {
          "state": 4,
          "type": "Punctuator",
          "value": "}",
        },
        {
          "state": 5,
          "type": "Operators",
          "value": "rn",
        },
        {
          "state": 6,
          "type": undefined,
          "value": "//",
        },
        {
          "state": 3,
          "type": "Punctuator",
          "value": "21312",
        },
      ]
    `)
  })
})
