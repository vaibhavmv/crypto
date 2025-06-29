import { createContext, useEffect, useState } from "react";

export const CoinContext=createContext();
const CoinContextProvider=(props)=>{
    const[allCoin,setAllCoin]=useState([]);
    const[currency,setCurrency]=useState({
        name:"usd",
        Symbol:"$"
    })
    const fetchAllCoin=async()=>{
 const options = {
  method: 'GET',
  headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-HMZJ98AMriz3XfMniLw6cNHh'}
};

fetch('https://api.coingecko.com/api/v3/simple/price?vs_currencies=usd', options)
  .then(res => res.json())
  .then(res => setAllCoin(res))
  .catch(err => console.error(err));
}
    useEffect(()=>{
        fetchAllCoin();
    },[currency])
    const contextValue={
        allCoin,currency,setCurrency
    }
    return(
     <CoinContext.Provider value={contextValue}>
        {props.children}
     </CoinContext.Provider>   
    )
}

export default CoinContextProvider