import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { telephoneMask } from '../../../../common/utils/telephone-mask';
import './company-contact.component.scss';

const CompanyContact = memo(({ accountInfo }) => {
  return (
    <div className="contact-footer">
      {accountInfo.telephone && (
        <p>
          <span>Telefone: </span>
          <a href={`tel:+55${accountInfo.telephone}`}>
            {telephoneMask(accountInfo.telephone)}
          </a>
        </p>
      )}
      {accountInfo.address && <p>Endereço: {accountInfo.address}</p>}
    </div>
  );
});

CompanyContact.displayName = 'CompanyContact';
CompanyContact.propTypes = {
  accountInfo: PropTypes.object,
};

export default CompanyContact;
