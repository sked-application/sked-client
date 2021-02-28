import React from 'react';
import TimegridForm from './components/timegrid-form.component';

const Settings = () => {
    return (
        <div className="container">
			<div className="page__header">
				<h1 className="page__title">Grade de horário</h1>
				<div className="m-t-5">
					<span className="page__description">Gerencie os horários de sua agenda.</span>
				</div>
			</div>
			<TimegridForm />
        </div>
    );
};

export default Settings;
