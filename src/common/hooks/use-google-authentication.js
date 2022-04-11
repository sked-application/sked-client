import { useContext } from 'react';
import AuthService from '../../services/auth.service';
import { AuthContext } from '../contexts/auth';

const useGoogleAuthentication = () => {
  const { AUTH_DISPATCH, AUTH_ACTIONS } = useContext(AuthContext);
  const handleSuccess = async (response) => {
    if (response.accessToken && response.tokenId) {
      const { data } = await AuthService.customerSignInWithGoogle({
        accessToken: response.accessToken,
        tokenId: response.tokenId,
      });

      AUTH_DISPATCH({
        type: AUTH_ACTIONS.SET_SIGN_IN,
        value: data,
      });
    }
  };

  return {
    handleSuccess,
  };
};

export default useGoogleAuthentication;
