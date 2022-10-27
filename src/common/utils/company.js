import differenceInDays from 'date-fns/differenceInDays';

export const companyPlanLabels = (plan) => {
  const planLabels = {
    TRIAL: 'Avaliação gratuita',
    DEFAULT: 'Padrão (R$ 8,90)',
    CUSTOM: 'Personalizado (R$ 25,90)',
  };

  return planLabels[plan];
};

export const getLeftTrialDays = (companyCreatedAt) => {
  return Math.max(
    0,
    30 - differenceInDays(new Date(), new Date(companyCreatedAt)),
  );
};
