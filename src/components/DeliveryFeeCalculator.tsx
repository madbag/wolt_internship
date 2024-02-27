import React, { useState } from 'react';
import { calculateDeliveryFee } from './feeCalculator';

const DeliveryFeeCalculator: React.FC = () => {
  const [cartValue, setCartValue] = useState<number>(0);
  const [deliveryDistance, setDeliveryDistance] = useState<number>(0);
  const [numItems, setNumItems] = useState<number>(0);
  const [orderTime, setOrderTime] = useState<string>(getCurrentDateTime());
  const [deliveryFee, setDeliveryFee] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = () => {
    const isValidInputs = validateInputs();

    if (isValidInputs) {
      const fee = calculateDeliveryFee(cartValue, deliveryDistance, numItems, new Date(orderTime));
      setDeliveryFee(fee);
      setError(null);
    } else {
      setDeliveryFee(null);
      setError("Please provide valid inputs.");
    }
  };

  const handleReset = () => {
    setCartValue(0);
    setDeliveryDistance(0);
    setNumItems(0);
    setOrderTime(getCurrentDateTime());
    setDeliveryFee(null);
    setError(null);
  };

  const validateInputs = (): boolean => {
    return cartValue >= 0 && deliveryDistance >= 0 && numItems >= 0;
  };


  return (
    <div className="calculator-container">
      <div>
        <label htmlFor="cartValue">Cart Value (€):</label>
        <input
          type="number"
          id="cartValue"
          data-id="cartValue"
          value={cartValue === 0 ? '' : cartValue}
          onChange={(e) => {
          const value = parseFloat(e.target.value);
          setCartValue(value >= 0 ? value : 0);
      }}
      placeholder="Enter cart value"
        />
      </div>
      <div>
        <label htmlFor="deliveryDistance">Delivery Distance (meters):</label>
        <input
          type="number"
          id="deliveryDistance"
          data-id="deliveryDistance"
          value={deliveryDistance === 0 ? '' : deliveryDistance}
          onChange={(e) => {
          const value = parseFloat(e.target.value);
          setDeliveryDistance(value >= 0 ? value : 0);
        }}
        placeholder="Enter delivery distance"
        />
      </div>
      <div>
        <label htmlFor="numItems">Number of Items:</label>
        <input
          type="number"
          id="numItems"
          data-id="numItems"
          value={numItems === 0 ? '' : numItems}
          onChange={(e) => {
          const value = parseInt(e.target.value, 10);
          setNumItems(value >= 0 ? value : 0);
        }}
        placeholder="Enter number of items"
        />
      </div>
      <div>
        <label htmlFor="orderTime">Order Time:</label>
        <input
          type="datetime-local"
          id="orderTime"
          data-id="orderTime"
          value={orderTime}
          onChange={(e) => setOrderTime(e.target.value)}
        />
      </div>

      <div className='div-buttons'>
      <button onClick={handleCalculate} data-test-id="calculateButton">
        Calculate Delivery Price
      </button>

      <button onClick={handleReset} data-test-id="resetButton">
          Reset
      </button>
      </div>

      {deliveryFee !== null && (
        <div className="delivery-result" data-id="fee">
          Delivery Fee: {deliveryFee.toFixed(2)} €
        </div>
      )}
    </div>
  );
};

const getCurrentDateTime = (): string => {
  const now = new Date();
  const year = now.getFullYear();
  const month = `${now.getMonth() + 1}`.padStart(2, '0');
  const day = `${now.getDate()}`.padStart(2, '0');
  const hours = `${now.getHours()}`.padStart(2, '0');
  const minutes = `${now.getMinutes()}`.padStart(2, '0');
  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

export default DeliveryFeeCalculator;
