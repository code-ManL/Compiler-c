
const GRAMMAR = `
<程序> -> <声明语句列表> <MAIN函数定义> <函数列表>
<MAIN函数定义> -> main ( ) <复合语句>
<函数列表> -> <函数定义> <函数列表> | None
<数据类型> -> const | var | let
<数据声明> -> <数据类型> <标识符列表>
<标识符列表> -> <标识符元> <标识符列表'> | None
<标识符列表'> -> , <标识符列表> | None
<标识符元> -> <标识符> <标识符元'>
<标识符元'> -> = <表达式> | None
<变量声明> -> <数据声明>
<值声明> -> <变量声明>
<值声明语句> -> <值声明> ;
<函数形参列表> -> <形参元> <函数形参列表'> | None
<函数形参列表'> -> , <形参元> | None
<函数实参列表> -> <实参> | None
<实参> -> <表达式> <实参'>
<实参'> -> , <实参> | None
<形参元> -> <数据类型> <标识符>
<函数声明形参列表> -> <声明形参元> <函数声明形参列表'> | None
<函数声明形参列表'> -> , <声明形参元> | None
<声明形参元> -> <数据类型>
<函数定义声明> -> function <标识符> ( <函数形参列表> )
<声明语句> -> function <标识符> ( <函数声明形参列表> ) ; | <数据类型> <标识符> <声明语句'> ;
<声明语句'> -> <标识符元'> <声明语句''> | ( <函数声明形参列表> ) | None
<声明语句''> -> , <标识符列表> | None
<声明语句列表> -> <声明语句> <声明语句列表> | None
<函数定义> -> <函数定义声明> <复合语句>
<函数调用> -> <标识符> ( <函数实参列表> )
<函数调用语句> -> <函数调用> ;
<语句> -> <声明语句> | <执行语句>
<执行语句> -> <数据处理语句> | <控制语句> | <复合语句>
<数据处理语句> -> <标识符> <数据处理语句'> ;
<数据处理语句'> -> = <表达式> | ( <函数实参列表> )
<控制语句> -> <IF语句> | <循环语句> | <RETURN语句>
<复合语句> -> { <语句表> }
<语句表> -> <语句> <语句表'>
<语句表'> -> <语句表> | None
<IF语句> -> if ( <表达式> ) <IF语句'>
<IF语句'> -> <复合语句> <IF语句''>
<IF语句''> -> else <复合语句> | None
<循环语句> -> <FOR语句> | <WHILE语句>
<FOR语句> -> for ( <表达式> ; <表达式> ; <表达式> ) <循环体语句>
<WHILE语句> -> while ( <表达式> ) <循环体语句>
<循环体语句> -> <声明语句> | <循环执行语句> | <循环用复合语句> | ;
<循环执行语句> -> <循环语句> | <循环用IF语句> | <RETURN语句> | <BREAK语句> | <CONTINUE语句> | <数据处理语句>
<循环用复合语句> -> { <循环体语句表> }
<循环体语句表> -> <循环体语句> <循环体语句表'>
<循环体语句表'> -> <循环体语句表> | None
<循环用IF语句> -> if ( <表达式> ) <循环体语句> <循环用IF语句'>
<循环用IF语句'> -> else <循环体语句> | None
<RETURN语句> -> return <RETURN语句'> ;
<RETURN语句'> -> <表达式> | None
<BREAK语句> -> break ;
<CONTINUE语句> -> continue ;
<表达式语句> -> <表达式> ;
<表达式> -> <算术表达式> <表达式'>
<表达式'> -> <关系表达式> <表达式''> | <赋值表达式> | <布尔表达式> | None
<表达式''> -> <布尔表达式> | None
<算术表达式> -> <项> <算术表达式'>
<算术表达式'> -> + <算术表达式> | - <算术表达式> | None
<项> -> <因子> <项'>
<项'> -> * <项> | / <项> | % <项> | None
<因子> -> + <因子> | - <因子> | ( <表达式> ) | <常量> | <标识符> <因子'> | ! <因子>
<因子'> -> ( <函数实参列表> ) | None
<常量> -> <数值型常量> | <字符> | <字符串>
<数值型常量> -> <整数> | <实数>
<关系表达式> -> <关系运算符> <算术表达式>
<关系运算符> -> < | <= | > | >= | == | !=
<布尔表达式> -> <布尔项> <布尔表达式'>
<布尔表达式'> -> || <表达式> | None
<布尔项> -> && <布尔因子> | None
<布尔因子> -> <表达式>
<赋值表达式> -> = <表达式>
`

const obj = {
}

const test = {
  '<一>': ["<二>", "<三>"],
  "<二>": ["const", "let"],
  "<三>": ["+<四>", "main()<五>"],
  "<五>": ["i", "j"]
}


function getFirst(key, arr = []) {
  const arrs = test[key]
  for (const i of arrs) {
    const match = i.match(/(<[\u4e00-\u9fa5]+>)/)
    if (match) {
      // 开头是非终结符
      if (match['index'] === 0) {
        getFirst(match[0], arr)
      } else {
        // 如果开头是终结符
        const prefix = i.slice(0, match['index'])
        if (["if(", "while(", "for(", "main()"].includes(prefix)) {
          arr.push(prefix.slice(0, prefix.indexOf("(")))
        } else {
          arr.push(prefix.slice(0, match['index']))
        }
      }
    }
    else {
      arr.push(i)
    }
  }
  return arr
}


const r = getFirst('<二>')


function hasNone(key) {

}

function getFollow(key, arr = []) {
  for (const item of Object.keys(obj)) {
    const lang = obj[item]
    for (const langItem of lang) {
      // 先判断候选中是否含有查找的非终结符
      const index = langItem.indexOf(key)
      if (index !== -1) {
        // 如果非终结符在最后，把follow(key)加入
        if (key.length + index === langItem.length) {
          const keyTemp = langItem.slice(index)
          // 防止死循环 E -> TE
          if (key !== keyTemp) {
            arr.push(...getFollow(keyTemp))
          }
        }
        // 如果非终结符不在最后，但是后面还有一个或多个非终结符，并且能推出 None
        else if (item[key.length + index] === '<') {
          const nextVt = 'da'
          // 如果后面这个非终结符推的出None
          if (hasNone(nextVt)) {

          }
          // 如果后面这个非终结符推不出 None
          else {
            arr.push(...getFirst(nextVt))
          }
        }
        // 如果后面跟着的是终结符
        else {
          arr.push()
        }
      }
    }
  }
  return arr
}


function transform(s) {
  let arr = s.split('\n')
  arr.shift()
  arr.pop()
  for (const item of arr) {
    let temp = item.replaceAll(" ", '')
    const v = temp.split("->")
    obj[v[0]] = v[1].split("|")
  }
  obj["<布尔表达式'>"] = ["||<表达式>", 'None']
  console.log(obj);
}

// transform(GRAMMAR)
// getFollow()

console.log('231231da123'.indexOf('da') + 'da'.length);
