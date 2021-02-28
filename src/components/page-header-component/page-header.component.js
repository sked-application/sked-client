import React, { memo } from 'react';
import PropTypes from 'prop-types';

import './page-header.component.scss';

const PageHeader = memo(({
	title,
	description,
}) => {
    return (
		<div className="page__header">
			<h1 className="page__title">{title}</h1>
			{description && (
				<div className="page__description">
					<span>{description}</span>
				</div>
			)}
		</div>
    );
});

PageHeader.displayName = 'PageHeader';
PageHeader.propTypes = {
    title: PropTypes.string.isRequired,
	description: PropTypes.string,
};

export default PageHeader;
