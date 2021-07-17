import React from 'react';
import PropTypes from 'prop-types';

import './company-thumb.component.scss';

const CompanyThumb = ({ src }) => {
  return (
    <div className="company-thumb">
      {src && <img className="company-thumb__image" src={src} />}
    </div>
  );
};

CompanyThumb.propTypes = {
  src: PropTypes.string,
};

export default CompanyThumb;
