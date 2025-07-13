import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'


function App() {

  let[counter, setcounter] = useState(0) // this use State for ui update 

 let value = 0

 const addValue = () =>{
  // console.log("value enter",counter)
 
  // value = value +1 
  setcounter(counter+1)
   console.log("clicked",counter)
 }
  const removeValue = () =>{
  // console.log("value enter",counter)
  // value = value -1
  setcounter(counter-1)
  console.log("clicked",counter)
 }
  return (
    <>
      <h1>hello</h1>
      <h3>counter value : {counter}</h3>

      <button
      
      onClick={addValue}>add value  {counter}</button>
      <br />
      <button
      onClick={removeValue}
      >remove value {counter}</button>

    </>
  )
}

export default App
