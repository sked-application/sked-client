import React, { useContext } from 'react';
import {
	AiOutlineCalendar,
} from "react-icons/ai";

import { MainContext } from '../../contexts/main.context';
const MainDate = () => {
	const {
		startDate,
		setStartDate,
		setScheduleSlot
	} = useContext(MainContext);

    const handleChangeDate = async (event) => {
        setStartDate(event.target.value);
        setScheduleSlot('');
    };

    return (
        <div className="card card--date">
            <div className="card__header">
                <h2 className="card__title">
					<AiOutlineCalendar/> Selecione a data
				</h2>
            </div>
            <div className="m-t-5">
                <input
                    type="date"
                    value={startDate}
					onChange={(event) => handleChangeDate(event)}
					className="input input--dark" />
            </div>
        </div>
    );
};

export default MainDate;
