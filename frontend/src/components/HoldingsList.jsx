import React, { useState, useEffect } from "react";
import { getHoldings, deleteHolding } from "../api/holdingsApi";

function HoldingsList({ refresh }) {
  const [holdings, setHoldings] = useState([]);

  useEffect(() => {
    fetchHoldings();
  }, [refresh]);

  const fetchHoldings = async () => {
    const data = await getHoldings();
    setHoldings(data);
  };

  const handleDelete = async (id) => {
    await deleteHolding(id);
    fetchHoldings();
  };

  return (
    <div>
      <h2>My Holdings</h2>
      <table>
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Name</th>
            <th>Quantity</th>
            <th>Purchase Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {holdings.map((holding) => (
            <tr key={holding.id}>
              <td>{holding.symbol}</td>
              <td>{holding.name}</td>
              <td>{holding.quantity}</td>
              <td>${holding.purchasePrice}</td>
              <td>
                <button onClick={() => handleDelete(holding.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default HoldingsList;
