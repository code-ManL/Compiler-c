function add(a, b) {
  let a = 1
  for (let i = 0; i < 3; i++) {
    let j = 0
    while (j < i) {
      j++
      console.log(j + "123")
    }
  }
  return a > b ? 1 : 2;
}
// 21312
