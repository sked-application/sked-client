import React, { useContext } from 'react';
import Input from '../../../../common/components/input';
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
    <Input
      type="date"
      value={MAIN_STATE.startDate}
      onChange={(event) => handleChangeDate(event)}
      className="input"
    />
  );
};

export default ScheduleDate;
