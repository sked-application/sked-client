import React, { memo } from 'react';
import PropTypes from 'prop-types';
import srcPlaceholder from '../../assets/images/logo-placeholder.png';

const CompanyThumb = memo(({ src }) => {
  const imageSrc = src || srcPlaceholder;

  return (
    <div className="rounded-xl w-20 h-20 overflow-hidden flex items-center bg-gray-200">
      <img className="w-full" src={imageSrc} />
    </div>
  );
});

CompanyThumb.displayName = 'CompanyThumb';
CompanyThumb.propTypes = {
  src: PropTypes.string,
};

export default CompanyThumb;
