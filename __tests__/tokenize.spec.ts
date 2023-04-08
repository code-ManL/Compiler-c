import fs from 'node:fs'
import { resolve } from 'node:path';
import { tokenize } from '../src/utils/tokensize'

describe('parser', async () => {

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
          "col": 12,
          "row": 0,
          "start": 9,
          "state": 2,
          "type": "Identifier",
          "value": "main",
        },
        {
          "col": 13,
          "row": 0,
          "start": 13,
          "state": 4,
          "type": "Punctuator",
          "value": "(",
        },
        {
          "col": 14,
          "row": 0,
          "start": 14,
          "state": 4,
          "type": "Punctuator",
          "value": ")",
        },
        {
          "col": 15,
          "row": 0,
          "start": 15,
          "state": 4,
          "type": "Punctuator",
          "value": "{",
        },
        {
          "col": 20,
          "row": 0,
          "start": 18,
          "state": 1,
          "type": "Keyword",
          "value": "let",
        },
        {
          "col": 22,
          "row": 0,
          "start": 22,
          "state": 2,
          "type": "Identifier",
          "value": "a",
        },
        {
          "col": 24,
          "row": 0,
          "start": 24,
          "state": 6,
          "type": "Operators",
          "value": "=",
        },
        {
          "col": 26,
          "row": 0,
          "start": 26,
          "state": 4,
          "type": "Punctuator",
          "value": "1",
        },
        {
          "col": 27,
          "row": 0,
          "start": 27,
          "state": 4,
          "type": "Punctuator",
          "value": "}",
        },
      ]
    `)
  })
})
