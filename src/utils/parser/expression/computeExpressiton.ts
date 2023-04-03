import { getNextToken, toThrowError } from '../shared'



// <标识符>，<数值常量>，<字符常量>都是终结符

/**
 * 算术表达式
 * @default: <算术表达式> => <算术表达式>+<项> | <算术表达式>-<项> | <项>
 * @description: 消除左递归    
 *  <算术表达式> => <项><算术表达式 Tail>
 *  <算术表达式 Tail> => +<项><算术表达式 Tail> | -<项><算术表达式 Tail> | 3
 */
function computedExpression() {

}

/**
 * 项
 * @default: <项> => <项>*<因子> | <项>/<因子> | <项>%<因子> | <因子>
 * @description: 消除左递归    
 *  <项> => <因子><项 Tail>
 *  <项 Tail> => *<因子><项 Tail> | /<因子><项 Tail> | %<因子><项 Tail> | 3
 */
function itemExpresstion() {


}

/**
 * 因子
 * @default: <因子> => (<算术表达式>) | <常量> | <变量> | <函数调用>
 */
function factorExpresstion() {

}


/**
 * 常量
 * @default: <常量> => <数值型常量> | <字符型常量>
 * 
 */
function constExpresstion() {


}


/**
 * 变量
 * @default: <变量> => <标识符>
 */
function variableExpresstion() {


}


/**
 * 函数调用
 * @default: <函数调用> => <标识符>(<实参列表>)
 */
function functionExpression() {

}


/**
 * 实参列表
 * @default: <实参> | 3
 */
function argumentsExpression() {


}

/**
 * 实参
 * @default: <实参> => <表达式> | <表达式>,<实参>
 * @description: 消除回溯
 *    <实参> => <表达式><实参 Tail>
 *    <实参 Tail> => ,<实参> | 3
 */
function argumentExpression() {


}


export {
  computedExpression,
  itemExpresstion,
  factorExpresstion,
  constExpresstion,
  variableExpresstion,
  functionExpression,
  argumentsExpression,
  argumentExpression
}
