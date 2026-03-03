import React, { useState } from "react";
import HoldingsList from "./components/HoldingsList";
import AddHoldingForm from "./components/AddHoldingForm";
import "./App.css";

function App() {
  const [refresh, setRefresh] = useState(0);

  const handleHoldingAdded = () => {
    setRefresh(refresh + 1);
  };

  return (
    <div className="app-wrapper">
      <div className="app-header">
        <h1>Portfolio Tracker</h1>
      </div>
      <div className="app-container">
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
