import React from 'react';
import TimegridForm from './components/timegrid-form-component/timegrid-form.component';
import PageHeader from '../../common/components/page-header';

const Timegrid = () => {
  return (
    <div className="container">
      <PageHeader
        title="Grade de horário"
        description="Gerencie os horários de sua agenda."
      />
      <TimegridForm />
    </div>
  );
};

export default Timegrid;
