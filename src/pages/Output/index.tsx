import "./index.scss";
import Codemirror from "../../components/codemirror";
import Console from "./Console";
import { useState } from "react";
import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, message, Space } from 'antd';
import storeCode from "../../store/tokenlize";

function Output() {
  const modes = ["Syntax Parser", "Semantic analysis"];

  const [mode, useMode] = useState(modes[0]);

  function handleCheck(k: number) {
    useMode(modes[k])
  }


  const onClick: MenuProps['onClick'] = ({ key }) => {
    message.info(`切换至 ${key}`);
    storeCode.dispatch({
      type: 'code',
      code:
`function add(a, b) {
  return a + b
}
      
function main() {
  let a = 1;
  let b = 2;
  return add(a, b);
}`})
  };

  const items: MenuProps['items'] = [
    {
      label: '状态机',
      key: '状态机',
    },
    {
      label: '正则',
      key: '正则',
    },
  ];

  return (
    <>
      <div className="output-pane">
        <div className="tab-buttons">
          <Dropdown menu={{ items, onClick }}>
            <a onClick={(e) => e.preventDefault()}>
              <Space style={{ padding: '0 20px', color: '#aaaaaa' }}>
                Lexical analysis
              </Space>
            </a>
          </Dropdown>
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
          <Codemirror output />
        </div>
      </div>
      <div className="console-pane">
        <Console />
      </div>
    </>
  );
}

export default Output;
