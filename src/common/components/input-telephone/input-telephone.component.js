import React, { forwardRef } from 'react';

const InputTelephone = forwardRef((props, ref) => {
  return <input {...props} placeholder="Telefone" type="tel" ref={ref} />;
});

InputTelephone.displayName = 'InputTelephone';
export default InputTelephone;
