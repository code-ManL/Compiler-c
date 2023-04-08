


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


function main() {
  let b = 2
}



const obj = {
}

const globalMatch = /<.*>/

function judgeNone(key) {
  let arr = test[key]
  for (const temp of arr) {
    if (temp[0] === 'None') {
      return true
    } else if (temp[0].match(globalMatch)) {
      return judgeNone(temp[0])
    }
  }
  return false
}

function getFirst(key, arr = [], index = -1, target = obj) {
  if (!Array.isArray(key) && !target[key]) {
    console.log(key);
    return arr
  }
  // const arrs = index === -1 ? test[key] : [test[key][index]]
  const arrs = !Array.isArray(key) ? target[key] : [key]
  // 遍历每一个候选
  for (const splitBlock of arrs) {
    // 分割每一个候选
    for (let i = 0; i < splitBlock.length; i++) {
      // 访问每一个候选
      const prefix = splitBlock[i]
      // 如果候选是 < 开头，则说明是非终结符
      if (prefix.match(globalMatch)) {
        // 拿到非终结符中的first
        let temp = new Set(getFirst(prefix))
        // 删除 None
        const hasNone = temp.delete('None')
        arr.push(...Array.from(temp))
        // 如果没有 None 就 break 结束
        if (!hasNone) {
          break
        }
      } else {
        arr.push(prefix)
        break
      }
    }
  }
  return Array.from(new Set(arr))
}



function getFollow(key, arr = [], target = obj) {
  if (!Array.isArray(key) && !target[key])
    return arr
  if (key === "<E>")
    arr.push("#")
  for (const item of Object.keys(target)) {
    const lang = target[item]
    for (const splitBlock of lang) {
      // 先判断候选中是否含有查找的非终结符
      // 如果候选中含有寻找的key
      if (splitBlock.includes(key)) {
        // 如果非终结符在最后，把follow(key)加入
        const keyIndex = splitBlock.findIndex(item => item === key)
        let hasNone = true
        // A -> aABa first(B)  A -> aAa A -> aA(不会走循环)
        for (let i = keyIndex + 1; i < splitBlock.length; i++) {
          if (splitBlock[i].match(globalMatch)) {
            let temp = new Set(getFirst(splitBlock[i]))
            // 删除 None
            temp.delete('None')
            arr.push(...Array.from(temp))
          } else {
            arr.push(splitBlock[i])
            hasNone = false
            break
          }
          if (!judgeNone(splitBlock[i])) {
            hasNone = false
            break
          }
        }
        // A -> aAB B -> None   A -> aA
        if (hasNone) {
          if (key !== item) {
            // 拿到非终结符中的follow
            const temp = new Set(getFollow(item))
            arr.push(...Array.from(temp))
          }
        }
      }
    }
  }
  return Array.from(new Set(arr))
}


var test = {
  '<一>': ["<二> <三>", "<三>"],
  "<二>": ["const <一> /", "let"],
  "<三>": ["+ <四>", "main () <五>", "<六> <七>"],
  "<五>": ["i", "j"],
  "<六>": ["=", "None"],
  "<七>": ["(", ")"],
}



// i + i * i
test = {
  "<E>": [["<T>", "<E'>"]],
  "<E'>": [["+", "<T>", "<E'>"], ["None"]],
  "<T>": [["<F>", "<T'>"]],
  "<T'>": [["*", "<F>", "<T'>"], ["None"]],
  "<F>": [["(", "<E>", ")"], ["i"]]
}


// for (const key of Object.keys(test)) {
//   console.log(key, getFirst(key));
// }
// console.log('----------------------------------------------------------------');
// for (const key of Object.keys(test)) {
//   console.log(key, getFollow(key));
// }


// const r = getFirst('<三>')
// console.log(r);


// const d = getFollow('<二>')
// console.log(d);

function transform(s) {
  let arr = s.split('\n')
  arr.shift()
  arr.pop()
  for (const item of arr) {
    const v = item.split("->")
    const temp = v[1].split("|").map(t => t.trim())
    obj[v[0].trim()] = temp.map(item => item.split(" "))
  }
  obj["<布尔表达式'>"] = ["||<表达 式>", 'None']
}

// transform(GRAMMAR)
// console.log(obj);

// console.log(getFirst(["+", "<T>", "<E'>"]));

