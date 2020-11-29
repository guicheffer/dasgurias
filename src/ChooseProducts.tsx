import React, { FunctionComponent, ReactElement } from 'react';

import './ChooseProducts.scss';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import getCurrentPrice from './commons/utils/get-current-price';

interface ChooseProductsProps {
  amount: number;

  handleReactiveAmountAdd: () => void;
  handleReactiveAmountRemove: () => void;

  stepBack: () => void;
  stepFurther: () => void;
};

export const ChooseProducts: FunctionComponent<ChooseProductsProps> = ({ children, ...props }): ReactElement => {
  const { amount, handleReactiveAmountRemove, handleReactiveAmountAdd, stepBack, stepFurther } = props;

  return (
    <>
      <section className="choose-products">
        <section className="choose-products__current-price"> {getCurrentPrice(amount)} <small>*</small> </section>

        <figure className="choose-products-image-container">
          <img className="choose-products-image" src="/small-brigadeiro-transparent.png" alt="Brigadeiro Tradicional"/>

          <nav className="choose-products__quantity">
            <button className="choose-products__quantity-button" type="button" onClick={handleReactiveAmountRemove} disabled={amount < 2}>
              <FontAwesomeIcon className="choose-products__quantity-minus" icon={faMinus}/>
            </button>

            <span className="choose-products__quantity--amount"> {amount} </span>

            <button className="choose-products__quantity-button" type="button" onClick={handleReactiveAmountAdd} disabled={amount >= 10}>
              <FontAwesomeIcon className="choose-products__quantity-plus" icon={faPlus}/>
            </button>
          </nav>
        </figure>

        <p className="choose-products__quantity--explanation">
          * 1 unidade = € 6,90 + frete<br/>
          * 2 unidades = € 6,90 + frete<br/>
          * a partir de 3 unidades = € 6,30 cada + frete<br/>
        </p>
      </section>

      <div className="dasgurias--options">
        <button type="submit" className="dasgurias--cta danger" onClick={stepBack}> Voltar </button>
        <button type="submit" className="dasgurias--cta" onClick={stepFurther}> Próximo </button>
      </div>
    </>
  );
};
