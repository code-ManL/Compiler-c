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
          "col": 7,
          "row": 0,
          "start": 7,
          "state": 9,
          "type": "Error",
          "value": "2",
        },
      ]
    `)
  })
})
