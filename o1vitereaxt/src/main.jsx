import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import React from 'react'
 function Myapp(){

  const username  = "ashesh hait"
  return(
    <div>
      <h1>custom app</h1>
      <p> user of theis site is {username}</p>     
    
    </div>
  )
 }
/* this is calles valuated expression  we can not write any logic iin it  */

 const ReactElement = {
    type:'a',
    props:{
        href:'https://google.com',
        target:'-blank',

    },
    children:'click me to go to the google'
}

const AnotherElement = (
  <a href="https://google.com'" target = '-blank'> VISIT GOOGLE</a>
)

const username  = "ashesh hait"
const ReactElement1 =  React.createElement(
  'a',  // special syntan first  will be tag like p tag a tag etc 
  {href:'https://google.com' ,target:'_blank'},
  'click me to visit google',
  username  // tis is the place where variable is placed 
)
createRoot(document.getElementById('root')).render(
  <StrictMode>
   {/* {AnotherElement} */}
    {ReactElement1}
    
    {/* <Myapp /> */}
    {/* Myapp()     //it also run */}
  </StrictMode>,
)
