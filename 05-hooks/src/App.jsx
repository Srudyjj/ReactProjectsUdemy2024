import { useState } from 'react'
import './App.css'
import MagicNumber from './components/MagicNumber'
import SingUpToNewsLetter from './components/SingUpToNewsLetter'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <MagicNumber /> */}
      <SingUpToNewsLetter />
    </>
  )
}

export default App
