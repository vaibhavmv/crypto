import React, { useContext, useState } from 'react'
import { NavLink,Link } from 'react-router-dom'
import { CoinContext } from '../../../context/CoinContext';


const NavBar = () => {
  const {setCurrency}=useContext(CoinContext)
  const currencyHandler=(event)=>{
switch(event.target.value){
  case"usd":{
    setCurrency({name:"usd",Symbol:"$"})
    break;
  }
     case"eur":{
    setCurrency({name:"eur",Symbol:"€"})
    break
  }
   case"INR":{
    setCurrency({name:"inr",Symbol:"₹"})
    break;
  }
default:{
  setCurrency({name:"inr",Symbol:"₹"})
    break;
}
  }
}
  
  const[isOpen,setIsOpen]=useState(false);
  const links=[
    {name:'home',path:'/'},
     {name:'home',path:'/'},
      {name:'home',path:'/'},
       {name:'home',path:'/'},

  ]
  return (
   <>
   <nav className='ds'>
    <div className="asd">
      <div className="dsa">

      </div>
    </div>
   </nav>
<div className="nav-right">
  <select onChange={currencyHandler}>
    <option value="usd">USD</option>
    <option value="eur">EUR</option>
    <option value="inr">INR</option>
  </select>
  <button ></button>
</div>
   </>
  )
}
export default NavBar
