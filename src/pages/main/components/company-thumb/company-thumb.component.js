import React, { useContext } from 'react';
import { MainContext } from '../../contexts/main';

import './company-thumb.component.scss';

const CompanyThumb = () => {
  const { accountInfo } = useContext(MainContext);

  return (
    <div className="company-thumb">
      <img
        className="company-thumb__image"
        src={
          accountInfo.thumb ||
          'https://www.segurofacil.com.br/Content/Images/default-user.png'
        }
      />
    </div>
  );
};

export default CompanyThumb;
