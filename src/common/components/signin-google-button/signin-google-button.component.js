import React, { memo } from 'react';
import useGoogleAuthentication from '../../hooks/use-google-authentication';
import GoogleLogin from 'react-google-login';
const googleClientId = process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID;

const SignInGoogleButton = memo(() => {
  const { handleSuccess } = useGoogleAuthentication();
  return (
    <GoogleLogin
      clientId={googleClientId}
      buttonText="Continuar com Google"
      onSuccess={handleSuccess}
      theme="dark"
    />
  );
});

SignInGoogleButton.displayName = 'SignInGoogleButton';

export default SignInGoogleButton;
