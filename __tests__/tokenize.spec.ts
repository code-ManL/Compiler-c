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
          "col": 7,
          "row": 0,
          "start": 0,
          "state": 1,
          "type": "Keyword",
          "value": "function",
        },
        {
          "col": 15,
          "row": 0,
          "start": 9,
          "state": 2,
          "type": "Identifier",
          "value": "isAlpha",
        },
        {
          "col": 16,
          "row": 0,
          "start": 16,
          "state": 4,
          "type": "Punctuator",
          "value": "(",
        },
        {
          "col": 17,
          "row": 0,
          "start": 17,
          "state": 2,
          "type": "Identifier",
          "value": "c",
        },
        {
          "col": 18,
          "row": 0,
          "start": 18,
          "state": 4,
          "type": "Punctuator",
          "value": ")",
        },
        {
          "col": 20,
          "row": 0,
          "start": 20,
          "state": 4,
          "type": "Punctuator",
          "value": "{",
        },
        {
          "col": 22,
          "row": 0,
          "start": 21,
          "state": 5,
          "type": "Punctuator",
          "value": "rn",
        },
        {
          "col": 3,
          "row": 1,
          "start": 2,
          "state": 9,
          "type": "Error",
          "value": "//",
        },
      ]
    `)
  })
})
