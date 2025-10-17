import profile from "./assets/Profile-Icon.png";
import cashFlow from "./assets/Cash-Flow.png";
import topUp from "./assets/Top-Up.png";
import transfer from "./assets/Transfer.png";
import {useEffect, useMemo, useState } from "react";

/* const that never changes placed outside */
const CURRENCY_UNITS = {
  MYR: { symbol: "RM", label: "MYR" },
  SGD: { symbol: "S$", label: "SGD" },
  CNY: { symbol: "¥",  label: "CNY" },
};

export default function App() {
  
  const CURRENCY_RATE_API_KEY = import.meta.env.VITE_CURRENCY_RATE_API_KEY
  const balanceMYR = 8888.88; /* default balance */
  const [currency, setCurrency] = useState("MYR");
  const [rates, setRates] = useState({MYR : 1,});
  console.log("Using API key:", CURRENCY_RATE_API_KEY);

  useEffect(() => {
    async function fetchRates() {
      try {
        const url = `https://api.currencyfreaks.com/v2.0/rates/latest?apikey=${CURRENCY_RATE_API_KEY}&symbols=MYR,SGD,CNY`;
        const results = await fetch(url);
        const data = await results.json();
        console.log("Fetched data : ", data);

        const USD_MYR = parseFloat(data.rates.MYR);
        const USD_SGD = parseFloat(data.rates.SGD);
        const USD_CNY = parseFloat(data.rates.CNY);

        // Convert to MYR base: 1 MYR = (USD_target / USD_MYR)
        const MYR_to_SGD = USD_SGD / USD_MYR;
        const MYR_to_CNY = USD_CNY / USD_MYR;

        //set rates
        setRates({
          MYR : 1,
          SGD : MYR_to_SGD,
          CNY : MYR_to_CNY,
        });
        
      } catch (error){
        console.error("API Fetch FAILED", error)
      }
    }
    fetchRates();
  }, [CURRENCY_RATE_API_KEY]);


  const converted = useMemo(
    () => balanceMYR * (rates[currency] ?? 1), /* ?? 1 defaults to 1 if currency dont exist */
    [balanceMYR, currency, rates] /*only recaculate converted if any of these changes */
  )

  const fmt2dp = (n) => new Intl.NumberFormat("en-US",{
    minimumFractionDigits : 2,
    maximumFractionDigits : 2,
  }).format(n);

  return (
    <div className="App-shell">
      {/* Top Bar containing currency and balance */}
      <div className="TopBar">
          <div className="Money">
            {/* Currency Converter */}
            <div className="Currency-Selector">
              <select id="Currency" value={currency} onChange={(e) => setCurrency(e.target.value)}>
                <option value="MYR">MYR</option>
                <option value="CNY">CNY</option>
                <option value="SGD">SGD</option>
              </select>
            </div>

            {/* Balance */}
            <div className="Balance">
              <h1> <span className="Unit">{CURRENCY_UNITS[currency].symbol}</span> {fmt2dp(converted)}</h1>
            </div>
          </div>

          {/* Settings */}
          <div className="Settings">
            <img id="Profile-Icon" src={profile} alt="profile"/>
          </div>
      </div>

      <div id="Operations">
        <img id="Top-Up" src={topUp} alt="top-up"/>
        <img id="Transfer" src={transfer} alt="transfer"/>
        <img id="Cash-Flow" src={cashFlow} alt="cash-flow"/>

      </div>

    </div>
  );
}

function bottomNavBar() {

}