import React, { memo } from 'react';
import srcPlaceholder from '../../../assets/images/logo-placeholder.png';

const CompanyThumb: React.FC<{
  src: string;
}> = ({ src }) => {
  const imageSource = src || String(srcPlaceholder);

  return (
    <div className="rounded-xl w-20 h-20 overflow-hidden flex items-center bg-gray-200">
      <img className="w-full" src={imageSource} />
    </div>
  );
};

export default memo(CompanyThumb);
