export * from './assignExpresstion'
export * from './booleanExpreestion'
export * from './computeExpressiton'
export * from './relationExpresstion'

import { getNextToken, toThrowError } from '../shared'
import { assgineExpression } from './assignExpresstion'
import { booleanExpression } from './booleanExpreestion'
import { computedExpression } from './computeExpressiton'
import { relationExpression } from './relationExpresstion'
/**
 * <表达式> => <算数表达式> | <关系表达式> | <布尔表达式> | <赋值表达式>
 */

export function expresstion() {
}







