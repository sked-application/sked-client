export const getLocalToken = (): string | undefined => {
  const token = localStorage.getItem('token');

  return token ? JSON.parse(token) : undefined;
};
