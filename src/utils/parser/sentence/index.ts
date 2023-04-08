export * from './declareSentence'
export * from './executeSentence'
import { getNextToken, toThrowError } from '../shared'
import {  declareSentence } from './declareSentence'
import { executeSentence,  } from './executeSentence'


/**
 * 语句
 * @default: <语句> => <声明语句> | <执行语句>
 * 
 */
export function sentences() {
  
}


export var sentences_first: string[] = []
export var sentences_follow: string[] = []


