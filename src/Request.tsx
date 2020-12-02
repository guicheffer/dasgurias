import React, { FunctionComponent, ReactElement, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { AxiosInstance } from 'axios';

import './Request.scss';

interface RequestProps {
  axiosInstance: AxiosInstance;
  requestId: number;

  successfullyLoadedRequest: () => void;
};

enum DEFAULT_STATUS {
  DELIVERED = 'delivered',
  PAID = 'paid',
  PENDING = 'pending',
  SENT = 'sent',
};

const STATUS_MAP = {
  1: DEFAULT_STATUS['PENDING'],
  2: DEFAULT_STATUS['PAID'],
  3: DEFAULT_STATUS['SENT'],
  4: DEFAULT_STATUS['DELIVERED'],
} as {[key: number]: string};

const STATUS_DESCRIPTION = {
  [DEFAULT_STATUS['PENDING']]: 'Aguardando pagamento 🕐',
  [DEFAULT_STATUS['PAID']]: 'Pago 🤑',
  [DEFAULT_STATUS['SENT']]: 'Enviado 🚚',
  [DEFAULT_STATUS['DELIVERED']]: 'Entregue 📦',
} as {[key: string]: string};

interface ExpectedPayload {
  id: number;
  price: string;
  status: number;
}

export const Request: FunctionComponent<RequestProps> = ({ children, ...props }): ReactElement => {
  const { axiosInstance, requestId, successfullyLoadedRequest } = props;

  const [requestProps, setRequestProps] = useState<{} | ExpectedPayload>({});

  useEffect(() => {
    //@ts-ignore
    window.gtag('event', 'page_view', {
      page_title: 'See request details',
      page_path: `/pedido/${requestId}`,
    });

    successfullyLoadedRequest();

    axiosInstance.get(`/request/${requestId}`).then(({ data }) => {
      setRequestProps(data);
    });
  }, [axiosInstance, requestId, successfullyLoadedRequest])

  const history = useHistory();

  return (
    <>
      <section className="request">
        <h1><small>status do pedido<small>*</small>: </small>{STATUS_DESCRIPTION[STATUS_MAP[(requestProps as ExpectedPayload).status]] || "não encontrado"}</h1>
        <h2><small>número do pedido: </small>{requestId}</h2>

        {requestProps && STATUS_MAP[(requestProps as ExpectedPayload).status] === DEFAULT_STATUS.PENDING && (
          <div className="request__info">
            <p className="request__congrats">Parabéns, seu pedido foi realizado com sucesso. ❤️</p>

            <p>Para concluirmos a sua compra, por favor transfira o valor de <strong>{parseFloat((requestProps as ExpectedPayload).price).toLocaleString('pt-BR', { style: 'currency', currency: 'eur' })}</strong> para a conta abaixo:</p>

            <aside className="request__info-account">
              <p>Nome da conta: <strong>Maria Emilia Gaicoski Fujioka</strong></p>
              <p>IBAN: <strong>DE96100110012622414232</strong></p>
              <p>BIC: <strong>NTSBDEB1XXX</strong></p>
              <p>Banco: <strong>N26</strong></p>
              <p>Número de Referência<small>**</small>: <strong>{requestId}</strong></p>
            </aside>

            <p className="request__warning">* o status do pedido pode demorar até 48h para ser atualizado;</p>
            <p className="request__warning">** não esqueça de colocar o número de referência (número do pedido) na transferência para identificarmos sua compra!</p>
          </div>
        )}

        {requestProps && STATUS_MAP[(requestProps as ExpectedPayload).status] === DEFAULT_STATUS.PAID && (
          <div className="request__info">
            <p className="request__congrats">Recebemos o seu pagamento e em breve seu pedido será enviado para o método de entrega escolhido. ❤️</p>
          </div>
        )}

        {requestProps && STATUS_MAP[(requestProps as ExpectedPayload).status] === DEFAULT_STATUS.SENT && (
          <div className="request__info">
            <p className="request__congrats">O(s) seu(s) produto(s) já foi(oram) enviados e em breve estará(ão) com você! ❤️</p>
          </div>
        )}

        {requestProps && STATUS_MAP[(requestProps as ExpectedPayload).status] === DEFAULT_STATUS.DELIVERED && (
          <div className="request__info">
            <p className="request__congrats">O(s) seu(s) produto(s) foi(oram) entregue(s). Agora não deixe de nos acompanhar no instagram <a target="_blank" rel="noreferrer" href="https://www.instagram.com/dasguriaseu/">@dasguriaseu</a> e compartilhar sua experiência! ❤️</p>
          </div>
        )}
      </section>

      <div className="dasgurias--options">
        <button type="submit" className="dasgurias--cta" onClick={() => {
          history.push('/pedir/');
          window.location.reload();
        }}> Pedir novamente </button>
      </div>
    </>
  );
};
