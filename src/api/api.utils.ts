import axios from 'axios';
import { ErrorType } from './api.types';

export const handleError = (error: ErrorType) => {
  if (axios.isAxiosError(error)) {
    if (error.response && error.response.data)
      return error.response.data.message;
  }

  return 'Algum problema aconteceu, tente novamente mais tarde.';
};
