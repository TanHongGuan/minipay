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

          <div className="Settings">

          </div>


      </div>




    </div>
  );
}