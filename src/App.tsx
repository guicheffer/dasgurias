import React, { useCallback, useMemo, useState } from 'react';
import { Redirect, Route, Switch, useHistory, withRouter } from 'react-router-dom';

import { Form, FormRequestData } from './Form';

import './App.scss';

import { Request } from './Request';
import { ChooseProducts } from './ChooseProducts';
import { DEFAULT_DELIVERIES, DeliveryOptions } from './DeliveryOptions';
import { Confirm, RequestData } from './Confirm';
import Axios from 'axios';

const baseURL = process.env.NODE_ENV === 'production' ? 'https://admin.dasgurias.eu' : 'http://127.0.0.1:8000';

const axios = Axios.create({
  baseURL: `${baseURL}/`,
  timeout: 5000,
});

export type AmountType = 'brigadeiro';
export interface Amount {
  [key: string]: number;
  total: number;
}

function App() {
  const history = useHistory();

  const [isContentRequested, setIsContentRequested] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [requestStep, setRequestStep] = useState(0);

  const [requestIsLoading, setRequestIsLoading] = useState(false);
  const [requestId, setRequestId] = useState<null|number>(null);

  const [formData, setFormData] = useState({});

  const [amount, setAmount] = useState({
    brigadeiro: 0,
    total: 0,
  } as Amount);

  const [selectedDeliveryOption, setSelectedDeliveryOption] = useState(DEFAULT_DELIVERIES.custom);

  const hasFormData = useMemo(() => !!Object.values(formData).length, [formData]);

  const handleRequest = useCallback(() => {
    setIsContentRequested(true);

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

  const handleReactiveAmountAdd = useCallback((event) => {
    const typeAmount = event.currentTarget.dataset.type as AmountType;
    setAmount({
      ...amount,
      total: amount.total + 1,
      [typeAmount]: amount[typeAmount] + 1,
    });
  }, [amount]);

  const handleReactiveAmountRemove = useCallback((event) => {
    const typeAmount = event.currentTarget.dataset.type as AmountType;
    setAmount({
      ...amount,
      total: amount.total - 1,
      [typeAmount]: amount[typeAmount] - 1
    });
  }, [amount]);

  const handleChooseDeliveryOption = useCallback((event) => {
    setSelectedDeliveryOption(event.currentTarget.dataset.value as DEFAULT_DELIVERIES);
  }, []);

  const handleCreateRequest = useCallback(async (requestData: RequestData) => {
    setRequestIsLoading(true);

    if (!requestId) {
      // TODO: Update type from payload's response
      await axios.post('/request/create/', requestData).then(({ data }: any) => {
        const { id } = data as { id: number };

        setRequestId(id);
      });
    } else {
      history.push(`/pedido/${requestId}`);
    }
  }, [history, requestId]);

  const successfullyLoadedRequest = useCallback(() => {
    setIsContentRequested(true);
  }, [])

  return (
    <div className="dasgurias">
      <div className={`dasgurias--content ${isContentRequested ? 'dasgurias--content--form-requested' : ''}`} data-content-is-visible={!!requestStep}>
        <img className="dasgurias-logo" src="/golden-logo.png" alt="Logo dasgurias"/>

        <Switch>
          <Route exact path="/" render={() => <Redirect to="/pedir" />} />

          <Route exact path="/pedir" render={() => !isContentRequested && <button onClick={handleRequest} className="dasgurias--cta"> Quero pedir </button>} />

          <Route path="/pedir/1" render={() => (isContentRequested && <Form formData={formData as FormRequestData} visible={!!isFormVisible} handleFormSubmit={handleFormSubmit} />) || <Redirect to="/pedir" /> } />
          <Route path="/pedir/2" render={() => (hasFormData && <ChooseProducts amount={amount} handleReactiveAmountAdd={handleReactiveAmountAdd} handleReactiveAmountRemove={handleReactiveAmountRemove} stepBack={stepBack} stepFurther={stepFurther}/>) || <Redirect to="/pedir" /> } />
          <Route path="/pedir/3" render={() => (hasFormData && <DeliveryOptions amount={amount} handleChooseDeliveryOption={handleChooseDeliveryOption} selectedDeliveryOption={selectedDeliveryOption} stepBack={stepBack} stepFurther={stepFurther}/>) || <Redirect to="/pedir" /> } />
          <Route path="/pedir/4" render={() => (hasFormData && <Confirm requestId={requestId} requestIsLoading={requestIsLoading} handleCreateRequest={handleCreateRequest} amount={amount} formData={formData as FormRequestData} selectedDeliveryOption={selectedDeliveryOption} stepBack={stepBack}/>) || <Redirect to="/pedir" /> } />

          <Route path="/pedido/:requestId" render={({ match }) => (match.params.requestId && <Request axiosInstance={axios} successfullyLoadedRequest={successfullyLoadedRequest} requestId={match.params.requestId}/>) || <Redirect to="/pedir" /> } />
        </Switch>
      </div>
    </div>
  );
}

export default withRouter(App);
