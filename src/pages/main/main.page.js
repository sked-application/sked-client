import React, { Fragment, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { MainProvider, MainContext } from './contexts/main';
import ScheduleProfessionals from './components/schedule-professionals';
import ScheduleServices from './components/schedule-services';
import ScheduleSlots from './components/schedule-slots';
import ScheduleForm from './components/schedule-form';
import PageHeader from '../../common/components/page-header';
import CompanyContact from './components/company-contact';
import Favorite from './components/favorite';
import CompanyThumb from '../../common/components/company-thumb';
import Loading from '../../common/components/loading';

const MainContexted = () => {
  const { MAIN_STATE } = useContext(MainContext);

  if (!MAIN_STATE.accountExists) {
    return <Redirect to="/not-found" />;
  }

  if (MAIN_STATE.accountIsExpired) {
    return (
      <div className="container mx-auto px-4 max-w-screen-lg">
        <PageHeader
          title="Que pena, mas esta conta encontra-se temporariamente indisponível"
          description="Para mais informações entre em contato com o estabelecimento."
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 max-w-screen-lg">
      {MAIN_STATE.isMainRequestPeding ? (
        <Loading />
      ) : (
        <Fragment>
          <CompanyThumb src={MAIN_STATE.accountInfo.thumbnail} />
          <PageHeader
            title={MAIN_STATE.accountInfo.name}
            description="Realize seu agendamento de forma prática, apenas siga os passos abaixo."
          />
          <Favorite />
          <ScheduleProfessionals />
          <ScheduleServices />
          <ScheduleSlots />
          <ScheduleForm />
          <CompanyContact accountInfo={MAIN_STATE.accountInfo} />
        </Fragment>
      )}
    </div>
  );
};

const Main = () => (
  <MainProvider>
    <MainContexted />
  </MainProvider>
);

export default Main;
