import React, { memo } from 'react';
import PropTypes from 'prop-types';

import './account-contact.component.scss';

const AccountContact = memo(({ accountInfo }) => {
    return (
		<div className="contact-footer">
			{accountInfo.telephone && (
				<p>Telefone: <a href={`tel:+55${accountInfo.telephone}`}>{accountInfo.telephone}</a></p>
			)}
			{accountInfo.address && (
				<p>Endereço: {accountInfo.address}</p>
			)}
		</div>
	);
});

AccountContact.displayName = 'AccountContact';
AccountContact.propTypes = {
    accountInfo: PropTypes.object,
};

export default AccountContact;
