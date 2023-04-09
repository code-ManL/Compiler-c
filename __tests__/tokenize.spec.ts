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
          "value": "var",
        },
        {
          "col": 4,
          "row": 0,
          "start": 4,
          "state": 2,
          "type": "Identifier",
          "value": "e",
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
          "col": 9,
          "row": 0,
          "start": 4,
          "state": 3,
          "type": "Number",
          "value": "12e+33",
        },
      ]
    `)
  })
})
