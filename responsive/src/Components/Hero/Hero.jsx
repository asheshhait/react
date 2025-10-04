import React from 'react'
import'./Hero.css'
import arrow from '../../assets/dark-arrow.png'
const Hero = () => {
  return (
    <div className='hero container'>
        <div className="hero-text">
          <h1>we ensure better education for the better world</h1>
          <p>our cutting-edge curriculam is designed to empower student with the knowledge 
            ,skills and expeeriences needed to excel in the dynamic field of education
          </p>
          <button className='btn'>explore more <img src={arrow} alt="" /></button>
        </div>
    </div>
  )
}

export default Hero