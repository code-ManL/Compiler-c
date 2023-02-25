import React, { useMemo, useRef, useState } from "react";
import Editor from "../../components/Editor/editor";
import Output from "../Output";
import "./index.scss";

function SplitPane() {
  const container = useRef(null);

  const isVertical = false;

  const [state, setState] = useState({ dragging: false, split: 50 });

  const boundSplit = useMemo(() => {
    const { split } = state;
    return split < 20 ? 20 : split > 80 ? 80 : split;
  }, [state]);

  let startPosition = 0;
  let startSplit = 0;

  const dragStart = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();

    // 每一次重新渲染，非响应式数据都变为初始值 console.log(startPosition, startSplit); 0 0
    setState({ ...state, dragging: true });
    startPosition = isVertical ? e.pageY : e.pageX;
    startSplit = boundSplit;
    console.log(startPosition, startSplit);
  };

  const dragEnd = () => {
    setState({ ...state, dragging: false });
  };

  const dragMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (state.dragging) {
      // 获取x
      const position = isVertical ? e.pageY : e.pageX;
      // 获取offsetWidth
      const totalSize = isVertical
        ? container.current!.offsetHeight
        : container.current!.offsetWidth;
      const dp = position - startPosition;

      console.log(totalSize);
      

      setState({ ...state, split: startSplit + ~~((dp / totalSize) * 100) });
      console.log(totalSize, "走了");
    }
  };

  return (
    <div
      className="split-pane"
      ref={container}
      onMouseMove={dragMove}
      onMouseUp={dragEnd}
      onMouseLeave={dragEnd}
    >
      {/* 编辑 */}
      <div
        className="left"
        style={{ [isVertical ? "height" : "width"]: boundSplit + "%" }}
      >
        <Editor></Editor>
        <div className="dragger" onMouseDown={dragStart} />
      </div>
      <div
        className="right"
        style={{ [isVertical ? "height" : "width"]: 100 - boundSplit + "%" }}
      >
        <Output />
      </div>
    </div>
  );
}

export default SplitPane;
