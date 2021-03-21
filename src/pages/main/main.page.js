import React, { Fragment, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import ScheduleDate from './components/schedule-date';
import { MainProvider, MainContext } from './contexts/main';
import ScheduleProfessionals from './components/schedule-professionals';
import ScheduleServices from './components/schedule-services';
import ScheduleSlots from './components/schedule-slots';
import ScheduleForm from './components/schedule-form';
import PageHeader from '../../common/components/page-header';
import CompanyContact from './components/company-contact';
import './main.page.scss';

const MainContexted = () => {
  const { accountExists, isMainRequestPeding, accountInfo } = useContext(
    MainContext,
  );

  if (!accountExists) {
    return <Redirect to="/not-found" />;
  }

  return (
    <div className="container">
      <PageHeader
        title={accountInfo.name}
        description="Realize seu agendamento abaixo."
      />
      <Fragment>
        {isMainRequestPeding ? (
          <div className="loading"></div>
        ) : (
          <Fragment>
            <ScheduleDate />
            <ScheduleProfessionals />
            <ScheduleServices />
            <ScheduleSlots />
            <ScheduleForm />
            <CompanyContact accountInfo={accountInfo} />
          </Fragment>
        )}
      </Fragment>
    </div>
  );
};

const Main = () => (
  <MainProvider>
    <MainContexted />
  </MainProvider>
);

export default Main;
