import React, { useContext } from 'react';
import { AiOutlineCalendar } from 'react-icons/ai';
import { MainContext } from '../../contexts/main';

const ScheduleDate = () => {
  const [MainState, MainDispatch, MainActions] = useContext(MainContext);

  const handleChangeDate = async (event) => {
    MainDispatch({
      type: MainActions.SET_START_DATE,
      value: event.target.value,
    });

    MainDispatch({
      type: MainActions.SET_SCHEDULE_SLOT,
      value: '',
    });
  };

  return (
    <div className="card card--date card--outline">
      <div className="card__header">
        <h2 className="card__title">
          <AiOutlineCalendar /> Selecione a data
        </h2>
      </div>
      <div className="m-t-5">
        <input
          type="date"
          value={MainState.startDate}
          onChange={(event) => handleChangeDate(event)}
          className="input input--dark"
        />
      </div>
    </div>
  );
};

export default ScheduleDate;
