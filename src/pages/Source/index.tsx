import { useMemo, useRef, useState } from "react";
import Editor from "../../components/editor/editor";
import "./index.scss";

interface Istate {
  dragging: boolean;
  split: number;
}
function Source() {
  const container = useRef<null | HTMLDivElement>(null);

  const [state, setState] = useState<Istate>({ dragging: false, split: 50 });

  const boundSplit: number = useMemo(() => {
    const { split } = state;
    return split < 20 ? 20 : split > 80 ? 80 : split;
  }, [state]);

  let startPosition: number = 0;
  let startSplit: number = 0;

  const dragStart: (e: React.MouseEvent<HTMLDivElement>) => void = (e) => {
    e.preventDefault();

    // 每一次重新渲染，非响应式数据都变为初始值 console.log(startPosition, startSplit); 0 0
    setState({ ...state, dragging: true });

    // 点击时的初始位置
    startPosition = e.pageY; // Y
    startSplit = boundSplit; // 50%
    console.log(startPosition, startSplit);
  };

  const dragEnd = () => {
    setState({ ...state, dragging: false });
  };

  const dragMove: (e: React.MouseEvent<HTMLDivElement>) => void = (e) => {
    if (state.dragging) {
      const position = e.pageY - 70;
      const totalSize = container.current!.offsetHeight;
      const dp = position - startPosition;
      console.log(
        startSplit,
        position,
        startPosition,
        totalSize,
        "totalSize",
        dp
      );
      console.log(startSplit + (dp / totalSize) * 100);

      setState({ ...state, split: startSplit + (dp / totalSize) * 100 });
    }
  };

  return (
    <div
      className="source-container"
      ref={container}
      onMouseMove={dragMove}
      onMouseUp={dragEnd}
      onMouseLeave={dragEnd}
    >
      <div className="target" style={{ ["height"]: boundSplit + "%" }}>
        <Editor fileTitle="Target"></Editor>
      </div>
      <div className="compliler" style={{ ["height"]: 100 - boundSplit + "%" }}>
        <div className="dragger" onMouseDown={dragStart}>
          <span>==</span>
        </div>
        <Editor fileTitle="Compiler"></Editor>
      </div>
    </div>
  );
}

export default Source;
