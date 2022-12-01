export const replaceSpecialCharacters = (string, limitSlice) => {
  let text = (string || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/([^\w]+|\s+)/g, '')
    .replace(/--+/g, '')
    .replace(/(^-+|-+$)/, '')
    .toLowerCase();

  if (limitSlice) {
    return text.slice(0, limitSlice);
  }

  return text;
};

export const phoneRegex = (value) => {
  const phoneLength = 11;
  const phonrRegexTest =
    /\(?\b([0-9]{2,3}|0((x|[0-9]){2,3}[0-9]{2}))\)?\s*[0-9]{5}[- ]*[0-9]{4}\b/.test(
      value,
    );

  if (
    !value ||
    (replaceSpecialCharacters(value, phoneLength).length === phoneLength &&
      phonrRegexTest)
  ) {
    return true;
  }

  return false;
};

export const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