let tokens = [
  {
    "col": 7,
    "row": 0,
    "start": 0,
    "state": 1,
    "type": "Keyword",
    "value": "function",
  },
  {
    "col": 12,
    "row": 0,
    "start": 9,
    "state": 2,
    "type": "Identifier",
    "value": "main",
  },
  {
    "col": 13,
    "row": 0,
    "start": 13,
    "state": 4,
    "type": "Punctuator",
    "value": "(",
  },
  {
    "col": 14,
    "row": 0,
    "start": 14,
    "state": 4,
    "type": "Punctuator",
    "value": ")",
  },
  {
    "col": 15,
    "row": 0,
    "start": 15,
    "state": 4,
    "type": "Punctuator",
    "value": "{",
  },
  {
    "col": 20,
    "row": 0,
    "start": 18,
    "state": 1,
    "type": "Keyword",
    "value": "let",
  },
  {
    "col": 22,
    "row": 0,
    "start": 22,
    "state": 2,
    "type": "Identifier",
    "value": "a",
  },
  {
    "col": 24,
    "row": 0,
    "start": 24,
    "state": 6,
    "type": "Operators",
    "value": "=",
  },
  {
    "col": 26,
    "row": 0,
    "start": 26,
    "state": 4,
    "type": "Punctuator",
    "value": "1",
  },
  {
    "col": 27,
    "row": 0,
    "start": 27,
    "state": 4,
    "type": "Punctuator",
    "value": ";",
  },
  {
    "col": 28,
    "row": 0,
    "start": 28,
    "state": 4,
    "type": "Punctuator",
    "value": "}",
  },
]



let token = tokens[0]

function getNextToken() {
  tokens.shift()
  token = tokens[0]
}



// function main ( ) { let a = 1 }
function parser(key = "<程序>", dep = 2, target = obj) {
  // 遍历某个 key 的所有候选式
  if (target[key]) {
    for (let i = 0; i < target[key].length; i++) {
      // 拿到其中一个候选式进行判断
      const check = target[key][i]
      // 如果当前遍历的候选式包含当前的token
      if (getFirst(check).includes(token.value)) {
        // 遍历当前候选式的所有非终结符
        for (let j = 0; j < check.length; j++) {
          const vt = check[j]
          console.log(key, vt, check, token ? token.value : undefined);
          if (!token) {
            return
          } else if (vt === token.value) {
            console.log(new Array(dep).fill("-").join(''), token.value);
            getNextToken()
            // break
          } else {
            parser(vt, dep + 1)
          }
        }
        // 如果当前候选式的first集合有token，执行完毕就可以break了，无回溯
        break
      } else if (i === target[key].length - 1) {
        console.log(key, check, token ? token.value : undefined);
        if (getFollow(key).includes(token.value) && check.length === 1 && check[0] === 'None') {
          console.log(new Array(dep).fill("-").join(''), 'None');
        } else {
          // 最后一个且不属于follow或者最后一个也不能匹配，直接g
          console.log('gg');
          return
        }
      }
    }

  } else {
    return
  }
}

transform(GRAMMAR)
// console.log(obj);
parser()

// console.log(getFirst(['<声明语句列表>', '<MAIN函数定义>', '<函数列表>']));



// console.log(getFirst(["<T>", "<E'>"]));
// function parser(key = "<E>", dep = 2) {
//   // 遍历某个 key 的所有候选式
//   if (test[key]) {
//     for (let i = 0; i < test[key].length; i++) {
//       // 拿到其中一个候选式进行判断
//       const check = test[key][i]
//       // 如果当前遍历的候选式包含当前的token
//       if (getFirst(check).includes(token.value)) {
//         // 遍历当前候选式的所有非终结符
//         for (let j = 0; j < check.length; j++) {
//           const vt = check[j]
//           // console.log(key, vt, check, token);
//           if (!token) {
//             return
//           } else if (vt === token.value) {
//             console.log(new Array(dep).fill("-").join(''), token.value);
//             getNextToken()
//             // break
//           } else {
//             parser(vt, dep + 1)
//           }
//         }
//         // 如果当前候选式的first集合有token，执行完毕就可以break了，无回溯
//         break
//       } else if (i === test[key].length - 1 && check.length === 1 && check[0] === 'None') {
//         if (getFollow(key).includes(token.value)) {
//           console.log(new Array(dep).fill("-").join(''), 'None');
//         } else {
//           // 不属于follow直接g
//           console.log('gg');
//         }
//       }
//     }
//   } else {
//     return
//   }
// }
