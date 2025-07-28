import { useState } from 'react'
import './App.css'
import UserContextProvider from './context/userContextProvider'
import Profile from './components/profile'
import Login from './components/login'

function App() {
  const [count, setCount] = useState(0)

  return (
    <UserContextProvider>
      <h6>context api global veriable to  component  instate of using it in every parent component </h6>
     <Login/>
     <Profile/>
    </UserContextProvider>
  )
}

export default App
