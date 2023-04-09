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
          "col": 2,
          "row": 0,
          "start": 0,
          "state": 1,
          "type": "Keyword",
          "value": "let",
        },
        {
          "col": 4,
          "row": 0,
          "start": 4,
          "state": 2,
          "type": "Identifier",
          "value": "a",
        },
        {
          "col": 6,
          "row": 0,
          "start": 6,
          "state": 6,
          "type": "Operators",
          "value": "=",
        },
        {
          "col": 8,
          "row": 0,
          "start": 8,
          "state": 3,
          "type": "Number",
          "value": "1",
        },
        {
          "col": 9,
          "row": 0,
          "start": 9,
          "state": 4,
          "type": "Punctuator",
          "value": ";",
        },
        {
          "col": 17,
          "row": 0,
          "start": 10,
          "state": 1,
          "type": "Keyword",
          "value": "function",
        },
        {
          "col": 20,
          "row": 0,
          "start": 19,
          "state": 2,
          "type": "Identifier",
          "value": "da",
        },
        {
          "col": 21,
          "row": 0,
          "start": 21,
          "state": 4,
          "type": "Punctuator",
          "value": "(",
        },
        {
          "col": 22,
          "row": 0,
          "start": 22,
          "state": 4,
          "type": "Punctuator",
          "value": ")",
        },
        {
          "col": 23,
          "row": 0,
          "start": 23,
          "state": 4,
          "type": "Punctuator",
          "value": "{",
        },
        {
          "col": 28,
          "row": 0,
          "start": 26,
          "state": 1,
          "type": "Keyword",
          "value": "let",
        },
        {
          "col": 30,
          "row": 0,
          "start": 30,
          "state": 2,
          "type": "Identifier",
          "value": "a",
        },
        {
          "col": 32,
          "row": 0,
          "start": 32,
          "state": 6,
          "type": "Operators",
          "value": "=",
        },
        {
          "col": 34,
          "row": 0,
          "start": 34,
          "state": 3,
          "type": "Number",
          "value": "1",
        },
        {
          "col": 35,
          "row": 0,
          "start": 35,
          "state": 4,
          "type": "Punctuator",
          "value": ";",
        },
        {
          "col": 36,
          "row": 0,
          "start": 36,
          "state": 4,
          "type": "Punctuator",
          "value": "}",
        },
      ]
    `)
  })
})
