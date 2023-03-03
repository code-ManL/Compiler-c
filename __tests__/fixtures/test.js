// // var inputCode = "i2nt test(){console.log(1)}"

// // var reservedWords = [
// //   "if",
// //   "int",
// //   "for",
// //   "while",
// //   "do",
// //   "return",
// //   "break",
// //   "continue",
// // ]
// // var operators = ["+", "-", "*", "/", "=", "<", ">", "!", ">=", "<=", "!=", "."]
// // var separators = [",", ";", "{", "}", "(", ")"]
// // let tokens = Lexical_Analysis(inputCode)

// // // 循环输出token
// // for (let index = 0; index < tokens.length; index++) {
// //   console.log(tokens[index])
// // }

// // function Lexical_Analysis(str) {
// //   let cur = 0
// //   let tokens = []

// //   while (cur < str.length) {
// //     if (/\s/.test(str[cur])) {
// //       // 跳过空格
// //       cur++
// //     } else if (/[a-z]/i.test(str[cur])) {
// //       // 读单词
// //       let word = "" + str[cur++]
// //       while (cur < str.length && /[a-z]/i.test(str[cur])) {
// //         // cur < str.length防止越界
// //         word += str[cur++]
// //       }
// //       if (reservedWords.includes(word)) {
// //         tokens.push({
// //           type: 1,
// //           value: word,
// //         }) // 存储保留字(关键字)
// //       } else {
// //         tokens.push({
// //           type: 2,
// //           value: word,
// //         }) // 存储普通单词
// //       }
// //     } else if (separators.includes(str[cur])) {
// //       tokens.push({
// //         type: 5,
// //         value: str[cur++],
// //       }) // 存储分隔符并将cur向右移动
// //     } else if (operators.includes(str[cur])) {
// //       let operator = "" + str[cur++]
// //       if ([">", "<", "!"].includes(operator)) {
// //         // 如果下一个字符是=就添加到operator并再次向右移动cur
// //         if ((str[cur] = "=")) {
// //           operator += str[cur++]
// //         }
// //       }
// //       tokens.push({
// //         type: 4,
// //         value: operator,
// //       }) // 存储运算符
// //       // 浮点数
// //     } else if (/^-?([1-9]\d*\.\d*|0\.\d*[1-9]\d*|0?\.0+|0)$/.test(str[cur])) {
// //       let flo = "" + str[cur++]
// //       // cur < str.length防止越界
// //       while (cur < str.length && /[0-9]/.test(str[cur])) {
// //         flo += str[cur++]
// //       }
// //       tokens.push({
// //         type: 6, //浮点数种别码
// //         value: flo,
// //       })
// //     } else if (/[0-9]/.test(str[cur])) {
// //       let val = "" + str[cur++]
// //       // cur < str.length防止越界
// //       while (cur < str.length && /[0-9]/.test(str[cur])) {
// //         val += str[cur++]
// //       }
// //       tokens.push({
// //         type: 3,
// //         value: val,
// //       }) // 存储整数数字
// //     } else {
// //       return "包含非法字符：" + str[cur]
// //     }
// //   }
// //   return tokens
// // }

// const state = {
//   "error": -1,
//   "initial": 0,
//   "charOpen": 1,
//   "charEnd": 2,
//   "numOpen": 3,
//   "numEnd": 4,
//   "separators": 5,
//   "operators": 6,
//   "logOpen": 7,
//   "logEnd": 8,
//   "fnOpen": 9,
//   "putOpen": 10,
//   "putEnd": 11,
//   "fnCharOpen": 12,
//   "fnCharEnd": 13,
// }

// function isAlpha(c) {
//   return (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z') || c === '_'
// }

// function isDigit(d) {
//   return d >= '0' && d <= '9'
// }

// function isSpace(s) {
//   return s === ' '
// }






// const punctuator = ["{", "}", ";", ",", "(", ")", "[", "]"]
// const keyword = ['function', 'var', 'let', 'const']


// export function tokenize(s) {
//   let token = []
//   const chars = []
//   let currentState = state.initial

//   while (s.length > 0) {
//     const c = s[0]
//     switch (currentState) {
//       case state.initial:
//         if (isAlpha(c)) {
//           currentState = state.charOpen
//           chars.push(c)
//           s = s.slice(1)
//         }
//         else if (isDigit(c)) {
//           currentState = state.numOpen
//           chars.push(c)
//           s = s.slice(1)
//         }
//         else if (isSpace(c)) {
//           s = s.slice(1)
//         }
//         break
//       case state.charOpen:
//         if (isAlpha(c)) {
//           chars.push(c)
//           s = s.slice(1)
//         }
//         else if (isDigit(c)) {
//           const c = chars.join('')
//           token.push({
//             type: 'Identifier',
//             state: 2,
//             value: c
//           })
//           chars.length = 0
//           currentState = state.numOpen
//         }
//         else if (isSpace(c)) {
//           const c = chars.join('')
//           if (keyword.includes(c)) {
//             token.push({
//               type: 'Keyword',
//               state: 1,
//               value: c
//             })
//           }
//           else {
//             token.push({
//               type: 'Identifier',
//               state: 2,
//               value: c
//             })
//           }
//           chars.length = 0
//           s = s.slice(1)
//           currentState = state.initial
//         }
//         else if (punctuator.includes(c)) {
//           const c = chars.join('')
//           if (keyword.includes(c)) {
//             token.push({
//               type: 'Keyword',
//               state: 1,
//               value: c
//             })
//           }
//           else {
//             token.push({
//               type: 'Identifier',
//               state: 2,
//               value: c
//             })
//           }
//           chars.length = 0
//           currentState = state.putOpen
//         }
//         break
//       case state.numOpen:
//         if (isDigit(c)) {
//           chars.push(c)
//           s = s.slice(1)
//         } else if (isAlpha(c)) {
//           const c = chars.join('')
//           token.push({
//             type: 'Number',
//             state: 3,
//             value: c
//           })
//           chars.length = 0
//           currentState = state.charOpen
//         } else if (isSpace(c)) {
//           s = s.slice(1)
//         }
//         break
//       case state.putOpen:
//         if (punctuator.includes(c)) {
//           token.push({
//             type: 'Punctuator',
//             state: 4,
//             value: c
//           })
//           s = s.slice(1)
//         }
//         else if (isAlpha(c)) {
//           currentState = state.charOpen
//         }
//         else if (isDigit(c)) {
//           currentState = state.numOpen
//         } else if (isSpace(c)) {
//           s = s.slice(1)
//         }
//         break
//     }
//   }

//   return token
// }



// let token = tokenize('function23 add(a,b){ }')
// console.log(token);
