import React, { Fragment, useContext } from 'react';
import MainSlotGrid from './components/slotgrid-component/slotgrid.component';
import MainScheduleForm from './components/schedule-form-component/schedule-form.component';
import MainDate from './components/date-component/date.component';
import MainServices from './components/services-component/services.component';
import MainUsers from './components/users-component/users.component';
import PageHeader from '../../components/page-header-component/page-header.component';

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
			<PageHeader
				title={accountInfo.name}
				description="Realize seu agendamento abaixo." />
			<Fragment>
				{isMainRequestPeding ? (
					<div className="loading"></div>
				) : (
					<Fragment>
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
