import React from 'react';
import TimegridForm from './settings-components/settings-timegrid-form/settings-timegrid-form';

const Settings = () => {
    return (
        <>
			<div className="page__header p-b-30">
				<div className="container">
					<h1 className="page__title">Grade de horário</h1>
					<div className="m-t-5">
						<span className="page__description">Gerencie os horários de sua agenda.</span>
					</div>
				</div>
			</div>
            <div className="container m-t-30">
                <TimegridForm />
            </div>
        </>
    );
};

export default Settings;
