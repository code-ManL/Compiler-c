import { useCodeMirror } from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { java } from "@codemirror/lang-java";
import { cpp } from "@codemirror/lang-cpp";
import { rust } from "@codemirror/lang-rust";
import { useCallback, useEffect, useRef, useState } from "react";
import { eclipse } from "@uiw/codemirror-theme-eclipse";
import { abcdef } from "@uiw/codemirror-theme-abcdef";
import store from "../../store/theme";
import CodeMirror from '@uiw/react-codemirror';
import storeCode from "../../store/tokenlize";
import { tokenize } from '../../utils/tokensize'


import "./index.scss";
import { Ttoken } from "../../utils/tokensize/types";

const extensions = [javascript(), python(), java(), cpp(), rust()];

interface Iprops {
  input?: boolean,
  output?: boolean,
  inputName?: string
}

function formatter(token: Ttoken[]) {
  let s = `[
  `
  for (const item of token) {
    s = s + `{
      `+ JSON.stringify(item).slice(1, -1).split(',').join(`,\n      `) + `\n    },\n    `
  }
  s = s + ']'
  return s
}

function Codemirror(props: Iprops) {
  // console.log('zoule1');

  // 判断当前是哪个页面
  const { input, output, inputName } = props

  let [code, setCode] = useState<string>('')

  useEffect(() => {
    if (!output) {

      setCode(`function add(a, b) {
  return a + b
}

function main() {
  let a = 1;
  let b = 2;
  return add(a, b);
}
    `)
      storeCode.dispatch({
        type: 'da',
      });
    } else {
      storeCode.subscribe(() => {
        const state = storeCode.getState();
        console.log(output);
        const res = formatter(tokenize(state))
        // console.log(state);
        setCode(res)
      });
    }
  }, [])

  const [theme, useTheme] = useState(eclipse);

  store.subscribe(() => {
    const state = store.getState();
    if (state.dark) {
      useTheme(eclipse);
    } else {
      useTheme(abcdef);
    }
  });

  const handleChange = useCallback((value: string) => {
    if (!output) {
      storeCode.dispatch({
        type: 'code',
        code: value
      })
    }
    console.log('value:', value);
  }, []);


  return (
    <div className="codemirror">
      <CodeMirror
        value={code}
        extensions={extensions}
        theme={theme}
        onChange={handleChange}
      />
    </div >
  );
}

export default Codemirror;
