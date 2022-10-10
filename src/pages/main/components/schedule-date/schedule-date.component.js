import React, { useContext } from 'react';
import { AiOutlineCalendar } from 'react-icons/ai';
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
    <div className="mb-4 border divide-solid border-stone-200 rounded-xl p-4">
      <div className="mb-2 flex">
        <AiOutlineCalendar size={18} className="mr-2" />
        <h2 className="text-md font-semibold">Selecione a data</h2>
      </div>
      <div>
        <Input
          type="date"
          value={MAIN_STATE.startDate}
          onChange={(event) => handleChangeDate(event)}
          className="input"
        />
      </div>
    </div>
  );
};

export default ScheduleDate;
