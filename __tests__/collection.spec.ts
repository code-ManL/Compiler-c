import { getFirst, getFollow, target } from '../src/utils/parser/shared'

describe('first', async () => {
  test('frist', () => {
    for (const key of Object.keys(target)) {
      expect(getFirst(key)).toMatchSnapshot()
    }

  })
})


describe('follow', async () => {
  test('follow', () => {
    for (const key of Object.keys(target)) {
      expect(getFollow(key)).toMatchSnapshot()
    }
  })
})
