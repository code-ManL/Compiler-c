import { useEffect, useMemo, useRef, useState } from "react";
import Editor from "../../components/editor/editor";
import "./index.scss";
import { GraphController, defineGraphConfig, defineGraph, defineLink, defineNode, PositionInitializers } from 'd3-graph-controller'




interface Istate {
  dragging: boolean;
  split: number;
}

interface Itargert {
  [key: string]: {
    children?: Itargert[] | undefined
  }
}

function Source() {
  const container = useRef<null | HTMLDivElement>(null);

  const [state, setState] = useState<Istate>({ dragging: false, split: 50 });

  // Any HTMLDivElement can be used as the container

  const target2 = {
    "<程序>": {
      "children": [{
        "<声明语句列表>": {
          "children": [{
            "<声明语句>": { "children": [{ "<数据类型>": { "children": [{ "let": {} }] } }, { "<标识符>": {} }, { "<声明语句'>": { "children": [{ "<标识符元'>": { "children": [{ "=": {} }, { "<表达式>": { "children": [{ "<算术表达式>": { "children": [{ "<项>": { "children": [{ "<因子>": { "children": [{ "<常量>": { "children": [{ "<整数>": {} }] } }] } }, { "<项'>": { "children": [{ "None": {} }] } }] } }, { "<算术表达式'>": { "children": [{ "None": {} }] } }] } }, { "<表达式'>": { "children": [{ "None": {} }] } }] } }] } }, { "<声明语句''>": { "children": [{ "None": {} }] } }] } }, { ";": {} }] }
          }, {
            "<声明语句列表>": {
              "children": [{ "None": {} }]
            }
          }]
        }
      }, {
        "<MAIN函数定义>": { "children": [{ "function": {} }, { "main": {} }, { "(": {} }, { ")": {} }, { "<复合语句>": { "children": [{ "{": {} }, { "<语句表>": { "children": [{ "<语句>": { "children": [{ "<声明语句>": { "children": [{ "<数据类型>": { "children": [{ "let": {} }] } }, { "<标识符>": {} }, { "<声明语句'>": { "children": [{ "<标识符元'>": { "children": [{ "=": {} }, { "<表达式>": { "children": [{ "<算术表达式>": { "children": [{ "<项>": { "children": [{ "<因子>": { "children": [{ "<常量>": { "children": [{ "<整数>": {} }] } }] } }, { "<项'>": { "children": [{ "None": {} }] } }] } }, { "<算术表达式'>": { "children": [{ "None": {} }] } }] } }, { "<表达式'>": { "children": [{ "None": {} }] } }] } }] } }, { "<声明语句''>": { "children": [{ "None": {} }] } }] } }, { ";": {} }] } }] } }, { "<语句表'>": { "children": [{ "None": {} }] } }] } }, { "}": {} }] } }] }
      }, { "<函数列表>": { "children": [{ "None": {} }] } }]
    }
  }

  let nodes: any[] = []
  let links: any[] = []
  function toDefineNode(target: any, node: any) {
    for (const item of target) {
      for (const key of Object.keys(item)) {
        const nodeItem = defineNode({
          id: key,
          type: 'secondary',
          isFocused: false,
          color: '#349469',
          label: {
            color: 'white',
            fontSize: '1rem',
            text: key,
          },
          radius: 32,
        })
        const link = defineLink({
          source: node,
          target: nodeItem,
          color: '#505b6d',
          label: {
            color: 'white',
            fontSize: '1rem',
            text: '',
          },
          length: 200,
        })
        nodes.push(nodeItem)
        links.push(link)
        if (item[key].children) {
          toDefineNode(item[key].children, nodeItem)
        }
      }
    }
  }

  useEffect(() => {
    if (target2["<程序>"].children) {
      nodes = []
      links = []
      const config = defineGraphConfig({
        nodeRadius: (node: any) => node.radius,
        simulation: {
          forces: {
            centering: {
              strength: (node: any) => (node.type === 'primary' ? 0.5 : 0.1),
            },
            link: {
              length: (link: any) => link.length,
            },
          },
        },
        positionInitializer: PositionInitializers.Randomized,
      })
      const node = defineNode({
        id: "<程序>",
        type: 'primary',
        isFocused: false,
        color: '#349469',
        label: {
          color: 'white',
          fontSize: '1rem',
          text: '<程序>',
        },
        radius: 64,
      })
      nodes.push(node)
      toDefineNode(target2["<程序>"].children, node)
      const container_graph = document.getElementById('graph') as HTMLDivElement;
      console.log(links, nodes);

      const graph = defineGraph({
        nodes,
        links,
      })
      new GraphController(container_graph, graph, config)
    }

  }, [])




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
        <div className="graph-container">
          <div id="graph" style={{ height: '100%' }}></div>
        </div>
        {/* <Editor fileTitle="Compiler"></Editor> */}
      </div>
    </div>
  );
}

export default Source;
