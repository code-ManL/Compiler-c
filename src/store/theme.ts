import { legacy_createStore as createStore } from 'redux'

type Tpre = {
  dark: boolean
}

type Taction = {
  type: string
}

const reducer = (prevState: Tpre = {
  dark: false
}, action: Taction) => {
  let newTheme = { ...prevState }
  switch (action.type) {
    case 'dark': newTheme.dark = true
      return newTheme
    default: newTheme.dark = false
      return newTheme
  }
}

const store = createStore(reducer)


export default store
