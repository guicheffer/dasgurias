import React, { useCallback, useState } from 'react';

import { Form } from './Form';

import './App.scss';


function App() {
  const [isFormRequested, setIsFormRequested] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleRequest = useCallback(() => {
    setIsFormRequested(true);

    setTimeout(() => {
      setIsFormVisible(true);
    }, 400);
  }, []);

  return (
    <div className="dasgurias">
      <div className={`dasgurias--content ${isFormRequested ? 'dasgurias--content--form-requested' : ''}`}>
        <img className="dasgurias-logo" src="/golden-logo.png" alt="Das Gurias logo"/>

        {!isFormRequested && <button onClick={handleRequest} className="dasgurias--cta"> Quero pedir </button>}

        {isFormRequested && <Form visible={!!isFormVisible} />}
      </div>
    </div>
  );
}

export default App;
