export const replaceSpecialCharacters = (string) => {
  return (string || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/([^\w]+|\s+)/g, '')
    .replace(/--+/g, '')
    .replace(/(^-+|-+$)/, '')
    .toLowerCase();
};

export const phoneRegex = () => {
  return /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})-?(\d{4}))$/;
};
