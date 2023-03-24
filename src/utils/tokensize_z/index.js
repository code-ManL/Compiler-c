

import {
    isKeyword,
    isOperator,
    isObject,
    isBlank,
    isDelimiter
} from './enum'





const regexNum = /\d/
const regexAlpha = /[a-z]|[A-Z]/
const regexAlphaAndLine = /[a-z]|[A-Z]|_/
const regexAlphaAndLineAndNum = /[a-z]|[A-Z]|_|[0-9]/

//匹配任意八进制，十六进制，十进制或者科学计数法的数字
const regexNumber = /[-+]?(?:0[xX][\da-fA-F]+|\d+(?:\.\d*)?(?:[eE][+-]?\d+)?|0[0-7]*)/

//匹配单个操作符
const regexOperator = /[\+\-\*\/\%\>\<\=\&\|\^\~\!\?]/

// 匹配单行注释和多行注释
const regexSingleExplain = /\/\/.*$/ //单行注释
const regexMutiExplain = /\/\*[\s\S]*?\*\// //多行注释

//字符串匹配
const regexString = /(['"`])(?:\\\1|.)*?\1/

/**
* Lex类
*/
export class Lex {
    //类型常量
    static TYPE_KEYWORD = 'keyword' //关键字
    static TYPE_IDENTIFIER = 'identifier' //标识符
    static TYPE_OPERATOR = 'operator' //操作符
    static TYPE_DELIMITER = 'delimiter' //界符
    static TYPE_STRING = 'string' //字符串
    static TYPE_NUMBER = 'number' //数值
    static TYPE_BIGINT = 'bigint' //es6类型 bigint

    constructor(content) {
        if (typeof content !== 'string') {
            return new Error('The content is Error！')
        }

        this.content = content;
        this.contentLen = content.length;
        this.tokens = [];
        this.error = [];
        this.cur = 0;
        this.row = 1;
        this.col = 1;
    }

    addToken(type, value) {
        this.tokens.push({
            type,
            value,
            col: this.col - value.length,
            row: this.row,
            len: value.length
        })
        if (this.cur + 1 < this.contentLen && this.content[this.cur + 1] === '\n') {
            this.tokens[this.tokens.length - 1].isEnd = true
        }
    }

    addError(type, value = '词法有误！') {
        this.error.push({
            type,
            discription: value,
            col: this.col,
            row: this.row
        })
        //跳过错误
        this.error[this.error.length - 1].source = this.passLineEnd()
    }

    next() {
        this.cur++
        this.col++
        if (this.content[this.cur] === '\n') {
            this.row++
            this.col = 1
        }
    }

    passN(n) {
        while (n--) this.next()
    }

    passLineEnd() {
        let errorString = ''
        while (!isBlank(this.content[this.cur]) && this.cur !== this.contentLen) {
            errorString += this.content[this.cur]
            this.next()
        }
        return errorString
    }

    getKeyword(ch) {
        let word = ch
        while (this.cur + 1 < this.contentLen && regexAlphaAndLineAndNum.test(this.content[this.cur + 1])) {
            this.next()
            word += this.content[this.cur]
        }
        return word
    }

    getOperator() {
        let operator = this.content[this.cur], i = this.cur
        while (this.cur + 1 < this.contentLen && regexOperator.test(this.content[i + 1])) {
            operator += this.content[++i]
        }
        if (!isOperator(operator)) {
            this.addError('OperationError', 'The operator is undefined !')
            return null
        }
        this.passN(operator - 1)
        return operator
    }

    // 匹配单行注释
    getSingleExplain() {
        let begin = this.cur, end = this.cur
        while (this.content[end++] !== '\n');
        const lineStr = this.content.substring(begin, end)
        this.passN(lineStr.length - 1)
        return lineStr
    }

    // 匹配多行注释
    getMutiExplain() {
        let leftStr = this.content.substring(this.cur, this.contentLen)
        let match = leftStr.match(regexMutiExplain)
        if (!match) {
            this.addError('OprationError', 'The corresponding closure ID was not found !')
            return null
        }
        this.passN(match[0].length - 1)
        return match[0]
    }

    //匹配字符串
    getString() {
        let leftStr = this.content.substring(this.cur, this.contentLen)
        let match = leftStr.match(regexString)
        if (!match) {
            this.addError('StringError', 'The string quotation marks are not closed !')
            return null
        }
        this.passN(match[0].length - 1)
        return match[0]
    }

    //匹配数字
    getNumber() {
        let leftStr = this.content.substring(this.cur, this.contentLen)
        let match = leftStr.match(regexNumber)

        if (!match) {
            this.addError('NumberError', 'No number matched!')
            return null
        }

        // 判断数字最后一个字符是否为转义符和界符且为m
        let len = match[0].length
        let last = this.content[this.cur + len]
        const right = isBlank(last) || /\)|]|}|,|;/.test(last) || last === 'm'
        if (!right) {
            this.addError('NumberError', 'The numbers match incorrectly !')
            return null
        }
        if (match[0].length > 10) {
            this.addError('NumberError', 'The number size exceeds the limit !')
            return null
        }
        this.passN(match[0].length - 1)
        return match[0]
    }

    //主构建函数
    build() {
        let char, type, word

        while (this.cur < this.content.length) {
            char = this.content[this.cur]
            word = ''

            //匹配字母或者下划线
            if (regexAlphaAndLine.test(char)) {
                //得到单词分词
                word = this.getKeyword(char)

                //判断是否在关键字词组中
                if (isKeyword(word) || isObject(char)) {
                    type = Lex.TYPE_KEYWORD
                } else {
                    type = Lex.TYPE_IDENTIFIER
                }
                this.addToken(type, word)
            }

            // 匹配到操作符
            else if (regexOperator.test(char)) {
                //匹配到 /，注释全部跳过
                if (this.cur + 1 < this.contentLen && char === '/') {

                    //匹配到单行注释
                    if (this.content[this.cur + 1] === '/') {
                        this.getSingleExplain()
                    }
                    // 匹配多行注释
                    else if (this.content[this.cur + 1] === '*') {
                        this.getMutiExplain()
                    } else {
                        this.addError('OprationError', 'The symbol "/" has no corresponding match !')
                        if (!word) continue;
                    }
                }

                else {
                    word = this.getOperator()
                    if (!word) continue;

                    type = Lex.TYPE_OPERATOR
                    this.addToken(type, word)
                }
            }

            else if (/[-+]|\d/.test(char)) {
                word = this.getNumber()
                if (!word) continue;

                type = Lex.TYPE_NUMBER

                if (this.cur + 1 < this.contentLen && this.content[this.cur + 1] === 'm') {
                    word += 'm'
                    this.next()
                    type = Lex.TYPE_BIGINT
                }
                this.addToken(type, word)
            }

            // 匹配到界符
            else if (isDelimiter(char)) {
                if (/['"`]/.test(char)) {
                    this.addToken(Lex.TYPE_OPERATOR, char)
                    let str = this.getString(this.cur)
                    if (!str) continue;
                    let inner = str.substring(1, str.length - 1)
                    this.addToken(Lex.TYPE_STRING, inner)
                    this.addToken(Lex.TYPE_OPERATOR, str[str.length - 1])
                }
                else {
                    word = char
                    type = Lex.TYPE_DELIMITER
                    this.addToken(type, word)
                }
            } else {
                if (!isBlank(char)) {
                    this.pushError('UndefinedError', 'The symbol is undefined !')
                    if (!word) continue;
                }
            }

            //获取下一个字符        
            this.next()
        }
        // 返回一个tokens数组和error数组
        return {
            tokens: this.tokens,
            error: this.error
        }
    }
}


