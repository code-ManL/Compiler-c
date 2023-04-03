
/**
 * 布尔表达式
 * @default: <布尔表达式> => <布尔表达式>||<布尔项> | <布尔项>
 * @description: 消除左递归
 *  <布尔表达式> => <布尔项><布尔表达式 Tail>
 *  <布尔表达式 Tail> => ||<布尔项><布尔表达式 Tail> | 3
 */
function booleanExpression(){
  
}


/**
 * 布尔项
 * @default: <布尔项> => <布尔项>&&<布尔因子>|<布尔因子>
 * @description: 消除左递归
 *    <布尔项> => <布尔因子><布尔项 Tail>
 *    <布尔项 Tail> => &&<布尔因子><布尔项 Tail> | 3
 */
function booleanItemExprerssion(){

}

/**
 * 布尔因子
 * @default: <布尔因子> => <算术表达式>|<关系表达式>|!<布尔表达式>
 */
function booleanFactorExpression(){


}


export {
  booleanExpression,
  booleanItemExprerssion,
  booleanFactorExpression
}
