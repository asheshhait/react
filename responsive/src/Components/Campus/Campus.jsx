import React from 'react'
import './Campus.css'
import galllery_1 from '../../assets/gallery-1.png'
import galllery_2 from '../../assets/gallery-2.png'
import galllery_3 from '../../assets/gallery-3.png'
import galllery_4 from '../../assets/gallery-4.png'
import white_arow from '../../assets/white-arrow.png'

const Campus = () => {
  return (
    <div className='campus'>
        <div className="gallery">
            <img src={galllery_1} alt="" />
            <img src={galllery_2} alt="" />
            <img src={galllery_3} alt="" />
            <img src={galllery_4} alt="" />
        </div>
        <button className='btn dark-btn'>See more here <img src={white_arow} alt="" /></button>
    </div>
  )
}

export default Campus