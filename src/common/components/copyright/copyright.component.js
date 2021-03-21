import React, { memo } from 'react';

import './copyright.component.scss';

const Copyright = memo(() => {
  return (
    <div className="copyright">
      <span>
        © {new Date().getFullYear()} Copyright Sked App. Todos os direitos
        reservados.
      </span>
    </div>
  );
});

Copyright.displayName = 'Copyright';
export default Copyright;
