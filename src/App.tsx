import React, { useCallback, useMemo, useState } from 'react';
import { Redirect, Route, Switch, useHistory, withRouter } from 'react-router-dom';

import { Form, FormRequestData } from './Form';

import './App.scss';

import { AddressData } from './Form';
import { Request } from './Request';
import { ChooseProducts } from './ChooseProducts';
import { DEFAULT_DELIVERIES, DeliveryOptions } from './DeliveryOptions';
import { Confirm, RequestData } from './Confirm';
import Axios from 'axios';

const baseURL = process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:8000' : 'https://api.dasgurias.eu';

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

  const [isSoldOut, setIsSoldOut] = useState(true); // :(

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

  // This is where we set the default delivery option
  const [selectedDeliveryOption, setSelectedDeliveryOption] = useState(DEFAULT_DELIVERIES.dhl);

  const hasFormData = useMemo(() => !!Object.values(formData).length, [formData]);

  const handleFirstRequest = useCallback(() => {
    setIsContentRequested(true);

    setTimeout(() => {
      setRequestStep(1);
      history.push('/pedir/1');
    }, 500);
  }, [history]);

  const handleFormSubmit = useCallback((rawFormData: FormRequestData) => {
    setFormData(rawFormData);
    setIsFormVisible(false);

    setTimeout(() => {
      setRequestStep(3);
      setIsFormVisible(true);
      history.push('/pedir/3');
    }, 400);
  }, [history]);

  //@ts-ignore
  const deliveryCountry = ((formData['different-address'] || formData.address) as AddressData)?.country;

  const stepBack = useCallback((rawFormData?: FormRequestData) => {
    if (rawFormData?.name) setFormData(rawFormData);

    const nextRequestStep = requestStep - 1;

    setRequestStep(nextRequestStep);
    history.push(`/pedir/${nextRequestStep}`);
  }, [history, requestStep]);

  const stepFurther = useCallback(() => {
    if (requestStep === 1) setIsFormVisible(true);

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
    <div className="skeleton">
      {isSoldOut && !requestId && <img className="sold-out" src="/assets/sold-out.png" alt="Esgotado!"/>}

      <div className="dasgurias" data-is-soldout={isSoldOut && !requestId}>
        <div
          className={`dasgurias--content ${isContentRequested ? 'dasgurias--content--form-requested' : ''}`}
          data-content-is-visible={!!requestStep}
        >
          <img className="dasgurias-logo" src="/golden-logo.png" alt="Logo dasgurias"/>

          <Switch>
            <Route exact path="/" render={() => <Redirect to="/pedir" />} />

            <Route exact path="/pedir" render={() => !isContentRequested && <button onClick={handleFirstRequest} disabled={isSoldOut} className="dasgurias--cta"> Quero pedir </button>} />

            <Route path="/pedir/1" render={() => (isContentRequested && <ChooseProducts amount={amount} handleReactiveAmountAdd={handleReactiveAmountAdd} handleReactiveAmountRemove={handleReactiveAmountRemove} stepFurther={stepFurther}/>) || <Redirect to="/pedir" /> } />
            <Route path="/pedir/2" render={() => (amount.total && <Form formData={formData as FormRequestData} visible={!!isFormVisible} stepBack={stepBack} handleFormSubmit={handleFormSubmit} />) || <Redirect to="/pedir" /> } />
            <Route path="/pedir/3" render={() => (hasFormData && <DeliveryOptions deliveryCountry={deliveryCountry} amount={amount} handleChooseDeliveryOption={handleChooseDeliveryOption} selectedDeliveryOption={selectedDeliveryOption} stepBack={stepBack} stepFurther={stepFurther}/>) || <Redirect to="/pedir" /> } />
            <Route path="/pedir/4" render={() => (hasFormData && <Confirm requestId={requestId} requestIsLoading={requestIsLoading} handleCreateRequest={handleCreateRequest} amount={amount} formData={formData as FormRequestData} selectedDeliveryOption={selectedDeliveryOption} stepBack={stepBack}/>) || <Redirect to="/pedir" /> } />

            <Route path="/pedido/:requestId" render={({ match }) => (match.params.requestId && !Boolean(setIsSoldOut(false)) && <Request axiosInstance={axios} successfullyLoadedRequest={successfullyLoadedRequest} requestId={match.params.requestId}/>) || <Redirect to="/pedir" /> } />
          </Switch>
        </div>
      </div>
    </div>
  );
}

export default withRouter(App);
