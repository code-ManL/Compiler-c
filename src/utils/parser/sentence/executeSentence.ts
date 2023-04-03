import type { Ttoken } from '../../tokensize/types'
import { getNextToken, toThrowError } from '../shared'
import { expresstion } from '../expression/index'


/**
 * 执行语句: 语句|语句|语句
 * @default: <执行语句> => <数据处理语句> | <控制语句> | <复合语句>
 * 
 */
function executeSentence() {
  let token = getNextToken()
  if (solveDataSentence_first.includes(token.value)) {
    solveDataSentence()
  } else if (controlSentence_first.includes(token.value)) {

  } else if (circleComputedSentence_first.includes(token.value)) {

  }
}
export var executeSentence_first: string[] = []
export var executeSentence_follow: string[] = []



/**
 * 数据处理语句：语句|语句|语句
 * @default: <数据处理语句> => <赋值语句> | <函数调用语句> | <输出语句> 
 */
function solveDataSentence() {


}
var solveDataSentence_first: string[] = []
var solveDataSentence_follow: string[] = []




/**
 * 赋值语句: 表达式
 * @default: <赋值语句> => <赋值表达式>
 */
function assignmentSentence() {


}

/**
 * 函数调用语句: 表达式
 * @default: <函数调用语句> => <函数调用>
 * 
 */
function invokeFunctionSentence() {


}

/**
 * 输出语句: 表达式|表达式
 * @default: <输出语句> => console.log(<常量> | <变量>)
 * 
 */
function outputSentence() {


}


/**
 * 控制语句: 语句|语句|语句|语句
 * @default: <控制语句> => <if语句> | <for语句> | <while语句> | <return语句>
 */
function controlSentence() {
  ifsSentence()


}
var controlSentence_first: string[] = []
var controlSentence_follow: string[] = []



/**
 * if语句文法
 * @default: <if语句> => if(<表达式>)<复合语句> | if(<表达式>)<复合语句>else<复合语句>
 * @description: 消除回溯
 *  <if语句>  => if(<表达式>)<复合语句><if Tail>
 *  <if Tail> => else<复合语句> | 3
 */
function ifsSentence() {
  let token = getNextToken()
  if (token.value !== 'if') {
    toThrowError('not if')
  }
  token = getNextToken()
  if (token.value !== '(') {
    toThrowError('not (')
  }
  // 处理表达式
  expresstion()

  token = getNextToken()
  if (token.value !== ')') {
    toThrowError('not )')
  }
  // 处理复合语句
  computedSentence()
  token = getNextToken()
  if (token.value === 'else') {
    // 处理复合语句
    computedSentence()
  }
}

/**
 * for语句: 表达式|表达式|表达式|语句
 * @default: <for语句> => for(<表达式>;<表达式>;<表达式>)<循环语句>
 * 
 */
function forSentence() {
  let token = getNextToken()
  if (token.value !== 'for') {
    toThrowError('not for')
  }
  token = getNextToken()
  if (token.value !== '(') {
    toThrowError('not (')
  }

}

/**
 * while语句: 表达式|语句
 * @default: <while语句> => while(<表达式>)<循环语句>
 * 
 */
function whileSentence() {
  let token = getNextToken()
  if (token.value !== 'while') {
    toThrowError('not while')
  }
  token = getNextToken()
  if (token.value !== '(') {
    toThrowError('not (')
  }
}


/**
 * 循环语句
 * @default: <循环语句> => <声明语句> | <循环执行语句> | <循环复合语句>
 */
function circleSentence() {


}

/**
 * 循环复合语句
 * @default: <循环复合语句> => {<循环语句表>}
 * 
 */
function circleComputedSentence() {

}

const circleComputedSentence_first: string[] = []
const circleComputedSentence_follow: string[] = []


/**
 * 循环语句表
 * @default: <循环语句表> => <循环语句> | <循环语句><循环语句表>
 * @description: 消除回溯
 *    <循环语句表> => <循环语句><循环语句表 Tail>
 *    <循环语句表 Tail> => <循环语句表> | 3
 */
function circleTableSentence() {

}

/**
 * 循环执行语句
 * @default: <循环执行语句> => <循环if语句> | <for语句> | <while语句> | <return语句> | <break语句> | <continue语句>
 */
function circleExecuteSentence() {

}


/**
 * 循环if语句
 * @default: <循环if语句> => if(<表达式>)<循环语句> | if(<表达式>)<循环语句>else<循环语句>
 * @description： 消除回溯
 *    <循环if语句> => if(<表达式>)<循环语句><循环if语句 Tail>
 *    <循环if语句 Tail> => else<循环语句> | 3
 */
function circleIfSentence() {

}

/**
 * break语句
 * @default：<break语句> => break 
 * 
 */
function breakSentence() {

}

/**
 * 
 * 
 */
function continueSentence() {

}






/**
 * return语句: 表达式
 * @default: <return语句> => return | return<表达式>
 * @default: 消除回溯
 *   <return语句> => return<return Tail>
 *   <return Tail> => <表达式> | 3
 */
function returnSentence() {
  let token = getNextToken()
  if (token.value !== 'return') {
    toThrowError('not return')
  }


}



/**
 * 复合语句
 * @default: <复合语句> => {<语句表>}
 */
function computedSentence() {
  let token = getNextToken()
  if (token.value !== "{") {
    toThrowError('not }')
  }
  tableSentences()
  token = getNextToken()
  if (token.value !== '}') {
    toThrowError('not }')
  }
}


/**
 * 语句表
 * @default: <语句表> => <语句> | <语句><语句表>
 * @description:
 *  <语句表> => <语句><语句 Tail>
 *  <语句表 Tail> => <语句表> | 3
 */
function tableSentences() {


}





export {
  executeSentence,
  solveDataSentence,
  assignmentSentence,
  invokeFunctionSentence,
  outputSentence,
  controlSentence,
  ifsSentence,
  forSentence,
  whileSentence,
  returnSentence,
  computedSentence,
  tableSentences,
}
