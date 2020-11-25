import React, { FunctionComponent, ReactElement, useEffect, useRef, useState } from 'react';

import './Form.scss';

import { Address } from './Address';

interface FormProps {
  visible: Boolean;
}

export const Form: FunctionComponent<FormProps> = ({ children, ...props }): ReactElement => {
  const { visible } = props;

  const firstInputEl = useRef(null);
  const differentAddressInputEl = useRef(null);

  const [differentAddress, setdifferentAddress] = useState(false);
  const handleDifferentAddress = () => {
    setdifferentAddress(!differentAddress);

    //@ts-ignore
    differentAddressInputEl.current?.focus();
  }

  useEffect(() => {
    //@ts-ignore
    firstInputEl.current?.focus();
  }, [])

  return (
    <div className="dasgurias-form" data-visible={visible}>
      <form action="#" method="post">
        <div className="form--row">
          <div className="field">
            <input type="text" required ref={firstInputEl} name="name" placeholder="Seu nome"/>
            <span className="form--row--floating-label">Seu nome</span>
          </div>
        </div>

        <div className="form--row">
          <div className="field">
            <input type="text" required name="address-email" placeholder="E-mail"/>
            <span className="form--row--floating-label">E-mail</span>
          </div>
        </div>

        <div className="form--row">
          <div className="field">
            <input type="text" name="instagram" placeholder="Instagram (ex. @dasguriaseu)" data-show-placeholder/>
          </div>
        </div>
        
        <Address />

        <div className="form--row form--row--name-for-delivery" data-different-address={!!differentAddress}>
          <label htmlFor="name-for-delivery">Endereço de entrega é diferente</label>
          <input type="checkbox" id="name-for-delivery" onChange={handleDifferentAddress} checked={differentAddress}/>

          <div className="form--row">
            <div className="field" data-visible>
              <input type="text" ref={differentAddressInputEl} name="delivery-name" placeholder="Nome de entrega"/>
              <span className="form--row--floating-label">Nome de entrega</span>
            </div>
          </div>

          <Address formPrefix="different-delivery" />
        </div>
      </form>
    </div>
  );
}
