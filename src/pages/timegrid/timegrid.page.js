import React from 'react';
import TimegridForm from './components/timegrid-form-component/timegrid-form.component';
import PageHeader from '../../components/page-header-component/page-header.component';

const Settings = () => {
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

export default Settings;
