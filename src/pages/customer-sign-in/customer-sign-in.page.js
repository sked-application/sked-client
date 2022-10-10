import React, { useContext, useState } from 'react';
import { Wizard } from 'react-use-wizard';
import PageHeader from '../../common/components/page-header';
import AnimatedWrapper from '../../common/components/animated-wrapper';
import CustomerTelephoneForm from '../../common/components/customer-telephone-form';
import CustomerVerificationForm from '../../common/components/customer-verification-form';
import { AuthContext } from '../../common/contexts/auth';

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
            <CustomerTelephoneForm
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
                  value: data,
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
