import { legacy_createStore as createStore } from 'redux'

type Taction = {
  type: string,
  code?: string
}

const code = `
function add(a, b) {
  return a + b
  
}

function main() {
  let a = 1;
  let b = 2;
  return add(a, b);
}
`

const reducer = (prevState: any = code, action: Taction) => {
  switch(action.type){
    case 'code':
      return action.code
  }
  return prevState
}

const store = createStore(reducer,)


export default store
