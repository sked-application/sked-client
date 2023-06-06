export const getFormattedPrice = (price: number, currency: string) => {
  return `${currency || ''} ${(+price).toFixed(2)}`.trim();
};
