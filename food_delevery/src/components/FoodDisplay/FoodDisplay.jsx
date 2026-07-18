import React, { useContext } from 'react'
import './FoodDisplay.css'
import { StoreContext } from '../../context/StoreContext'
import FoodIteam from '../FoodIteam/FoodIteam'

const FoodDisplay = ({catagory}) => {
    const {food_list} = useContext(StoreContext)
  return (
    <div className='food-display' id='food-display'>
        <h2>Top Dishes near you</h2>
        <div className="food-display-list">
           { food_list.map((item,index) => {
            return <FoodIteam key = {index} id = {item.id} name = {item.name} desciption = {item.desciption} price = {item.price} image = {item.image}/>
            })}
        </div>

    </div>
  )
}

export default FoodDisplay