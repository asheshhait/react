import React from 'react'
import Navbar from './Components/Navbar/Navbar'
import Hero from './Components/Hero/Hero'
import Programs from './Components/Programs/Programs'
import Title from './Components/Title/Title'
import About from './Components/About/About'
import Campus from './Components/Campus/Campus'
import Testimonial from './Components/Testimonial/Testimonial'
import Contact from './Components/Contact/Contact'
import Footer from './Components/Footer/Footer'



const App = () => {
  return (
    <div>
      <Navbar/>
      <Hero/>
      <div className="container">
        <Title subtitle ='Our Program' titles='What We Offer'/>
         <Programs/>
         <About/>
         <Title subtitle ='Gallery' titles='Campus Photos'/>
         <Campus/>
         <Title subtitle ='TESTIMONIAL' titles='What Student Says'/>
         <Testimonial/>
          <Title subtitle ='Contact Us' titles='Get in Touch'/>
          <Contact/>
          <Footer/>
      </div>
    </div>
  )
}

export default App