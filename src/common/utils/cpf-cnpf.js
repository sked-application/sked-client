import { replaceSpecialCharacters } from './validator';

export const cpfCnpjMask = (value) => {
  value = replaceSpecialCharacters(value);

  if (value.length <= 11) {
    return cpfMask(value);
  } else {
    return cnpjMask(value);
  }
};

export const cpfMask = (value) => {
  value = replaceSpecialCharacters(value).slice(0, 11);

  return value
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1');
};

export const cnpjMask = (value) => {
  value = replaceSpecialCharacters(value).slice(0, 14);

  return value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1/$2')
    .replace(/(\d{4})(\d)/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1');
};

export const validateCpfCnpj = (val) => {
  val = replaceSpecialCharacters(val).slice(0, 14);

  if (validateCpf(val)) {
    return true;
  } else if (val.length === 14) {
    const cnpj = val
      .trim()
      .replace(/\./g, '')
      .replace('-', '')
      .replace('/', '')
      .split('')
      .map((i) => ~~i);

    let v1 = 0;
    let v2 = 0;
    let aux = false;

    for (let i = 1; cnpj.length > i; i++) {
      if (cnpj[i - 1] !== cnpj[i]) {
        aux = true;
      }
    }

    if (aux === false) {
      return false;
    }

    for (let i = 0, p1 = 5, p2 = 13; cnpj.length - 2 > i; i++, p1--, p2--) {
      if (p1 >= 2) {
        v1 += cnpj[i] * p1;
      } else {
        v1 += cnpj[i] * p2;
      }
    }

    v1 = v1 % 11;

    if (v1 < 2) {
      v1 = 0;
    } else {
      v1 = 11 - v1;
    }

    if (v1 !== cnpj[12]) {
      return false;
    }

    for (let i = 0, p1 = 6, p2 = 14; cnpj.length - 1 > i; i++, p1--, p2--) {
      if (p1 >= 2) {
        v2 += cnpj[i] * p1;
      } else {
        v2 += cnpj[i] * p2;
      }
    }

    v2 = v2 % 11;

    if (v2 < 2) {
      v2 = 0;
    } else {
      v2 = 11 - v2;
    }

    if (v2 !== cnpj[13]) {
      return false;
    }

    return true;
  } else {
    return false;
  }
};

export const validateCpf = (val) => {
  val = replaceSpecialCharacters(val);

  if (val.length === 11) {
    const cpf = val
      .trim()
      .replace(/\./g, '')
      .replace('-', '')
      .split('')
      .map((i) => ~~i);

    let v1 = 0;
    let v2 = 0;
    let aux = false;

    for (let i = 1; cpf.length > i; i++) {
      if (cpf[i - 1] !== cpf[i]) {
        aux = true;
      }
    }

    if (aux === false) {
      return false;
    }

    for (let i = 0, p = 10; cpf.length - 2 > i; i++, p--) {
      v1 += cpf[i] * p;
    }

    v1 = (v1 * 10) % 11;

    if (v1 === 10) {
      v1 = 0;
    }

    if (v1 !== cpf[9]) {
      return false;
    }

    for (let i = 0, p = 11; cpf.length - 1 > i; i++, p--) {
      v2 += cpf[i] * p;
    }

    v2 = (v2 * 10) % 11;

    if (v2 === 10) {
      v2 = 0;
    }

    if (v2 !== cpf[10]) {
      return false;
    }

    return true;
  } else {
    return false;
  }
};
