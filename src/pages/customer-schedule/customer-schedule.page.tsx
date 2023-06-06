import React from 'react';
import CalendarTimeline from '../../shared/components/calendar-timeline';
import PageHeader from '../../shared/components/page-header';
import { useLocation } from 'react-router-dom';
import { ILocationState } from './interfaces';

const CustomerSchedules: React.FC = () => {
  const location = useLocation<ILocationState>();
  const initialDate = location.state?.date
    ? new Date(location.state.date)
    : new Date();

  return (
    <div className="container mx-auto px-4 max-w-screen-lg flex-1">
      <PageHeader
        title="Meus compromissos"
        description="Acompanhe seu histórico de agendamentos."
      />
      <CalendarTimeline initialDate={initialDate} isCustomerSchudule={true} />
    </div>
  );
};

export default CustomerSchedules;
