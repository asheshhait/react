import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Card from './components/Card.jsx'


function App() {
  
  const [count, setCount] = useState(0)
let myobj = {
  username:"ashesh",
  age:21,
}
let myArray = [1,2,3,4]
  return (
    <>
      <h1 className='bg-green-300 text-black p-4 rounded-2xl'>telwind test</h1>
    <Card username="neon" someobj={myobj}/>
    <Card username="ashesh"/>
    </>
  )
}

export default App
