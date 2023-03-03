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
          "type": "Keyword",
          "value": "function",
        },
        {
          "state": 2,
          "type": "Identifier",
          "value": "add",
        },
        {
          "state": 4,
          "type": "Punctuator",
          "value": "(",
        },
        {
          "state": 2,
          "type": "Identifier",
          "value": "a",
        },
        {
          "state": 4,
          "type": "Punctuator",
          "value": ",",
        },
        {
          "state": 2,
          "type": "Identifier",
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
          "type": "Punctuator",
          "value": "r",
        },
        {
          "state": 5,
          "type": "Punctuator",
          "value": "n",
        },
        {
          "state": 1,
          "type": "Keyword",
          "value": "let",
        },
        {
          "state": 2,
          "type": "Identifier",
          "value": "a",
        },
        {
          "state": 6,
          "type": "Operators",
          "value": "=",
        },
        {
          "state": 3,
          "type": "Number",
          "value": "1",
        },
        {
          "state": 5,
          "type": "Punctuator",
          "value": "r",
        },
        {
          "state": 5,
          "type": "Punctuator",
          "value": "n",
        },
        {
          "state": 1,
          "type": "Keyword",
          "value": "for",
        },
        {
          "state": 4,
          "type": "Punctuator",
          "value": "(",
        },
        {
          "state": 1,
          "type": "Keyword",
          "value": "let",
        },
        {
          "state": 2,
          "type": "Identifier",
          "value": "i",
        },
        {
          "state": 6,
          "type": "Operators",
          "value": "=",
        },
        {
          "state": 3,
          "type": "Number",
          "value": "0",
        },
        {
          "state": 4,
          "type": "Punctuator",
          "value": ";",
        },
        {
          "state": 2,
          "type": "Identifier",
          "value": "i",
        },
        {
          "state": 6,
          "type": "Operators",
          "value": "<",
        },
        {
          "state": 3,
          "type": "Number",
          "value": "3",
        },
        {
          "state": 4,
          "type": "Punctuator",
          "value": ";",
        },
        {
          "state": 2,
          "type": "Identifier",
          "value": "i",
        },
        {
          "state": 6,
          "type": "Operators",
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
          "type": "Punctuator",
          "value": "r",
        },
        {
          "state": 5,
          "type": "Punctuator",
          "value": "n",
        },
        {
          "state": 1,
          "type": "Keyword",
          "value": "let",
        },
        {
          "state": 2,
          "type": "Identifier",
          "value": "j",
        },
        {
          "state": 6,
          "type": "Operators",
          "value": "=",
        },
        {
          "state": 3,
          "type": "Number",
          "value": "0",
        },
        {
          "state": 5,
          "type": "Punctuator",
          "value": "r",
        },
        {
          "state": 5,
          "type": "Punctuator",
          "value": "n",
        },
        {
          "state": 1,
          "type": "Keyword",
          "value": "while",
        },
        {
          "state": 4,
          "type": "Punctuator",
          "value": "(",
        },
        {
          "state": 2,
          "type": "Identifier",
          "value": "j",
        },
        {
          "state": 6,
          "type": "Operators",
          "value": "<",
        },
        {
          "state": 2,
          "type": "Identifier",
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
          "type": "Punctuator",
          "value": "r",
        },
        {
          "state": 5,
          "type": "Punctuator",
          "value": "n",
        },
        {
          "state": 2,
          "type": "Identifier",
          "value": "j",
        },
        {
          "state": 6,
          "type": "Operators",
          "value": "++",
        },
        {
          "state": 5,
          "type": "Punctuator",
          "value": "r",
        },
        {
          "state": 5,
          "type": "Punctuator",
          "value": "n",
        },
        {
          "state": 4,
          "type": "Punctuator",
          "value": "}",
        },
        {
          "state": 5,
          "type": "Punctuator",
          "value": "r",
        },
        {
          "state": 5,
          "type": "Punctuator",
          "value": "n",
        },
        {
          "state": 4,
          "type": "Punctuator",
          "value": "}",
        },
        {
          "state": 5,
          "type": "Punctuator",
          "value": "r",
        },
        {
          "state": 5,
          "type": "Punctuator",
          "value": "n",
        },
        {
          "state": 1,
          "type": "Keyword",
          "value": "return",
        },
        {
          "state": 2,
          "type": "Identifier",
          "value": "a",
        },
        {
          "state": 6,
          "type": "Operators",
          "value": ">",
        },
        {
          "state": 2,
          "type": "Identifier",
          "value": "b",
        },
        {
          "state": 6,
          "type": "Operators",
          "value": "?",
        },
        {
          "state": 3,
          "type": "Number",
          "value": "1",
        },
        {
          "state": 6,
          "type": "Operators",
          "value": ":",
        },
        {
          "state": 3,
          "type": "Number",
          "value": "2",
        },
        {
          "state": 4,
          "type": "Punctuator",
          "value": ";",
        },
        {
          "state": 5,
          "type": "Punctuator",
          "value": "r",
        },
        {
          "state": 5,
          "type": "Punctuator",
          "value": "n",
        },
        {
          "state": 4,
          "type": "Punctuator",
          "value": "}",
        },
        {
          "state": 5,
          "type": "Punctuator",
          "value": "r",
        },
        {
          "state": 5,
          "type": "Punctuator",
          "value": "n",
        },
      ]
    `)
  })
})
