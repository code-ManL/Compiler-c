
/**
 * 函数声明
 * @default: <函数声明> => <标识符>(<函数声明形参列表>)
 * 
 */
function functionDeclareSentence() {

}
export var functionDeclareSentence_first:string[] = []
export var functionDeclareSentence_follow:string[] = []

/**
 * 函数声明形参列表
 * @default: <函数声明形参列表> => <函数声明形参> | 3
 */
function functionArgumnetsTableDeclareSentence() {

}

/**
 * 函数声明形参
 * @default: <函数声明形参> => <变量类型> | <变量类型>,<函数声明形参>
 * @description: 消除回溯
 *    <函数声明形参> => <变量类型><函数声明形参 Tail>
 *    <函数声明形参 Tail> => ,<函数声明形参> | 3
 */
function functionArgumnetsDeclareSentence() { 

}


export {
  functionArgumnetsDeclareSentence,
  functionArgumnetsTableDeclareSentence,
  functionDeclareSentence
}
