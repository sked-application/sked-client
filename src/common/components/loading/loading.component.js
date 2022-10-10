import React from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const Loading = (props) => {
  return (
    <AiOutlineLoading3Quarters
      {...props}
      className="animate-spin h-5 w-5 border-slate-800 mx-auto"
    />
  );
};

Loading.displayName = 'Loading';
export default Loading;
