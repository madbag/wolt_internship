
import React from 'react';
import '../styles/App.css';
import DeliveryFeeCalculator from './DeliveryFeeCalculator';

const App: React.FC = () => {
  return (
    <div className="app-container">
      <h1>Wolt Delivery Fee Calculator</h1>
      <DeliveryFeeCalculator />
    </div>
  );
};

export default App;
