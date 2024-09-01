import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
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
