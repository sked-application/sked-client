import React, { memo } from 'react';
import PropTypes from 'prop-types';
import './page-header.component.scss';

const PageHeader = memo(({ title, description, titleSize }) => {
  return (
    <div className="page__header">
      <h1 className={`page__title page__title--${titleSize}`}>{title}</h1>
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
  title: PropTypes.string,
  description: PropTypes.string,
  titleSize: PropTypes.string,
};

export default PageHeader;
