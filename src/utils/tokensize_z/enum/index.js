/**
 * 该文件用于存储JS词法特性
 * 
 * 
 * 
 */

// JS关键字

import keywordList from './js-package/js_keyword'

//JS保留对象属性方法符
import ObjectList from './js-package/js_objectFuncAbs'

//运算符
import operatorList from './js-package/js_operator'

//界符
import delimiterList from './js-package/js_delimiter'

//界符
import blankList from './js-package/js_blank'

/**
 * 是否是关键字
 * @param {*} char 
 * @returns 
 */
function isKeyword(char) {
  return keywordList.findIndex(p => p === char) !== -1
}

/**
 * 是否是操作符
 * @param {*} char 
 * @returns 
 */
function isOperator(char) {
  return operatorList.findIndex(p => p === char) !== -1
}

/**
 * 是否是属性对象
 * @param {*} char 
 * @returns 
 */
function isObject(char) {
  return ObjectList.findIndex(p => p === char) !== -1
}

/**
 * 是否是空白符
 * @param {*} char 
 * @returns 
 */
function isBlank(char) {
  return blankList.findIndex(p => p === char) !== -1
}

/**
 * 是否是界符
 * @param {*} char 
 * @returns 
 */
function isDelimiter(char) {
  return delimiterList.findIndex(p => p === char) !== -1
}


export {
  keywordList,
  operatorList,
  ObjectList,
  delimiterList,
  blankList,
  isKeyword,
  isOperator,
  isObject,
  isBlank,
  isDelimiter
}
