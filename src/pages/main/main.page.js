import React, { useContext } from 'react';
import MainSlotGrid from './components/slotgrid.component';
import MainScheduleForm from './components/schedule-form.component';
import MainDate from './components/date.component';
import MainServices from './components/services.component';
import MainUsers from './components/users.component';

import { MainProvider, MainContext } from './contexts/main.context';
import { Redirect } from 'react-router-dom';

import './main.page.scss';

const MainContexted = () => {
    const {
		accountExists,
		isMainRequestPeding,
		accountInfo
	} = useContext(MainContext);

    if (!accountExists) {
        return <Redirect to="/not-found" />;
    }

    return (
		<div className="container">
			<div className="page__header">
				<h1 className="page__title">{accountInfo.name}</h1>
				<div className="m-t-5">
					<span className="page__description">Realize seu agendamento abaixo.</span>
				</div>
			</div>
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
						<div className="contact-footer">
							{accountInfo.telephone && (
								<p>Telefone: <a href={`tel:+55${accountInfo.telephone}`}>{accountInfo.telephone}</a></p>
							)}
							{accountInfo.address && (
								<p>Endereço: {accountInfo.address}</p>
							)}
							<p>{accountInfo.name}</p>
						</div>
					</>
				)}
			</>
		</div>
    );
};

const Main = () => (
    <MainProvider>
        <MainContexted />
    </MainProvider>
);

export default Main;