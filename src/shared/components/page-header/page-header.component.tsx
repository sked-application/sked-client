import React, { memo } from 'react';

const PageHeader: React.FC<{ title: string; description: string }> = ({
  title,
  description,
}) => {
  return (
    <div className="my-6">
      <h1 className="text-2xl font-semibold">{title}</h1>
      {description && (
        <div>
          <span>{description}</span>
        </div>
      )}
    </div>
  );
};

export default memo(PageHeader);
