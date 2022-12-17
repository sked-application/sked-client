import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { telephoneMask } from '../../../../common/utils/telephone-mask';

const CompanyContact = memo(({ accountInfo }) => {
  return (
    <div className="mb-6">
      {accountInfo.telephone && (
        <p className="text-center">
          <span>Telefone: </span>
          <a href={`tel:+55${accountInfo.telephone}`}>
            {telephoneMask(accountInfo.telephone)}
          </a>
        </p>
      )}
      {accountInfo.address && (
        <div className="text-center">
          <a
            href={`https://maps.google.com/?q=${accountInfo.address}`}
            target="_blank"
            rel="noreferrer"
          >
            Endereço: {accountInfo.address}
          </a>
        </div>
      )}
    </div>
  );
});

CompanyContact.displayName = 'CompanyContact';
CompanyContact.propTypes = {
  accountInfo: PropTypes.object,
};

export default CompanyContact;
