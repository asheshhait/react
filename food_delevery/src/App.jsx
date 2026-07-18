import React from 'react'
import { Navbar } from './components/Navbar/Navbar'
import './index.css'
import { Route , Routes } from 'react-router-dom'
import Cart from './pages/Cart/Cart'
import Home from './pages/Home/Home'
import Placeorder from './pages/Placeorder/Placeorder';
// import  Navbar  from './components/Navbar/Navbar'

const App = () => {
  return (
    <div className="app">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order" element={<Placeorder />} />
      </Routes>
    </div>
  );
};

export default App;
