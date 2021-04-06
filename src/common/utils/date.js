import { format, parseISO, isValid } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

export const getDayLabelByDate = (date, short) => {
  const pattern = short ? 'EEEEEE' : 'EEEE';

  if (!isValid(parseISO(date))) return '';

  return format(parseISO(date.slice(0, 10)), pattern, {
    locale: ptBR,
  });
};

export const getMonthLabelByDate = (date) => {
  if (!isValid(parseISO(date))) return '';

  return format(parseISO(date.slice(0, 10)), 'MMMM', {
    locale: ptBR,
  });
};

export const getFormattedDatePreview = (date) => {
  if (!isValid(parseISO(date))) return '';

  return format(parseISO(date.slice(0, 10)), 'dd/MM/yyyy');
};
