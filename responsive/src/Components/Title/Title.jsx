import React from 'react'
import './Title.css'
const Title = ({titles,subtitle}) => {
  return (
    <div className='title'>
        <p>{subtitle}</p>
        <h2>{titles}</h2>
    </div>
  )
}

export default Title