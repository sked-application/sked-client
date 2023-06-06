import React, { useContext, useState } from 'react';
import { Wizard } from 'react-use-wizard';
import PageHeader from '../../shared/components/page-header';
import AnimatedWrapper from '../../shared/components/animated-wrapper';
import CustomerSignUpForm from '../../shared/components/customer-signup-form';
import CustomerVerificationForm from '../../shared/components/customer-verification-form';
import { AuthContext } from '../../contexts/auth';

const CustomerSignIn = () => {
  const { AUTH_DISPATCH, AUTH_ACTIONS } = useContext(AuthContext);
  const [customerSignInData, setCustomerSignInData] = useState({});

  return (
    <div className="container mx-auto px-4 max-w-md flex-1">
      <PageHeader
        title="Sou cliente"
        description="Gerencie seus compromissos."
      />
      <div className="mb-4 border divide-solid border-stone-200 rounded-xl p-4">
        <Wizard>
          <AnimatedWrapper>
            <CustomerSignUpForm
              isValidToSubmit={() => true}
              onSubmit={(data) => setCustomerSignInData(data)}
            />
          </AnimatedWrapper>
          <AnimatedWrapper>
            <CustomerVerificationForm
              customerSignInData={customerSignInData}
              isValidToSubmit={() => true}
              onSubmit={(data) =>
                AUTH_DISPATCH({
                  type: AUTH_ACTIONS.SET_SIGN_IN,
                  value: { token: data },
                })
              }
            />
          </AnimatedWrapper>
        </Wizard>
      </div>
    </div>
  );
};

export default CustomerSignIn;
