import React from 'react';
import CalendarTimeline from '../../shared/components/calendar-timeline';
import PageHeader from '../../shared/components/page-header';

const Schedules: React.FC = () => {
  const initialDate = new Date();

  return (
    <div className="container mx-auto px-4 max-w-screen-lg flex-1">
      <PageHeader
        title="Agendamentos"
        description="Gerencie sua lista de agendamentos."
      />
      <CalendarTimeline initialDate={initialDate} isCustomerSchudule={false} />
    </div>
  );
};

export default Schedules;
