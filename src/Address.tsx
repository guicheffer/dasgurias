import { useFormContext } from 'react-hook-form';
import React, { FunctionComponent, ReactElement } from 'react';

interface AddressProps {
    formPrefix?: string;
};

const DEFAULT_COUNTRY = 'germany';
export const DEFAULT_COUNTRIES = {
  [DEFAULT_COUNTRY]: 'Alemanha',
  austria: 'Áustria',
  cyprus: 'Chipre (exceto parte norte)',
  denmark: 'Dinamarca (exceto Ilhas Faroé e Groenlândia)',
  finland: 'Finlândia (exceto Ilhas Åland)',
  france: 'França (exceto territórios e departamentos ultramarinos)',
  gb: 'Grã-Bretanha (exceto Ilhas do Canal)',
  greece: 'Grécia (exceto Monte Athos)',
  holland: 'Holanda (exceto áreas não europeias)',
  italy: 'Itália (exceto Livigno e Campione d\'Italia)',
  netherlands: 'Países Baixos',
  spain: 'Espanha (exceto Ilhas Canárias, Ceuta e Melilla)',
} as { [key: string]: string };

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
                    {Object.keys(DEFAULT_COUNTRIES).map((countryKey: string) => (<option key={countryKey} value={countryKey}> {DEFAULT_COUNTRIES[countryKey]} </option>))}
                  </select>
              </div>
          </div>
      </div>
    );
};
