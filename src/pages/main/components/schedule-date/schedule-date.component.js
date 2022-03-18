import React, { useContext } from 'react';
import { AiOutlineCalendar } from 'react-icons/ai';
import { MainContext } from '../../contexts/main';

const ScheduleDate = () => {
  const { MAIN_STATE, MAIN_DISPATCH, MAIN_ACTIONS } = useContext(MainContext);

  const handleChangeDate = async (event) => {
    MAIN_DISPATCH({
      type: MAIN_ACTIONS.SET_START_DATE,
      value: event.target.value,
    });

    MAIN_DISPATCH({
      type: MAIN_ACTIONS.SET_SCHEDULE_SLOT,
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
          value={MAIN_STATE.startDate}
          onChange={(event) => handleChangeDate(event)}
          className="input input--dark"
        />
      </div>
    </div>
  );
};

export default ScheduleDate;
