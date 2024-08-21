import { useState } from "react";
import "./App.css"

function App() {

  const [count, setCount] = useState(0);

  
const addToCount = () => {
  if (count < 10) {
    setCount(count + 1);
  }
};

const subtractFromCount = () => {
  if (count > 0) {
    setCount(count - 1);
  }
};

  return (
    <div>
      <div>The current count is...</div>
      <h1>{count}</h1>
      <div>
          <button onClick={subtractFromCount}>-</button>
          <button onClick={addToCount}>+</button>
      </div>
    </div>
  );
}

export default App;