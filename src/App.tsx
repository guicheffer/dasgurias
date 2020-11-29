import React, { useCallback, useMemo, useState } from 'react';

import { Form, FormRequestData } from './Form';

import './App.scss';

import { ChooseProducts } from './ChooseProducts';
import { DEFAULT_DELIVERIES, DeliveryOptions } from './DeliveryOptions';
import { Confirm } from './Confirm';

function App() {
  const [isFormRequested, setIsFormRequested] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [requestStep, setRequestStep] = useState(0);

  const [formData, setFormData] = useState({});
  const [amount, setAmount] = useState(1);
  const [selectedDeliveryOption, setSelectedDeliveryOption] = useState(DEFAULT_DELIVERIES.dhl);

  const hasFormData = useMemo(() => !!Object.values(formData).length, [formData]);

  const handleRequest = useCallback(() => {
    setIsFormRequested(true);

    setTimeout(() => {
      setIsFormVisible(true);
      setRequestStep(1);
    }, 500);
  }, []);

  const handleFormSubmit = useCallback((rawFormData: FormRequestData) => {
    setFormData(rawFormData);
    setIsFormVisible(false);

    setTimeout(() => {
      setRequestStep(2);
    }, 400);
  }, []);

  const stepBack = useCallback(() => {
    if (requestStep === 2) setIsFormVisible(true);

    setRequestStep(requestStep - 1);
  }, [requestStep]);

  const stepFurther = useCallback(() => {
    setRequestStep(requestStep + 1);
  }, [requestStep]);

  const handleReactiveAmountAdd = useCallback(() => {
    setAmount(amount + 1);
  }, [amount]);

  const handleReactiveAmountRemove = useCallback(() => {
    setAmount(amount - 1);
  }, [amount]);

  const handleChooseDeliveryOption = useCallback((event) => {
    setSelectedDeliveryOption(event.currentTarget.dataset.value as DEFAULT_DELIVERIES);
  }, []);

  return (
    <div className="dasgurias">
      <div className={`dasgurias--content ${isFormRequested ? 'dasgurias--content--form-requested' : ''}`} data-content-is-visible={!!requestStep}>
        <img className="dasgurias-logo" src="/golden-logo.png" alt="Logo dasgurias"/>

        {!isFormRequested && <button onClick={handleRequest} className="dasgurias--cta"> Quero pedir </button>}

        {isFormRequested && requestStep === 1 && <Form formData={formData as FormRequestData} visible={!!isFormVisible} handleFormSubmit={handleFormSubmit} />}

        {hasFormData && requestStep === 2 && <ChooseProducts amount={amount} handleReactiveAmountAdd={handleReactiveAmountAdd} handleReactiveAmountRemove={handleReactiveAmountRemove} stepBack={stepBack} stepFurther={stepFurther}/>}

        {requestStep === 3 && <DeliveryOptions amount={amount} handleChooseDeliveryOption={handleChooseDeliveryOption} selectedDeliveryOption={selectedDeliveryOption} stepBack={stepBack} stepFurther={stepFurther}/>}

        {requestStep === 4 && <Confirm amount={amount} formData={formData as FormRequestData} selectedDeliveryOption={selectedDeliveryOption} stepBack={stepBack} stepFurther={stepBack}/>}
      </div>
    </div>
  );
}

export default App;
