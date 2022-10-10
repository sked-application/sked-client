export const getFormattedPrice = (price, currency) => {
  return `${currency || ''} ${(+price).toFixed(2)}`.trim();
};
