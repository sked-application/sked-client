import {
  format,
  parseISO,
  isValid,
  getUnixTime,
  startOfDay,
  endOfDay,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear,
} from 'date-fns';
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

  return format(parseISO(date.slice(0, 10)), 'MMM', {
    locale: ptBR,
  });
};

export const getFormattedDatePreview = (date) => {
  if (!isValid(parseISO(date))) return '';

  return format(parseISO(date.slice(0, 10)), 'dd/MM/yyyy');
};

export const getUnixHash = () => {
  return getUnixTime(new Date());
};

export const getDatesByPeriod = (period) => {
  const date = new Date();
  const pattern = 'yyyy-MM-dd';
  const periods = {
    TODAY: {
      start: format(startOfDay(date), pattern),
      end: format(endOfDay(date), pattern),
    },
    WEEK: {
      start: format(startOfWeek(date), pattern),
      end: format(endOfWeek(date), pattern),
    },
    MONTH: {
      start: format(startOfMonth(date), pattern),
      end: format(endOfMonth(date), pattern),
    },
    YEAR: {
      start: format(startOfYear(date), pattern),
      end: format(endOfYear(date), pattern),
    },
  };

  return periods[period] || { start: '', end: '' };
};
