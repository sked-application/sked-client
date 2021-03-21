import React, { memo } from 'react';
import PropTypes from 'prop-types';

import './company-contact.component.scss';

const CompanyContact = memo(({ accountInfo }) => {
  return (
    <div className="contact-footer">
      {accountInfo.telephone && (
        <p>
          Telefone:{' '}
          <a href={`tel:+55${accountInfo.telephone}`}>
            {accountInfo.telephone}
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
