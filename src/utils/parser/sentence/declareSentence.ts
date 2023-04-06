import type { Ttoken } from '../../tokensize/types'
import { getNextToken, toThrowError } from '../shared'
import { functionDeclareSentence_first, functionDeclareSentence_follow, functionDeclareSentence } from '../function/index'

/**
 * 声明语句
 * @default: <声明语句> => <值声明> | <函数声明> | 3
 */
function declareSentence() {

}

/**
 * 值声明
 * @default: <值声明> => <变量声明>
 */
function valueDeclareSentence() {

}


/**
 * 变量声明
 * @default: <变量声明> => <变量类型><变量声明表>
 */
function variableDeclareSentence() {
 
}
var variableDeclareSentence_first: string[] = ['const', 'let', 'var']
var variableDeclareSentence_follow: string[] = []

/**
 * 变量声明表
 * @default: <变量声明表> => <单变量声明> | <单变量声明>,<变量声明表>
 * @description: 消除回溯
 *    <变量声明表> => <单变量声明>
 *    <变量声明表 Tail> => ,<变量声明表> | 3
 */
function variableTableDeclareSentence() {

}


/**
 * 单变量声明
 * @default: <单变量声明> => <变量> | <变量>=<表达式>
 * @description: 消除回溯
 *    <单变量声明> => <变量><单变量声明 Tail>
 *    <单变量声明 Tail> => =<表达式> | 3
 */
function signalVariableDeclareSentence() {

}

/**
 * 变量类型
 * @default: <变量类型> => var | let | const 
 */
function variableTypeDeclareSentence() {
  let token = getNextToken()
  // 走到这里一定是var let const 中的一个


}




export {
  declareSentence,
  valueDeclareSentence,
  variableDeclareSentence,
  variableTableDeclareSentence,
  signalVariableDeclareSentence,
  // variableTypeDeclareSentence,
}
