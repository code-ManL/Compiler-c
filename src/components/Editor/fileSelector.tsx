import { useState } from "react";
import "./fileSelector.scss";

function FileSelector() {
  const [files, useFiles] = useState(["main.c"]);

  const importMapFile = "da.vue";

  const [pendingFilename, usePendingFilename] = useState("Comp.vue");
  const [pending, usePending] = useState(false);
  const [active, useActive] = useState(0);

  const startAddFile = () => {
    let i = 0;
    let name = `Comp.c`;

    while (true) {
      let hasConflict = false;
      for (const file of files) {
        if (file === name) {
          name = `Comp${++i}.c`;
          break;
        }
      }
      if (!hasConflict) {
        break;
      }
    }
    usePendingFilename(name);
    usePending(true);
  };

  const cancelAddFile = () => {
    usePending(false);
  };

  const doneAddFile = (value: string) => {
    if (!pending) return;

    const filename = value;

    if (!/\.(vue|js|ts|css)$/.test(filename)) {
      console.warn(`Playground only supports *.vue, *.js, *.ts, *.css files.`);
      return;
    }

    if (files.includes(filename)) {
      console.warn(`File "${filename}" already exists.`);
      return;
    }

    cancelAddFile();
    useFiles([...files, filename]);
    usePendingFilename(filename);
  };

  return (
    <div className="file-selector">
      {files.map((file, index) => {
        return (
          <div
            key={index}
            className={`file ${active == index ? "active" : ""}`}
            onClick={() => useActive(index)}
          >
            <span className="label">
              {file === importMapFile ? "Import Map" : file}
            </span>
            <span className="remove">
              <svg className="icon" width="12" height="12" viewBox="0 0 24 24">
                <line stroke="#999" x1="18" y1="6" x2="6" y2="18"></line>
                <line stroke="#999" x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </span>
          </div>
        );
      })}

      {pending ? (
        <div className="file pending">
          <input
            defaultValue={pendingFilename}
            onBlur={(e) => {
              doneAddFile(e.target.value);
            }}
          />
        </div>
      ) : (
        <></>
      )}

      <button className="add" onClick={startAddFile}>
        +
      </button>

      <div className="import-map-wrapper">
        <div className="file import-map">
          <span className="label">Import Map</span>
        </div>
      </div>
    </div>
  );
}

export default FileSelector;
