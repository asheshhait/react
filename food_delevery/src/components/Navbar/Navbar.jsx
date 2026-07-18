import React, { useState } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';

export const Navbar = () => {
    const[menu,setMenu] = useState("home")
  return (
    <div className="navbar">
      <img src={assets.logo} alt="" className="logo" />
      <ul className="navbar-manue">
        <li onClick={()=>setMenu("home")} className={menu=="home"?"active":""}>home</li>
        <li onClick={()=>setMenu("menue")} className={menu=="menue"?"active":""}>Menue</li>
        <li  onClick={()=>setMenu("mobile-app")}className={menu=="mobile-app"?"active":""}>mobile-app</li>
        <li onClick={()=>setMenu("contact-us")} className={menu=="contact-us"?"active":""}>contact us</li>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="" />
        <div className="narvar-search-icon">
            <img src={assets.basket_icon} alt="" />
            <div className="dot">

            </div>
        </div>
        <button>sign in</button>
      </div>
    </div>
  );
};