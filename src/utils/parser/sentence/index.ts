export * from './declareSentence'
export * from './executeSentence'
import { getNextToken, toThrowError } from '../shared'
import { declareSentence_first, declareSentence_follow, declareSentence } from './declareSentence'
import { executeSentence, executeSentence_first, executeSentence_follow } from './executeSentence'


/**
 * 语句
 * @default: <语句> => <声明语句> | <执行语句>
 * 
 */
export function sentences() {
  let token = getNextToken()
  if (declareSentence_first.includes(token.value)) {
    declareSentence()
  } else if(executeSentence_first.includes(token.value)){
    executeSentence()
  }else {
    toThrowError('not sentences')
  }
}


export var sentences_first: string[] = []
export var sentences_follow: string[] = []


