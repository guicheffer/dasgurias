import React, { FunctionComponent, ReactElement } from 'react';

interface AddressProps {
    formPrefix?: string;
};

export const Address: FunctionComponent<AddressProps> = ({ children, ...props }): ReactElement => {
    const { formPrefix: rawFormPrefix = '' } = props;
    const formPrefix = rawFormPrefix ? `${rawFormPrefix}-` : '';

    return (
        <div className="address">
            <div className="form--row form--row--street">
                <div className="field field--street">
                    <input type="text" required name={`${formPrefix}address-street`} placeholder="Avenida, Rua, Ring..."/>
                    <span className="form--row--floating-label">Avenida, Rua, Ring...</span>
                </div>

                <div className="field">
                    <input type="text" required name={`${formPrefix}address-num`} data-address-num placeholder="Número"/>
                    <span className="form--row--floating-label">Número</span>
                </div>
            </div>
            
            <div className="form--row">
                <div className="field">
                    <input type="text" name={`${formPrefix}address-extra`} placeholder="Complemento (opcional)" data-show-placeholder/>
                </div>
            </div>
            
            <div className="form--row">
                <div className="field">
                    <input type="text" required name={`${formPrefix}address-neigh`} placeholder="Bairro"/>
                    <span className="form--row--floating-label">Bairro</span>
                </div>
            </div>
            
            <div className="form--row">
                <div className="field">
                    <input type="text" required name={`${formPrefix}address-zip`} placeholder="Zip/Cep"/>
                    <span className="form--row--floating-label">Zip/Cep</span>
                </div>
            </div>
            
            <div className="form--row">
                <div className="field">
                    <select name={`${formPrefix}address-country`} id="country" defaultValue="germany">
                        <option value="germany"> Alemanha </option>
                        <option value="uk"> Reino Unido </option>
                        <option value="france"> França </option>
                    </select>
                </div>
            </div>
        </div>
    );
};