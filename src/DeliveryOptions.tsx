import React, { FunctionComponent, ReactElement } from 'react';

import './DeliveryOptions.scss';
import { faDhl } from '@fortawesome/free-brands-svg-icons';
import { faGlobeEurope, faPeopleCarry } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import getCurrentPrice from './commons/utils/get-current-price';

interface DeliveryOptionsProps {
  amount: number;
  handleChooseDeliveryOption: (event: any) => void;

  selectedDeliveryOption: DEFAULT_DELIVERIES;

  stepBack: () => void;
  stepFurther: () => void;
};

export enum DEFAULT_DELIVERIES {
  custom = "custom",
  dhl = "dhl",
  external = "external",
}

export enum DELIVERIES_FEES {
  custom = 1.50,
  dhl = 3.90,
  external = 5,
}

export enum DELIVERIES_TITLES {
  custom = "Entrega DasGurias",
  dhl = "Envio via DHL",
  external = "Demais países da UE",
}

export const DeliveryOptions: FunctionComponent<DeliveryOptionsProps> = ({ children, ...props }): ReactElement => {
  const { amount, handleChooseDeliveryOption, selectedDeliveryOption, stepBack, stepFurther } = props;

  return (
    <>
      <section className="delivery-options">
        <nav className="delivery-options__choose">
          <ul>
            <li data-selected={selectedDeliveryOption === DEFAULT_DELIVERIES.dhl} data-value={DEFAULT_DELIVERIES.dhl} onClick={handleChooseDeliveryOption}>
              <FontAwesomeIcon icon={faDhl}/>

              <section className="delivery-options__info">
                <h2>{DELIVERIES_TITLES.dhl}</h2>
                <p className="delivery-options__info-description">apenas para <strong>Berlim</strong> e <strong>Alemanha</strong></p>
                <p className="delivery-options__info-price">€ 3,90</p>
              </section>
            </li>
            <li data-selected={selectedDeliveryOption === DEFAULT_DELIVERIES.custom} data-value={DEFAULT_DELIVERIES.custom} onClick={handleChooseDeliveryOption}>
              <FontAwesomeIcon icon={faPeopleCarry}/>

              <section className="delivery-options__info">
                <h2>{DELIVERIES_TITLES.custom}</h2>
                <p className="delivery-options__info-description">apenas para <strong>Berlim</strong>, dentro da área do Ring-Bahn (S41/S42) – das <strong>8h às 19h</strong></p>
                <p className="delivery-options__info-price">€ 1,50</p>
              </section>
            </li>
            <li data-selected={selectedDeliveryOption === DEFAULT_DELIVERIES.external} data-value={DEFAULT_DELIVERIES.external} onClick={handleChooseDeliveryOption}>
              <FontAwesomeIcon icon={faGlobeEurope}/>

              <section className="delivery-options__info">
                <h2>{DELIVERIES_TITLES.external}</h2>
                <p className="delivery-options__info-description">entraremos em contato para informarmos o valor e disponibilidade</p>
                <p className="delivery-options__info-price">€ 5</p>
              </section>
            </li>
          </ul>
        </nav>
        <section className="delivery-options__current-price">
          <small> total: </small>
          {getCurrentPrice(amount, DELIVERIES_FEES[selectedDeliveryOption])}
        </section>
      </section>

      <div className="dasgurias--options">
        <button type="submit" className="dasgurias--cta danger" onClick={stepBack}> Voltar </button>
        <button type="submit" className="dasgurias--cta" onClick={stepFurther}> Próximo </button>
      </div>
    </>
  );
};
