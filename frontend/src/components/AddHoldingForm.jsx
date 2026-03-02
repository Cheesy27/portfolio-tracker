import React, { useState } from 'react';
import { addHolding } from '../api/holdingsApi';

function AddHoldingForm({ onHoldingAdded }) {
  const [formData, setFormData] = useState({
    symbol: '',
    name: '',
    quantity: '',
    purchasePrice: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.symbol || !formData.name) {
      alert('Symbol and Name are required');
      return;
    }
    await addHolding(formData);
    setFormData({ symbol: '', name: '', quantity: '', purchasePrice: '' });
    onHoldingAdded();
  };

  return (
    <div>
      <h2>Add Holding</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="symbol"
          placeholder="Symbol (e.g. AAPL)"
          value={formData.symbol}
          onChange={handleChange}
        />
        <input
          type="text"
          name="name"
          placeholder="Name (e.g. Apple Inc)"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={formData.quantity}
          onChange={handleChange}
        />
        <input
          type="number"
          name="purchasePrice"
          placeholder="Purchase Price"
          value={formData.purchasePrice}
          onChange={handleChange}
        />
        <button type="submit">Add Holding</button>
      </form>
    </div>
  );
}

export default AddHoldingForm;