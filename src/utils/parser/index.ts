import type { Ttoken } from '../tokensize/types'
import { getNextToken, toThrowError } from './shared'
import { programEntry } from '../parser/program/index'


export function parser() {
  programEntry()
}


const a = 1
