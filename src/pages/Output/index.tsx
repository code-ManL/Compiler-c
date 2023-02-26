import "./index.scss";
import Codemirror from "../../components/codemirror";
import Console from "./Console";
import { useState } from "react";

function Output() {
  const modes = ["Lexical analysis", "Syntax Parser", "Semantic analysis"];

  const [mode, useMode] = useState(modes[0]);

  return (
    <>
      <div className="output-pane">
        <div className="tab-buttons">
          {modes.map((item, k) => {
            return (
              <button
                key={k}
                className={`${mode == item ? "active" : ""}`}
                onClick={() => useMode(modes[k])}
              >
                <span>{item}</span>
              </button>
            );
          })}
        </div>
        <div className="output-container">
          <Codemirror />
        </div>
      </div>
      <div className="console-pane">
        <Console />
      </div>
    </>
  );
}

export default Output;
