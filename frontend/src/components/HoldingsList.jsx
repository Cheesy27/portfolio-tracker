import React, { useState, useEffect } from "react";
import { getHoldings, deleteHolding, updateQuantity } from "../api/holdingsApi";

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

  const handleBuy = async (id) => {
    await updateQuantity(id, 1);
    fetchHoldings();
  };

  const handleSell = async (id) => {
    await updateQuantity(id, -1);
    fetchHoldings();
  };

  return (
    <div>
      <h2>My Holdings</h2>
      {holdings.length === 0 ? (
        <div className="empty-state">
          No holdings yet. Add your first holding above.
        </div>
      ) : (
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
                <td>
                  <div className="quantity-controls">
                    <button
                      className="qty-btn"
                      onClick={() => handleSell(holding.id)}
                    >
                      −
                    </button>
                    <span className="qty-value">{holding.quantity}</span>
                    <button
                      className="qty-btn"
                      onClick={() => handleBuy(holding.id)}
                    >
                      ＋
                    </button>
                  </div>
                </td>
                <td>${holding.purchasePrice}</td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(holding.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default HoldingsList;
