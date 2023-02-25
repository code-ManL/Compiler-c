import FileSelector from "./fileSelector";
import Codemirror from "../codemirror";
import "./editor.scss";

function Editor() {
  return (
    <>
      <FileSelector />
      <div className="editor-container">
        <Codemirror />
      </div>
    </>
  );
}

export default Editor;
