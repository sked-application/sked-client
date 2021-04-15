import { replaceSpecialCharacters } from './validator';

export const telephoneMask = (value) => {
  value = replaceSpecialCharacters(value).slice(0, 11);

  return value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d)/, '$1-$2')
    .replace(/(-\d{4})(\d)/, '$1');
};
