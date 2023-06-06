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

export const getDayLabelByDate = (date: string, short?: boolean) => {
  const pattern = short ? 'EEEEEE' : 'EEEE';

  if (!isValid(parseISO(date))) return '';

  return format(parseISO(date.slice(0, 10)), pattern, {
    locale: ptBR,
  });
};

export const getMonthLabelByDate = (date: Date) => {
  const formattedDate = format(date, 'yyyy-MM-dd');

  if (!isValid(parseISO(formattedDate))) return '';

  return format(parseISO(formattedDate.slice(0, 10)), 'MMM', {
    locale: ptBR,
  });
};

export const getFormattedDatePreview = (date: string) => {
  if (!isValid(parseISO(date))) return '';

  return format(parseISO(date.slice(0, 10)), 'dd/MM/yyyy');
};

export const getUnixHash = () => {
  return getUnixTime(new Date());
};

export type TDatePeriodsKeys = 'TODAY' | 'WEEK' | 'MONTH' | 'YEAR';
export type TDatePeriodsObjectValues = {
  start: string;
  end: string;
};
export type TDatePeriodsObject = {
  [key in TDatePeriodsKeys]: TDatePeriodsObjectValues;
};
export const getDatesByPeriod = (
  period: TDatePeriodsKeys,
): TDatePeriodsObjectValues => {
  const date = new Date();
  const pattern = 'yyyy-MM-dd';
  const periods: TDatePeriodsObject = {
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
