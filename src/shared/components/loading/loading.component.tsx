import React from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const Loading: React.FC = () => {
  return (
    <AiOutlineLoading3Quarters className="animate-spin h-5 w-5 border-slate-800 mx-auto" />
  );
};

export default Loading;
