import React, { useContext } from 'react';
import MainSlotGrid from './main-components/main-slotgrid/main-slotgrid';
import MainScheduleForm from './main-components/main-schedule-form/main-schedule-form';
import MainDate from './main-components/main-date/main-date';
import MainServices from './main-components/main-services/main-services';
import MainUsers from './main-components/main-users/main-users';

import { MainProvider, MainContext } from '../../contexts/main/main';
import { Redirect } from 'react-router-dom';

import './main.scss';

const MainContexted = () => {
    const { accountExists, isMainRequestPeding, accountUserName } = useContext(
        MainContext
    );

    if (!accountExists) {
        return <Redirect to="/not-found" />;
    }

    return (
		<div className="p-b-80">
			<div className="page__header">
				<div className="container">
					{/* <div className="flexbox flexbox__justify--center m-b-15">
						<figure className="page__thumb">
							<img src="https://i.pinimg.com/originals/a4/58/91/a45891b8705f918291eaf248d40edabd.jpg" alt={accountUserName}/>
						</figure>
					</div> */}
					<h1 className="page__title">{accountUserName}</h1>
					<div className="m-t-5">
						<span className="page__description">Realize seu agendamento abaixo.</span>
					</div>
				</div>
			</div>
			<div className="container m-t-30">
				<>
					{isMainRequestPeding ? (
						<div className="loading"></div>
					) : (
						<>
							<MainDate />
							<MainUsers />
							<MainServices />
							<MainSlotGrid />
							<MainScheduleForm />
						</>
					)}
				</>
			</div>
		</div>
    );
};

const Main = () => (
    <MainProvider>
        <MainContexted />
    </MainProvider>
);

export default Main;
