import { useState } from 'react'
import './App.css'
import MagicNumber from './components/MagicNumber'
import SingUpToNewsLetter from './components/SingUpToNewsLetter'
import MemoHook from './components/MemoHook'
import Parent from './components/Memo/Parent'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <MagicNumber /> */}
      {/* <SingUpToNewsLetter /> */}
      {/* <MemoHook /> */}
      <Parent />
    </>
  )
}

export default App
