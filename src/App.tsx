import React, { useCallback, useState } from 'react';
import { Redirect, Route, Switch, useHistory, withRouter } from 'react-router-dom';

import { Form, FormRequestData } from './Form';

import './App.scss';

import { ChooseProducts } from './ChooseProducts';
import { DEFAULT_DELIVERIES, DeliveryOptions } from './DeliveryOptions';
import { Confirm } from './Confirm';

function App() {
  const history = useHistory();

  const [isFormRequested, setIsFormRequested] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [requestStep, setRequestStep] = useState(0);

  const [formData, setFormData] = useState({});
  const [amount, setAmount] = useState(1);
  const [selectedDeliveryOption, setSelectedDeliveryOption] = useState(DEFAULT_DELIVERIES.dhl);

  // TODO: Start using it in somewhere (as we were using it before) :)
  // const _hasFormData = useMemo(() => !!Object.values(formData).length, [formData]);

  const handleRequest = useCallback(() => {
    setIsFormRequested(true);

    setTimeout(() => {
      setIsFormVisible(true);
      setRequestStep(1);
      history.push('/pedir/1');
    }, 500);
  }, [history]);

  const handleFormSubmit = useCallback((rawFormData: FormRequestData) => {
    setFormData(rawFormData);
    setIsFormVisible(false);

    setTimeout(() => {
      setRequestStep(2);
      setIsFormVisible(true);
      history.push('/pedir/2');
    }, 400);
  }, [history]);

  const stepBack = useCallback(() => {
    const nextRequestStep = requestStep - 1;

    setRequestStep(nextRequestStep);
    history.push(`/pedir/${nextRequestStep}`);
  }, [history, requestStep]);

  const stepFurther = useCallback(() => {
    const nextRequestStep = requestStep + 1;

    setRequestStep(nextRequestStep);
    history.push(`/pedir/${nextRequestStep}`);
  }, [history, requestStep]);

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

        <Switch>
          <Route exact path="/" render={() => <Redirect to="/pedir" />} />

          <Route exact path="/pedir" render={() => !isFormRequested && <button onClick={handleRequest} className="dasgurias--cta"> Quero pedir </button>} />

          <Route path="/pedir/1" render={() => <Form formData={formData as FormRequestData} visible={!!isFormVisible} handleFormSubmit={handleFormSubmit} />} />

          <Route path="/pedir/2" render={() => <ChooseProducts amount={amount} handleReactiveAmountAdd={handleReactiveAmountAdd} handleReactiveAmountRemove={handleReactiveAmountRemove} stepBack={stepBack} stepFurther={stepFurther}/>} />

          <Route path="/pedir/3" render={() => <DeliveryOptions amount={amount} handleChooseDeliveryOption={handleChooseDeliveryOption} selectedDeliveryOption={selectedDeliveryOption} stepBack={stepBack} stepFurther={stepFurther}/>} />

          <Route path="/pedir/4" render={() => <Confirm amount={amount} formData={formData as FormRequestData} selectedDeliveryOption={selectedDeliveryOption} stepBack={stepBack} stepFurther={stepFurther}/>} />
        </Switch>
      </div>
    </div>
  );
}

export default withRouter(App);
