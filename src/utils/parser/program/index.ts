import { getNextToken, toThrowError } from "../shared"
import { sentences_first, sentences_follow, sentences } from '../sentence/index'
import { expresstion_first, expresstion_follow,expresstion } from '../expression/index'

/**
 * 程序
 * @default: <程序> => <语句> | <表达式> 
 */
function programEntry() {
  let token = getNextToken()
  if (sentences_first.includes(token.value)) {
    sentences()
  } else if (expresstion_first.includes(token.value)) {
    expresstion()
  }else {
    toThrowError('not program')
  }
}


export {
  programEntry,
}


