import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Dummy from './component/dummy'
import Web3Provider from './context/Web3Provider'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Web3Provider>
     <Dummy></Dummy>
        </Web3Provider>
    </>
  )
}

export default App
