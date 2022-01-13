import React, { useContext } from 'react';
import { AiOutlineCalendar } from 'react-icons/ai';
import { MainContext } from '../../contexts/main';

const ScheduleDate = () => {
  const [mainState, mainDispatch, mainActions] = useContext(MainContext);

  const handleChangeDate = async (event) => {
    mainDispatch({
      type: mainActions.SET_START_DATE,
      value: event.target.value,
    });

    mainDispatch({
      type: mainActions.SET_SCHEDULE_SLOT,
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
          value={mainState.startDate}
          onChange={(event) => handleChangeDate(event)}
          className="input input--dark"
        />
      </div>
    </div>
  );
};

export default ScheduleDate;
