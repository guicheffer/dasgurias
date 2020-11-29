import React, { FunctionComponent, ReactElement, useEffect, useRef, useState } from 'react';

import './Form.scss';

import { Address } from './Address';
import { FormProvider, useForm } from 'react-hook-form';

export interface AddressData {
  country: string;
  extra?: string;
  name?: string;
  num: number;
  street: string;
  town: string;
  zip: string;
}

export interface FormRequestData {
  address: AddressData;
  email: string;
  instagram?: string;
  newsletter: Boolean;
  name: string;
  "different-address": Boolean | AddressData;
}

interface FormProps {
  formData: FormRequestData;
  handleFormSubmit: (formData: FormRequestData) => void;

  visible: Boolean;
}

export const Form: FunctionComponent<FormProps> = ({ children, ...props }): ReactElement => {
  const { formData, handleFormSubmit, visible } = props;
  const methods = useForm({ defaultValues: formData });

  const onSubmit = (data: FormRequestData) => handleFormSubmit(data);

  const differentAddressForm = useRef(null);
  const [differentAddress, setdifferentAddress] = useState(false);
  const handleDifferentAddress = () => {
    setdifferentAddress(!differentAddress);

    setTimeout(() => {
      window.scroll({
        //@ts-ignore
        top: differentAddressForm.current?.offsetTop,
        behavior: 'smooth',
      });
    }, 1);
  }

  useEffect(() => {
    //@ts-ignore
    document.querySelectorAll('input[type=text]')[0].focus();
  }, []);

  return (
    <div className="dasgurias-form" data-visible={visible}>
      <FormProvider {...methods}>
        <form action="#" method="post" onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="form--row">
            <div className="field">
              <input type="text" required ref={methods.register({ required: true })} name="name" placeholder="Seu nome completo"/>
              <span className="form--row--floating-label">Seu nome completo</span>
            </div>
          </div>

          <div className="form--row">
            <div className="field">
              <input type="text" required ref={methods.register({ required: true, pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/ })} name="email" placeholder="E-mail"/>
              <span className="form--row--floating-label" data-error={methods.errors.email}>E-mail</span>

              <div className="form--row form--row--newsletter">
                <div className="field">
                  <input type="checkbox" id="newsletter" name="newsletter" ref={methods.register} defaultChecked/>
                  <label htmlFor="newsletter">Gostaria de receber emails com promoções, novidades, etc;</label>
                </div>
              </div>
            </div>
          </div>

          <div className="form--row">
            <div className="field">
              <input type="text" ref={methods.register} name="instagram" placeholder="Instagram (ex. @dasguriaseu)" data-show-placeholder/>
            </div>
          </div>

          <Address />

          <div className="form--row form--row--different-address" data-different-address={!!differentAddress}>
            <label htmlFor="different-address">Endereço de entrega é diferente</label>
            <input type="checkbox" id="different-address" name="different-address" ref={methods.register} onChange={handleDifferentAddress} checked={differentAddress}/>

            {differentAddress && <section ref={differentAddressForm} className="form--different-address">
              <div className="form--row">
                <div className="field">
                  <input autoComplete="no" required type="text" ref={methods.register({ required: true })} name="different-address.name" placeholder="Nome de entrega"/>
                  <span className="form--row--floating-label">Nome de entrega completo</span>
                </div>
              </div>

              <Address formPrefix="different-address" />
            </section>}
          </div>

          <div className="dasgurias--options">
            <button type="submit" disabled={!!Object.keys(methods.errors).length} className="dasgurias--cta"> Próximo </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
