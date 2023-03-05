import { useRef } from "react";
import Header from "./pages/Header";
import Repl from "./pages/Repl";
import "./style/App.css";

function App() {
  return (
    <div className="App">
     <Header></Header>
      <Repl></Repl>
    </div>
  );
}

export default App;



// import React, { useState } from "react";

// export default function App() {
//   const [count, setCount] = useState(0);
//   const [flag, setFlag] = useState(false);

//   function handleClick() {
//     let n = 10
//     while (n--) { //批处理，变为1
//       console.log(count);
//       setCount(count + 1);
//       console.log(count);
//       setCount(count + 1);
//       console.log(count);
//       setFlag(f => !f);
//     }
//   }
//   console.log('render')
//   return (
//     <div>
//       <button onClick={handleClick}>Next</button>
//       <h1 style={{ color: flag ? "blue" : "black" }}>{count}</h1>
//     </div>
//   );
// }

// function App() {
//   const [a, setA] = useState(1)
//   const [b, setB] = useState('b')
//   console.log('render')

//   function handleClickWithPromise() {
//     Promise.resolve().then(() => {
//       setA((a) => a + 1)
//       setB('bb')
//     })
//   }

//   function handleClickWithoutPromise() {
//     setA(a + 1)
//     setA(a + 1)
//     setA(a + 1)
//     setA(a + 1)
//     setA((a) => a + 1)
//     // setB('bb')
//   }

//   return (
//     <>
//       <button onClick={handleClickWithPromise}>
//         {a}-{b} 异步执行
//       </button>
//       <button onClick={handleClickWithoutPromise}>
//         {a}-{b} 同步执行
//       </button>
//     </>
//   )
// }
// export default App
