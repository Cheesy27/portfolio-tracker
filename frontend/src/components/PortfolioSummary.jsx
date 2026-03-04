import React from "react";

function PortfolioSummary({ holdings }) {
  const totalValue = holdings.reduce((sum, holding) => {
    return sum + holding.quantity * holding.purchasePrice;
  }, 0);

  const largestPosition =
    holdings.length > 0
      ? holdings.reduce((max, holding) =>
          holding.quantity * holding.purchasePrice >
          max.quantity * max.purchasePrice
            ? holding
            : max,
        )
      : null;

  return (
    <div className="summary-section">
      <div className="summary-card">
        <span className="summary-label">Total Holdings</span>
        <span className="summary-value">{holdings.length}</span>
      </div>
      <div className="summary-card">
        <span className="summary-label">Total Portfolio Value</span>
        <span className="summary-value">${totalValue.toFixed(2)}</span>
      </div>
      <div className="summary-card">
        <span className="summary-label">Largest Position</span>
        <span className="summary-value">
          {largestPosition ? largestPosition.symbol : "N/A"}
        </span>
      </div>
    </div>
  );
}

export default PortfolioSummary;
