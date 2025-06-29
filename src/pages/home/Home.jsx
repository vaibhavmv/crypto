import React, { useContext, useEffect, useState } from 'react';
import { CoinContext } from '../../context/CoinContext';

const Home = () => {
  const { allCoin, currency } = useContext(CoinContext);
  const [displayCoin, setDisplayCoin] = useState([]);
    const[input,setInput]=useState("");
    const handleInputChange=(e)=>{
      setInput(e.target.value);
      if(e.target.value === "") {
        setDisplayCoin(allCoin); // Reset to all coins if input is empty
      }
    }
    const searchHandler=async(event)=>{
        event.preventDefault();
        await allCoin.filter((item)=>{
            item.name.toLowerCase().includes(input.toLowerCase()) || item.symbol.toLowerCase().includes(input.toLowerCase())
        })
        setDisplayCoin(coins)

    }
  useEffect(() => {
    // Check if allCoin is a valid array before setting
    if (Array.isArray(allCoin)) {
      setDisplayCoin(allCoin);
    } else {
      setDisplayCoin([]); // fallback to empty array
    }
  }, [allCoin]);

  return (
    <div>
      <div className="home">
        <div className="hero">
          <h1>Largest <br />crypto market</h1>
          <p>Track top coins by market cap</p>
          <form onSubmit={searchHandler}>
            <input onChange={handleInputChange}list='coinlist' value={input} type='text' placeholder='Search coin' />
        <datalist id='coinlist'>
            {allCoin.map((item, index) => (<option key={index} value={item.name} />))}
        </datalist>



            <button type='submit'>Search</button>
          </form>
        </div>
      </div>

      <div className="crypto-table">
        <div className="table-layout table-header">
          <p>#</p>
          <p>Coins</p>
          <p style={{ textAlign: "center" }}>24H Change</p>
          <p>Market Cap</p>
        </div>

        {Array.isArray(displayCoin) &&
          displayCoin.slice(0, 10).map((item, index) => (
            <div className="table-layout" key={index}>
              <p>{item.market_cap_rank}</p>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <img src={item.image} alt={item.name} width={24} height={24} />
                <p>{item.name} - {item.symbol.toUpperCase()}</p>
              </div>
              <p>
                {currency?.symbol}{item.current_price?.toLocaleString()}
              </p>
              <p className={item.price_change_percentage_24h < 0 ? "red" : "green"}>
                {Math.floor(item.price_change_percentage_24h * 100) / 100}%
              </p>
              <p>{item.market_cap?.toLocaleString()}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Home;
