export const handleError = (error) => {
  if (error.response && error.response.data) return error.response.data.message;

  return 'Algum problema aconteceu, tente novamente mais tarde.';
};
