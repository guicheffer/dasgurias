import React, { FunctionComponent, ReactElement } from 'react';

import './Confirm.scss';
import { DEFAULT_DELIVERIES, DELIVERIES_FEES, DELIVERIES_TITLES } from './DeliveryOptions';
import { AddressData } from './Form';
import getCurrentPrice from './commons/utils/get-current-price';
import { FormRequestData } from './Form';
import { DEFAULT_COUNTRIES } from './Address';

interface ConfirmProps {
  amount: number;
  formData: FormRequestData;
  selectedDeliveryOption: DEFAULT_DELIVERIES;

  stepBack: () => void;
  stepFurther: () => void;
};

export const Confirm: FunctionComponent<ConfirmProps> = ({ children, ...props }): ReactElement => {
  const { amount, formData, selectedDeliveryOption, stepBack, stepFurther } = props;

  const deliveryAddress = (formData['different-address'] || formData.address) as AddressData;
  const deliveryName = formData['different-address'] ? deliveryAddress.name : formData.name;

  return (
    <>
      <section className="confirm">
        <p className="confirm__address">Endereço de entrega</p>
        <p className="confirm__address-name">{deliveryName}</p>
        <p className="confirm__address-street">{deliveryAddress.num} {deliveryAddress.street}</p>
        <p className="confirm__address-town">{deliveryAddress.town}</p>
        <p className="confirm__address-country">{DEFAULT_COUNTRIES[deliveryAddress.country]}</p>

        <br/> <br/>

        <p className="confirm__quantity">Quantidade</p>
        <p className="confirm__quantity-amount">{amount} unidade{amount > 1 ? 's' : ''} do brigadeiro tradicional</p>

        <br/> <br/>

        <p className="confirm__delivery">Opção de entrega</p>
        <p className="confirm__delivery-text">{DELIVERIES_TITLES[selectedDeliveryOption]}</p>

        <br/> <br/>
        <p className="confirm__total">Valor total</p>
        <p className="confirm__total-text">{getCurrentPrice(amount, DELIVERIES_FEES[selectedDeliveryOption])}</p>
      </section>

      <div className="dasgurias--options">
        <button type="submit" className="dasgurias--cta danger" onClick={stepBack}> Voltar </button>
        <button type="submit" className="dasgurias--cta" onClick={stepFurther}> Próximo </button>
      </div>
    </>
  );
};
