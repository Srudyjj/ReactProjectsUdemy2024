import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <div>The current count is...</div>
      <h1>0</h1>
      <div>
          <button>-</button>
          <button>+</button>
      </div>
    </div>
  )
}

export default App
