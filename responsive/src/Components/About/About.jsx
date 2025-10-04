import React from 'react'
import './About.css'
import about_img from '../../assets/about.png'
import play_icon from '../../assets/play-icon.png'
const About = () => {
  return (
    <div className='about'>
        <div className="about-left">
            <img src={about_img} alt="" className='about-img'/>
            <img src={play_icon} alt="" className='play-icon'/>
        </div>
          <div className="about-right">
            <h3>ABOUT UNIVERSITY</h3>
            <h2>Nurturing Tomorrows Leaders Today</h2>
            <p>
               Our university is committed to academic excellence, 
               innovation, and research. With modern facilities and 
               experienced faculty, we provide a nurturing environment
                where students grow into future leaders and global 
                citizens.</p><p>
               We believe education goes beyond classrooms. Through practical 
               learning, cultural exposure, and community engagement, we prepare 
               students to solve real-world problems and create a positive impact
                in society.</p>
            <p>
            From science and technology to arts and humanities, 
            our diverse programs empower students to explore passions,
             develop critical thinking, and gain the confidence to 
             excel in their chosen career paths.</p>
        </div>
    </div>
  )
}

export default About