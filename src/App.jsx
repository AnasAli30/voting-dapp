
import Web3Provider from './context/Web3Provider'
import './App.css'
import {routes} from "./routes/routes.jsx"
import { RouterProvider } from 'react-router-dom'

function App() {

  return (
    <>
     <Web3Provider>
      <RouterProvider router={routes}></RouterProvider>
        </Web3Provider>
       
    </>
  )
}

export default App
