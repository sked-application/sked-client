import differenceInDays from 'date-fns/differenceInDays';
import { TCompanyPlans } from './company.types';

export const companyPlanLabels = (plan: TCompanyPlans): string => {
  const planLabels: { [key in TCompanyPlans]: string } = {
    TRIAL: 'Avaliação gratuita',
    DEFAULT: 'Padrão (R$ 9,90)',
    CUSTOM: 'Personalizado (R$ 25,90)',
  };

  return planLabels[plan];
};

export const getLeftTrialDays = (companyCreatedAt: string): number => {
  return Math.max(
    0,
    30 - differenceInDays(new Date(), new Date(companyCreatedAt)),
  );
};
