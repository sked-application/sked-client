export const replaceSpecialCharacters = (string) => {
  return (string || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/([^\w]+|\s+)/g, '')
    .replace(/--+/g, '')
    .replace(/(^-+|-+$)/, '')
    .toLowerCase();
};

export const phoneRegex = (value) => {
  value = replaceSpecialCharacters(value).slice(0, 11);

  return /\(?\b([0-9]{2,3}|0((x|[0-9]){2,3}[0-9]{2}))\)?\s*[0-9]{5}[- ]*[0-9]{4}\b/.test(
    value,
  );
};
