import FileSelector from "./fileSelector";
import Codemirror from "../codemirror";
import "./editor.scss";
import { IEditorProps } from "./types";

function Editor(props: IEditorProps) {
  return (
    <>
      <FileSelector {...props}></FileSelector>
      <div className="editor-container">
        <Codemirror />
      </div>
    </>
  );
}

export default Editor;
