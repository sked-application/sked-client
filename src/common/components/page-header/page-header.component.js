import React, { memo } from 'react';
import PropTypes from 'prop-types';

const PageHeader = memo(({ title, description }) => {
  return (
    <div className="my-6">
      <h1 className="text-2xl font-semibold">{title}</h1>
      {description && (
        <div className="text-sm">
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
};

export default PageHeader;
