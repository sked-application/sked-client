import React, { memo } from 'react';

const Copyright = memo(() => {
  return (
    <div className="pb-24 text-sm text-center">
      <span>
        © {new Date().getFullYear()} Copyright Sked App. Todos os direitos
        reservados.
      </span>
    </div>
  );
});

Copyright.displayName = 'Copyright';
export default Copyright;
