import { replaceSpecialCharacters } from './validator';

export const telephoneMask = (value: string) => {
  value = replaceSpecialCharacters(value, 11);

  // PT EUROPE REGEX
  // return value
  //   .replace(/\D/g, '')
  //   .replace(/(\d{3})(\d)/, '$1 $2')
  //   .replace(/(\d{3})(\d)/, '$1 $2');

  // BR REGEX
  return value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d)/, '$1-$2')
    .replace(/(-\d{4})(\d)/, '$1');
};
