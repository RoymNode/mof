import React, { useState } from 'react';
import ShoppingPage from './pages/ShoppingPage';
import CheckoutPage from './pages/CheckoutPage';

function App() {
  const [step, setStep] = useState(1);

  return (
    <div>
      {step === 1 && <ShoppingPage onNext={() => setStep(2)} />}
      {step === 2 && <CheckoutPage />}
    </div>
  );
}

export default App;