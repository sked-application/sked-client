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
import Favorite from './components/favorite';
import CompanyThumb from '../../common/components/company-thumb';
import './main.page.scss';

const MainContexted = () => {
  const { MAIN_STATE } = useContext(MainContext);

  if (!MAIN_STATE.accountExists) {
    return <Redirect to="/not-found" />;
  }

  return (
    <div className="container">
      <div className="main-company__thumbnail">
        <CompanyThumb src={MAIN_STATE.accountInfo.thumbnail} />
      </div>
      <PageHeader
        title={MAIN_STATE.accountInfo.name}
        description="Realize seu agendamento abaixo."
      />
      <Fragment>
        {MAIN_STATE.isMainRequestPeding ? (
          <div className="loading"></div>
        ) : (
          <Fragment>
            <Favorite />
            <ScheduleDate />
            <ScheduleProfessionals />
            <ScheduleServices />
            <ScheduleSlots />
            <ScheduleForm />
            <CompanyContact accountInfo={MAIN_STATE.accountInfo} />
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
