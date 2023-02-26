import { useCodeMirror } from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { java } from "@codemirror/lang-java";
import { cpp } from "@codemirror/lang-cpp";
import { rust } from "@codemirror/lang-rust";
import { useEffect, useRef, useState } from "react";
import { eclipse } from "@uiw/codemirror-theme-eclipse";
import { abcdef } from "@uiw/codemirror-theme-abcdef";
import store from "../../store/theme";

import "./index.scss";

const code = `
int add(int a,int b){
  return a + b
}

int main(){
    int a = 1;
    int b = 2;
    return add(a,b);
}`;

const extensions = [javascript(), python(), java(), cpp(), rust()];

function Codemirror() {
  const editor = useRef(null);

  const [theme, useTheme] = useState(eclipse);

  const { setContainer } = useCodeMirror({
    container: editor.current,
    extensions,
    value: code,
    theme: theme,
  });

  store.subscribe(() => {
    const state = store.getState();
    if (state.dark) {
      useTheme(eclipse);
    } else {
      useTheme(abcdef);
    }
  });

  useEffect(() => {
    if (editor.current) {
      setContainer(editor.current);
    }
  }, [editor.current]);

  return (
    <div className="codemirror">
      <div ref={editor}></div>
    </div>
  );
}

export default Codemirror;
