import { describe, expect, it } from 'vitest'
import fs from 'node:fs'
import { resolve } from 'node:path';
import { parser } from '../src/utils/parse'

describe.only('parser', async () => {

  const id = resolve(__dirname, './source.c')
  const code = await fs.promises.readFile(id, 'utf-8')


  it('should be parser to Tooken', () => {

    expect(parser(code)).toMatchInlineSnapshot(`
      "int main(){
        int a = 1;
        return a;
      }"
    `)


    expect(1 + 2).toBe(3)
  })
})