import React from "react";

const ClearAllButton = ({ onClear }) => {
  const handleClear = () => {
    if (window.confirm("Are you sure you want to delete all products?")) {
      onClear();
    }
  };

  return <button className="clear-btn" onClick={handleClear}>Clear All Products</button>;
};

export default ClearAllButton;
