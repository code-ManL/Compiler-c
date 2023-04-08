import type { Ttoken } from '../../tokensize/types'
import { getCurrentToken, getFirst, getFollow, getNextToken, getPre, toThrowError } from '../shared'
import { functionDeclareSentence } from '../function/index'

// <声明语句列表> -> <声明语句> <声明语句列表> | None
function declareSentenceTable() {
  let token = getCurrentToken()
  if (getFirst("<声明语句> <声明语句列表>", [], 0).includes(token.value)) {
    declareSentence()
  } else if (getFollow("<声明语句列表>").includes(token.value)) {
    console.log('当前字符属于<声明语句列表>Follow，跳过');
  } else {
    toThrowError("不是合法的声明语句列表")
    return
  }
}


// <声明语句> -> function <标识符> ( <函数声明形参列表> ) ; | <数据类型> <标识符> <声明语句'> ;
function declareSentence() {
  let token = getCurrentToken()
  if (token.value !== 'function') {
    toThrowError('不是合法的声明语句')
    return
  }
  console.log(getPre(), '匹配了function');

  // 匹配function，获取下一个token
  token = getNextToken()!












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
  declareSentenceTable,
  declareSentence,
  valueDeclareSentence,
  variableDeclareSentence,
  variableTableDeclareSentence,
  signalVariableDeclareSentence,
  // variableTypeDeclareSentence,
}
