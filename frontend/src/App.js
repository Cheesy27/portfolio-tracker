import React, { useState } from "react";
import HoldingsList from "./components/HoldingsList";
import AddHoldingForm from "./components/AddHoldingForm";

function App() {
  const [refresh, setRefresh] = useState(0);

  const handleHoldingAdded = () => {
    setRefresh(refresh + 1);
  };

  return (
    <div>
      <h1>Portfolio Tracker</h1>
      <AddHoldingForm onHoldingAdded={handleHoldingAdded} />
      <HoldingsList refresh={refresh} />
    </div>
  );
}

export default App;
