import React, { FunctionComponent, ReactElement, useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';

import './Confirm.scss';
import { DEFAULT_DELIVERIES, DELIVERIES_FEES, DELIVERIES_TITLES } from './DeliveryOptions';
import { Amount } from './App';
import { AddressData } from './Form';
import getCurrentPrice from './commons/utils/get-current-price';
import { FormRequestData } from './Form';
import { DEFAULT_COUNTRIES } from './Address';

// TODO: Improve this, this is ridiculous haha
export type RequestData = any;

interface ConfirmProps {
  amount: Amount;
  formData: FormRequestData;
  selectedDeliveryOption: DEFAULT_DELIVERIES;
  requestId: null | number;
  requestIsLoading: Boolean;

  handleCreateRequest: (requestData: RequestData) => void;
  stepBack: () => void;
};

export const Confirm: FunctionComponent<ConfirmProps> = ({ children, ...props }): ReactElement => {
  const { amount, formData, handleCreateRequest, requestId, requestIsLoading, selectedDeliveryOption, stepBack } = props;

  const deliveryAddress = (formData['different-address'] || formData.address) as AddressData;
  const deliveryName = formData['different-address'] ? deliveryAddress.name : formData.name;

  const history = useHistory();

  // TODO: voucherTenApplied – super hacky!
  const [voucherTenApplied, setVoucherTenApplied] = useState(false);
  const handleDiscount = useCallback((event: any) => {
    const { voucher } = Object.fromEntries(new FormData(event.target).entries());

    if ((voucher as string).match(/(c|C)\d{2,3}$/g)) {
      setVoucherTenApplied(true);
    } else {
      window.alert("Código não válido!");
    }

    event.preventDefault();
  }, []);

  // TODO: I know, this is too fast – that's why ¯\_(ツ)_/¯
  if (requestId) setTimeout(() => {
    history.push(`/pedido/${requestId}`);
  }, 2000);

  const requestData = Object.assign({
    brigadeiro: amount.brigadeiro,
    name: formData.name,
    email: formData.email,
    instagram: formData.instagram,
    newsletter: formData.newsletter,
    delivery: selectedDeliveryOption,
    price: getCurrentPrice(amount.total, DELIVERIES_FEES[selectedDeliveryOption], true, voucherTenApplied),

    country: formData.address.country,
    extra: formData.address.extra,
    num: formData.address.num,
    street: formData.address.street,
    town: formData.address.town,
    zip: formData.address.zip,

  }, formData['different-address'] ? {
    deliveryName: (formData['different-address'] as AddressData).name,
    deliveryStreet: (formData['different-address'] as AddressData).street,
    deliveryNum: (formData['different-address'] as AddressData).num,
    deliveryTown: (formData['different-address'] as AddressData).town,
    deliveryZip: (formData['different-address'] as AddressData).zip,
    deliveryCountry: (formData['different-address'] as AddressData).country,
    deliveryExtra: (formData['different-address'] as AddressData).extra,
  } : {});

  return (
    <>
      <section className="confirm" data-loading={requestIsLoading}>
        <p className="confirm__address">Endereço de entrega</p>
        <p className="confirm__address-name">{deliveryName}</p>
        <p className="confirm__address-street">{deliveryAddress.num} {deliveryAddress.street}</p>
        <p className="confirm__address-town">{deliveryAddress.town}</p>
        <p className="confirm__address-country">{DEFAULT_COUNTRIES[deliveryAddress.country]}</p>

        <br/> <br/>

        <p className="confirm__quantity">Quantidade</p>
        {amount.brigadeiro && <p className="confirm__quantity-amount">{amount.brigadeiro} unidade{amount.brigadeiro > 1 ? 's' : ''} do brigadeiro tradicional</p>}

        <br/> <br/>

        <p className="confirm__delivery">Opção de entrega</p>
        <p className="confirm__delivery-text">{DELIVERIES_TITLES[selectedDeliveryOption]}</p>

        <br/> <br/>
        <p className="confirm__total">Valor total</p>
        <p className="confirm__total-text">{getCurrentPrice(amount.total, DELIVERIES_FEES[selectedDeliveryOption], false, voucherTenApplied)} {voucherTenApplied && <small> (desconto de 10% aplicado) </small>}</p>

        {!voucherTenApplied && <form action="#" method="GET" onSubmit={handleDiscount}>
          <div className="form--row">
            <div className="field">
                <input type="text" placeholder="código de desconto" name="voucher" data-show-placeholder/>
                <button type="submit" className="dasgurias--cta danger"> aplicar </button>
            </div>
          </div>
        </form>}
      </section>

      <div className="dasgurias--options">
        <button type="submit" className="dasgurias--cta danger" onClick={stepBack}> Voltar </button>
        <button type="submit" className="dasgurias--cta" disabled={!!requestIsLoading} onClick={() => handleCreateRequest(requestData)}> Confirmar </button>
      </div>
    </>
  );
};
