import React, { Fragment, memo } from 'react';
import { companyPlanLabels, getLeftTrialDays } from '../../utils/company';
import PropTypes from 'prop-types';

const PlanRemainingDays = memo(({ userCompany, onlyRemainingDays }) => {
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
    <Fragment>
      <span>{companyPlanLabels(userCompany.plan)}</span>
      {userCompany.plan === 'TRIAL' && (
        <span>{` - ${getLeftTrialDays(
          userCompany.createdAt,
        )} dia(s) restante(s)`}</span>
      )}
    </Fragment>
  );
});

PlanRemainingDays.displayName = 'PlanRemainingDays';
PlanRemainingDays.propTypes = {
  userCompany: PropTypes.object,
  onlyRemainingDays: PropTypes.bool,
};
export default PlanRemainingDays;
