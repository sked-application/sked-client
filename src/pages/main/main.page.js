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
  const [mainState] = useContext(MainContext);

  if (!mainState.accountExists) {
    return <Redirect to="/not-found" />;
  }

  return (
    <div className="container">
      <div className="main-company__thumbnail">
        <CompanyThumb src={mainState.accountInfo.thumbnail} />
      </div>
      <PageHeader
        title={mainState.accountInfo.name}
        description="Realize seu agendamento abaixo."
      />
      <Fragment>
        {mainState.isMainRequestPeding ? (
          <div className="loading"></div>
        ) : (
          <Fragment>
            <Favorite />
            <ScheduleDate />
            <ScheduleProfessionals />
            <ScheduleServices />
            <ScheduleSlots />
            <ScheduleForm />
            <CompanyContact accountInfo={mainState.accountInfo} />
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
