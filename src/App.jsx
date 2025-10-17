import profile from "./assets/Profile-Icon.png";
import cashFlow from "./assets/Cash-Flow.png";
import topUp from "./assets/Top-Up.png";
import transfer from "./assets/Transfer.png";

export default function App() {
  return (
    <div className="App-shell">
      {/* Top Bar containing currency and balance */}
      <div className="TopBar">
          <div className="Money">
            {/* Currency Converter */}
            <div className="Currency-Selector">
              <select id="Currency" value="{currency}" onChange={(e) => setCurrency(e.target.value)}>
                <option value="MYR">MYR</option>
                <option value="YUAN">YUAN</option>
                <option value="SGD">SGD</option>
              </select>
            </div>

            {/* Balance */}
            <div className="Balance">
              <h1>8888.88</h1>
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