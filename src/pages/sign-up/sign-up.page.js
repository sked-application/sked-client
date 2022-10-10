import React from 'react';
import { useParams } from 'react-router-dom';
import AccountSetup from './components/account-setup';
import AccountSignUp from './components/account-signup';

const SignUpNew = () => {
  const { token } = useParams();

  return (
    <div className="flex-1">
      {!token ? <AccountSignUp /> : <AccountSetup token={token} />}
    </div>
  );
};

export default SignUpNew;
