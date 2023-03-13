import "./index.scss";
import Codemirror from "../../components/codemirror";
import Console from "./Console";
import { useState } from "react";

function Output() {
  const modes = ["Lexical analysis", "Syntax Parser", "Semantic analysis"];

  const [mode, useMode] = useState(modes[0]);

  function handleCheck(k: number) {
    useMode(modes[k])
  }

  return (
    <>
      <div className="output-pane">
        <div className="tab-buttons">
          {modes.map((item, k) => {
            return (
              <button
                key={k}
                className={`${mode == item ? "active" : ""}`}
                onClick={() => handleCheck(k)}
              >
                <span>{item}</span>
              </button>
            );
          })}
        </div>
        <div className="output-container">
          <Codemirror output/>
        </div>
      </div>
      <div className="console-pane">
        <Console />
      </div>
    </>
  );
}

export default Output;
