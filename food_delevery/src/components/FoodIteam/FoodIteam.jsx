import React, { useContext, useState } from 'react'
import'./FoodIteam.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
const FoodIteam = ({id,name,price,description,image}) => {
    const [iemCount,setItemCount] = useState(0)
    const {cartIteam,addToCart,removeFromCart} = useContext(StoreContext)
  return (
    <div className='food-item'>
        <div className="food-item-img-contaimer">
            <img className='food-item-image' src={image} alt="" />
            {!iemCount?
            <img className='add' onClick={()=>setItemCount(prev=>prev+1)} src={assets.add_icon_white}/>:
            <div className='food-item-Counter'>
                <img onClick={()=>setItemCount(prev=>prev-1)} src={assets.remove_icon_red} alt="" />
                <p>{iemCount}</p>
                <img onClick={()=>setItemCount(prev=>prev+1)} src={assets.add_icon_green} alt="" />
                </div>}
        </div>
        <div className="food-item-info">
            <div className="food-item-name-rating">
                <p>{name}</p>
                <img  src={assets.rating_starts} alt="" />
            </div>
            <p className="food-item-description">{description}</p>
            <p className="food-ieam-price">${price}</p>
        </div>
    </div>
  )
}

export default FoodIteam