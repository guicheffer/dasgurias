import { useFormContext } from 'react-hook-form';
import React, { FunctionComponent, ReactElement } from 'react';

interface AddressProps {
    formPrefix?: string;
};

export const Address: FunctionComponent<AddressProps> = ({ children, ...props }): ReactElement => {
    const { formPrefix: rawFormPrefix = '' } = props;
    const { register, errors } = useFormContext();
    const formPrefix = rawFormPrefix ? `${rawFormPrefix}.` : 'address.';

    return (
      <div className="address">
          <div className="form--row form--row--street">
              <div className="field field--street">
                  <input type="text" ref={register({ required: true })} required name={`${formPrefix}street`} placeholder="Avenida, Rua, Ring..."/>
                  <span className="form--row--floating-label"> Avenida, Rua, Ring... </span>
              </div>

              <div className="field">
                  <input type="text" ref={register({ required: true })} required name={`${formPrefix}num`} data-address-num placeholder="Número"/>
                  <span className="form--row--floating-label"> Número </span>
              </div>
          </div>

          <div className="form--row">
              <div className="field">
                  <input type="text" ref={register} name={`${formPrefix}extra`} placeholder="Complemento (opcional)" data-show-placeholder/>
              </div>
          </div>

          <div className="form--row">
              <div className="field">
                  <input type="text" ref={register({ required: true })} required name={`${formPrefix}town`} placeholder="Cidade / Bairro"/>
                  <span className="form--row--floating-label"> Cidade / Bairro </span>
              </div>
          </div>

          <div className="form--row">
              <div className="field">
                  <input type="text" ref={register({ required: true })} required name={`${formPrefix}zip`} placeholder="Zip/Cep"/>
                  <span className="form--row--floating-label"> Zip/Cep </span>
              </div>
          </div>

          <div className="form--row">
              <div className="field">
                  <select ref={register} name={`${formPrefix}country`} id="country" defaultValue="germany">
                  <option value="germany"> Alemanha </option>
                  <option value="austria"> Áustria </option>
                  <option value="cyprus"> Chipre (exceto parte norte) </option>
                  <option value="denmark"> Dinamarca (exceto Ilhas Faroé e Groenlândia) </option>
                  <option value="spain"> Espanha (exceto Ilhas Canárias, Ceuta e Melilla) </option>
                  <option value="finland"> Finlândia (exceto Ilhas Åland) </option>
                  <option value="france"> França (exceto territórios e departamentos ultramarinos) </option>
                  <option value="great-britain"> Grã-Bretanha (exceto Ilhas do Canal) </option>
                  <option value="greece"> Grécia (exceto Monte Athos) </option>
                  <option value="holland"> Holanda (exceto áreas não europeias) </option>
                  <option value="italy"> Itália (exceto Livigno e Campione d'Italia) </option>
                  <option value="countries"> Países Baixos </option>
                  </select>
              </div>
          </div>
      </div>
    );
};
