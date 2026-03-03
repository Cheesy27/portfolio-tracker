import React, { useState } from "react";
import { addHolding, getStockPrice } from "../api/holdingsApi";

function AddHoldingForm({ onHoldingAdded }) {
  const [formData, setFormData] = useState({
    symbol: "",
    name: "",
    quantity: "",
    purchasePrice: "",
  });
  const [loadingPrice, setLoadingPrice] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSymbolBlur = async () => {
    if (formData.symbol) {
      setLoadingPrice(true);
      const price = await getStockPrice(formData.symbol);
      if (price) {
        setFormData((prev) => ({ ...prev, purchasePrice: price }));
      } else {
        setErrors((prev) => ({
          ...prev,
          symbol: "Symbol not found. Please check and try again.",
        }));
      }
      setLoadingPrice(false);
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.symbol) newErrors.symbol = "Symbol is required";
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.quantity) newErrors.quantity = "Quantity is required";
    if (!formData.purchasePrice)
      newErrors.purchasePrice = "Purchase price is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    await addHolding({
      symbol: formData.symbol,
      name: formData.name,
      quantity: parseFloat(formData.quantity),
      purchasePrice: parseFloat(formData.purchasePrice),
    });
    setFormData({ symbol: "", name: "", quantity: "", purchasePrice: "" });
    setErrors({});
    onHoldingAdded();
  };

  return (
    <div>
      <h2>Add Holding</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="text"
            name="symbol"
            placeholder="Symbol (e.g. AAPL)"
            value={formData.symbol}
            onChange={handleChange}
            onBlur={handleSymbolBlur}
            className={errors.symbol ? "input-error" : ""}
          />
          {errors.symbol && (
            <span className="error-message">{errors.symbol}</span>
          )}
        </div>
        <div className="input-group">
          <input
            type="text"
            name="name"
            placeholder="Name (e.g. Apple Inc)"
            value={formData.name}
            onChange={handleChange}
            className={errors.name ? "input-error" : ""}
          />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>
        <div className="input-group">
          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={formData.quantity}
            onChange={handleChange}
            className={errors.quantity ? "input-error" : ""}
          />
          {errors.quantity && (
            <span className="error-message">{errors.quantity}</span>
          )}
        </div>
        <div className="input-group">
          <input
            type="number"
            name="purchasePrice"
            placeholder={loadingPrice ? "Fetching price..." : "Purchase Price"}
            value={formData.purchasePrice}
            onChange={handleChange}
            className={errors.purchasePrice ? "input-error" : ""}
          />
          {errors.purchasePrice && (
            <span className="error-message">{errors.purchasePrice}</span>
          )}
        </div>
        <button type="submit">Add Holding</button>
      </form>
    </div>
  );
}

export default AddHoldingForm;
