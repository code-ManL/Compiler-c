

function clearnWs(code: string) {
  for (let i = 0; i < code.length; i++) {
    console.log(code[i] === '\n');

    console.log(code[i]);
  }
}


function isAlpha(c: string) {
  return (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z')
}

function isDigit(v: string) {
  return v >= '0' && v <= '9'
}


export function parser(code: string) {
  
  

}