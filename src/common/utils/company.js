import differenceInDays from 'date-fns/differenceInDays';

export const companyPlanLabels = (plan) => {
  const planLabels = {
    TRIAL: 'Avaliação gratuita',
    DEFAULT: 'Padrão (R$ 14,90)',
    CUSTOM: 'Personalizado (R$ 39,90)',
  };

  return planLabels[plan];
};

export const getLeftTrialDays = (companyCreatedAt) => {
  return 30 - differenceInDays(new Date(), new Date(companyCreatedAt));
};
