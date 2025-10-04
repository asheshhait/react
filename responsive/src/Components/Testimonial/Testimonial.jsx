import React, { useRef } from 'react'
import './Testimonial.css'
import next_icon from '../../assets/next-icon.png'
import back_icon from '../../assets/back-icon.png'
import user_1 from '../../assets/user-1.png'
import user_2 from '../../assets/user-2.png'
import user_3 from '../../assets/user-3.png'
import user_4 from '../../assets/user-4.png'

const Testimonial = () => {
    const slider = useRef();
    let tx = 0;
   const slideforwars = ()=>{
    if(tx>-50){
        tx=tx-25;
    }
    slider.current.style.transform = `translateX(${tx}%)`

   }
   const slidebackwars = ()=>{
    if(tx < 0){
        tx=tx+25;
    }
    slider.current.style.transform = `translateX(${tx}%)`

   }


  return (
    <div className='testimonial'>
        <img src={next_icon} alt="" className='next-btn' onClick={slideforwars}/>
        <img src={back_icon} alt="" className='back-btn'onClick={slidebackwars}/>
        <div className="slider">
            <ul ref={slider}>
                <li>
                    <div className="slide">
                        <div className="user-info">
                            <img src={user_1} alt="" />
                            <div>
                                <h3>ashesh hait</h3>
                                <span>edusity, usa</span>
                            </div>
                        </div>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                            Officia excepturi tenetur culpa sunt ea corrupti quaerat 
                            unde veritatis doloremque quisquam! Id sit hic corporis amet 
                            nam ducimus officiis doloribus mollitia?</p>
                    </div>
                </li>

                <li>
                    <div className="slide">
                        <div className="user-info">
                            <img src={user_2} alt="" />
                            <div>
                                <h3>ashesh hait</h3>
                                <span>edusity, usa</span>
                            </div>
                        </div>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                            Officia excepturi tenetur culpa sunt ea corrupti quaerat 
                            unde veritatis doloremque quisquam! Id sit hic corporis amet 
                            nam ducimus officiis doloribus mollitia?</p>
                    </div>
                </li>

                <li>
                    <div className="slide">
                        <div className="user-info">
                            <img src={user_3} alt="" />
                            <div>
                                <h3>ashesh hait</h3>
                                <span>edusity, usa</span>
                            </div>
                        </div>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                            Officia excepturi tenetur culpa sunt ea corrupti quaerat 
                            unde veritatis doloremque quisquam! Id sit hic corporis amet 
                            nam ducimus officiis doloribus mollitia?</p>
                    </div>
                </li>

                <li>
                    <div className="slide">
                        <div className="user-info">
                            <img src={user_4} alt="" />
                            <div>
                                <h3>ashesh hait</h3>
                                <span>edusity, usa</span>
                            </div>
                        </div>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                            Officia excepturi tenetur culpa sunt ea corrupti quaerat 
                            unde veritatis doloremque quisquam! Id sit hic corporis amet 
                            nam ducimus officiis doloribus mollitia?</p>
                    </div>
                </li>
            </ul>
        </div>
    </div>
  )
}

export default Testimonial