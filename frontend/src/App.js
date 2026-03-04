import React, { useState, useEffect } from "react";
import HoldingsList from "./components/HoldingsList";
import AddHoldingForm from "./components/AddHoldingForm";
import PortfolioSummary from "./components/PortfolioSummary";
import { getHoldings } from "./api/holdingsApi";
import "./App.css";

function App() {
  const [refresh, setRefresh] = useState(0);
  const [holdings, setHoldings] = useState([]);

  useEffect(() => {
    fetchHoldings();
  }, [refresh]);

  const fetchHoldings = async () => {
    const data = await getHoldings();
    setHoldings(data);
  };

  const handleHoldingAdded = () => {
    setRefresh(refresh + 1);
  };

  return (
    <div className="app-wrapper">
      <div className="app-header">
        <h1>Portfolio Tracker</h1>
      </div>
      <div className="app-container">
        <PortfolioSummary holdings={holdings} />
        <div className="form-section">
          <AddHoldingForm onHoldingAdded={handleHoldingAdded} />
        </div>
        <div className="table-section">
          <HoldingsList refresh={refresh} />
        </div>
      </div>
    </div>
  );
}

export default App;
