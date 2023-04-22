import fs from 'node:fs'
import { resolve } from 'node:path';
import { tokenize } from '../src/utils/tokensize'

describe.only('parser', async () => {

  const id = resolve(__dirname, './fixtures/source.js')
  const code = await fs.promises.readFile(id, 'utf-8')
  console.log(code);
  
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
          "col": 16,
          "row": 0,
          "start": 16,
          "state": 4,
          "type": "Punctuator",
          "value": "{",
        },
        {
          "col": 21,
          "row": 0,
          "start": 19,
          "state": 1,
          "type": "Keyword",
          "value": "let",
        },
        {
          "col": 23,
          "row": 0,
          "start": 23,
          "state": 2,
          "type": "Identifier",
          "value": "a",
        },
        {
          "col": 25,
          "row": 0,
          "start": 25,
          "state": 6,
          "type": "Operators",
          "value": "=",
        },
        {
          "col": 27,
          "row": 0,
          "start": 27,
          "state": 3,
          "type": "Number",
          "value": "1",
        },
        {
          "col": 28,
          "row": 0,
          "start": 28,
          "state": 4,
          "type": "Punctuator",
          "value": ";",
        },
        {
          "col": 37,
          "row": 0,
          "start": 31,
          "state": 2,
          "type": "Identifier",
          "value": "console",
        },
        {
          "col": 38,
          "row": 0,
          "start": 38,
          "state": 6,
          "type": "Operators",
          "value": ".",
        },
        {
          "col": 41,
          "row": 0,
          "start": 39,
          "state": 2,
          "type": "Identifier",
          "value": "log",
        },
        {
          "col": 42,
          "row": 0,
          "start": 42,
          "state": 4,
          "type": "Punctuator",
          "value": "(",
        },
        {
          "col": 43,
          "row": 0,
          "start": 43,
          "state": 2,
          "type": "Identifier",
          "value": "a",
        },
        {
          "col": 44,
          "row": 0,
          "start": 44,
          "state": 4,
          "type": "Punctuator",
          "value": ")",
        },
        {
          "col": 45,
          "row": 0,
          "start": 45,
          "state": 4,
          "type": "Punctuator",
          "value": ";",
        },
        {
          "col": 46,
          "row": 0,
          "start": 46,
          "state": 4,
          "type": "Punctuator",
          "value": "}",
        },
      ]
    `)
  })
})
