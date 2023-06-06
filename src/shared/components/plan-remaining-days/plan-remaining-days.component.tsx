import React from 'react';
import {
  companyPlanLabels,
  getLeftTrialDays,
} from '../../../modules/company/company.utils';
import { ICompany } from '../../../modules/company/company.interfaces';

const PlanRemainingDays: React.FC<{
  userCompany: ICompany;
  onlyRemainingDays: boolean;
}> = ({ userCompany, onlyRemainingDays }) => {
  if (!userCompany) {
    return null;
  }

  if (onlyRemainingDays) {
    if (userCompany.plan === 'TRIAL') {
      return (
        <span>
          {`${getLeftTrialDays(userCompany.createdAt)} dia(s) restante(s)`}
        </span>
      );
    }

    return null;
  }

  return (
    <React.Fragment>
      <span>{companyPlanLabels(userCompany.plan)}</span>
      {userCompany.plan === 'TRIAL' && (
        <span>{` - ${getLeftTrialDays(
          userCompany.createdAt,
        )} dia(s) restante(s)`}</span>
      )}
    </React.Fragment>
  );
};

export default React.memo(PlanRemainingDays);
