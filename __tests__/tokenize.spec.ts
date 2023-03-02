import { describe, expect, it } from 'vitest'
import fs from 'node:fs'
import { resolve } from 'node:path';
import { tokenize } from '../src/utils/tokenize'

describe.only('parser', async () => {

  const id = resolve(__dirname, './source.js')
  const code = await fs.promises.readFile(id, 'utf-8')

  it('should be parser to Tooken', () => {

    expect(tokenize(code)).toMatchInlineSnapshot(`
      [
        {
          "State": 1,
          "type": "Keyword",
          "value": "function",
        },
        {
          "State": 2,
          "type": "Identifier",
          "value": "add",
        },
        {
          "State": 4,
          "type": "Punctuator",
          "value": "(",
        },
        {
          "State": 2,
          "type": "Identifier",
          "value": "a",
        },
        {
          "State": 4,
          "type": "Punctuator",
          "value": ",",
        },
        {
          "State": 2,
          "type": "Identifier",
          "value": "b",
        },
        {
          "State": 4,
          "type": "Punctuator",
          "value": ")",
        },
        {
          "State": 4,
          "type": "Punctuator",
          "value": "{",
        },
        {
          "State": 2,
          "type": "Identifier",
          "value": "let",
        },
        {
          "State": 3,
          "type": "Number",
          "value": "3",
        },
        {
          "State": 2,
          "type": "Identifier",
          "value": "a",
        },
        {
          "State": 6,
          "type": "Operators",
          "value": "=",
        },
        {
          "State": 3,
          "type": "Number",
          "value": "1",
        },
        {
          "State": 5,
          "type": "Punctuator",
          "value": "r",
        },
        {
          "State": 5,
          "type": "Punctuator",
          "value": "n",
        },
        {
          "State": 4,
          "type": "Punctuator",
          "value": "}",
        },
        {
          "State": 5,
          "type": "Punctuator",
          "value": "r",
        },
        {
          "State": 5,
          "type": "Punctuator",
          "value": "n",
        },
      ]
    `)
  })
})
