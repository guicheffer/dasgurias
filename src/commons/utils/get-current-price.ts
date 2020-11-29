const DEFAULT_VALUE = 6.90;

const getCurrentPrice = (amount: number, fee: number = 0, valueOnly?: Boolean) => {
  let individualPrice = DEFAULT_VALUE;

  if (amount === 1) individualPrice = DEFAULT_VALUE;
  if (amount === 2) individualPrice = 6.45;
  if (amount >= 3) individualPrice = 6.30;

  const finalPrice = (amount * individualPrice) + fee;
  if (valueOnly) return finalPrice;
  return finalPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'eur' });
}

export default getCurrentPrice;
