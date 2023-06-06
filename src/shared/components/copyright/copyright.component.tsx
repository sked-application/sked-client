import React, { memo } from 'react';

const Copyright: React.FC = () => {
  return (
    <div className="pb-24 text-sm text-center">
      <span>
        © {new Date().getFullYear()} Copyright Sked App. Todos os direitos
        reservados.
      </span>
    </div>
  );
};

export default memo(Copyright);
