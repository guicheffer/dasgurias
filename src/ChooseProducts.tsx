import React, { FunctionComponent, ReactElement } from 'react';

import './ChooseProducts.scss';
import { Amount } from './App';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import getCurrentPrice from './commons/utils/get-current-price';

interface ChooseProductsProps {
  amount: Amount;

  handleReactiveAmountAdd: (event: any) => void;
  handleReactiveAmountRemove: (event: any) => void;

  stepBack: () => void;
  stepFurther: () => void;
};

// TODO: This is super hacky, haha – ideally, bringing these data from the api would be easier to understand what contents/products we have here

export const ChooseProducts: FunctionComponent<ChooseProductsProps> = ({ children, ...props }): ReactElement => {
  const { amount, handleReactiveAmountRemove, handleReactiveAmountAdd, stepBack, stepFurther } = props;

  return (
    <>
      <section className="choose-products">
        <section className="choose-products__current-price" data-disabled={amount.total < 1}> {getCurrentPrice(amount.total)} <small>*</small> </section>

        <div className="choose-products__products">
          <figure className="choose-products-image-container">
            <img className="choose-products-image" src="/small-brigadeiro-transparent.png" alt="Brigadeiro Tradicional"/>

            <p className="choose-products-product">Brigadeiro Tradicional</p>

            <nav className="choose-products__quantity">
              <button className="choose-products__quantity-button" type="button" data-type="brigadeiro" onClick={handleReactiveAmountRemove} disabled={amount.brigadeiro < 1}>
                <FontAwesomeIcon className="choose-products__quantity-minus" icon={faMinus}/>
              </button>

              <span className="choose-products__quantity--amount"> {amount.brigadeiro} </span>

              <button className="choose-products__quantity-button" type="button" data-type="brigadeiro" onClick={handleReactiveAmountAdd} disabled={amount.brigadeiro >= 10}>
                <FontAwesomeIcon className="choose-products__quantity-plus" icon={faPlus}/>
              </button>
            </nav>
          </figure>
        </div>

        <p className="choose-products__quantity--explanation">
          * 1 unidade = € 6,90 + frete<br/>
          * 2 unidades = € 6,45 cada + frete<br/>
          * a partir de 3 unidades = € 6,30 cada + frete<br/>
        </p>
      </section>

      <div className="dasgurias--options">
        <button type="submit" className="dasgurias--cta danger" onClick={stepBack}> Voltar </button>
        <button type="submit" className="dasgurias--cta" onClick={stepFurther} disabled={amount.total < 1}> Próximo </button>
      </div>
    </>
  );
};
