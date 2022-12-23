import React, {
  useState,
  useContext,
  useEffect,
  useCallback,
  Fragment,
} from 'react';
import { AiOutlineClockCircle } from 'react-icons/ai';
import TimegridService from '../../../../services/timegrid.service';
import { MainContext } from '../../contexts/main';
import { getDayLabelByDate } from '../../../../common/utils/date';
import { handleError } from '../../../../common/utils/api';
import Loading from '../../../../common/components/loading';
import ScheduleDate from '../schedule-date';

const MainSlotGrid = () => {
  const { MAIN_STATE, MAIN_DISPATCH, MAIN_ACTIONS } = useContext(MainContext);
  const [isLoading, setIsLoading] = useState();
  const [timegrid, setTimegrid] = useState([]);
  const [activedSlot, setActivedSlot] = useState();

  const handleSetSlot = (slot, index) => {
    setActivedSlot(index);

    MAIN_DISPATCH({
      type: MAIN_ACTIONS.SET_SCHEDULE_SLOT,
      value: {
        ...slot,
        date: MAIN_STATE.startDate,
      },
    });
  };

  const listSlots = useCallback(async () => {
    try {
      if (!MAIN_STATE.service.id || !MAIN_STATE.user.id) {
        setTimegrid([]);
        MAIN_DISPATCH({
          type: MAIN_ACTIONS.SET_SCHEDULE_SLOT,
          value: {},
        });
        return;
      }

      if (!MAIN_STATE.startDate) {
        alert('Escolha uma data válida');
        return;
      }

      setIsLoading(true);

      const { data } = await TimegridService.findSlots({
        userId: MAIN_STATE.user.id,
        date: MAIN_STATE.startDate,
        serviceId: MAIN_STATE.service.id,
        companyId: MAIN_STATE.accountInfo.id,
        serviceDuration: MAIN_STATE.service.duration,
      });

      if (data) {
        setTimegrid(data);
      }

      setActivedSlot();
      setIsLoading(false);
    } catch (error) {
      alert(handleError(error));
    }
  }, [
    MAIN_STATE.user.id,
    MAIN_STATE.startDate,
    MAIN_STATE.service.id,
    MAIN_STATE.accountInfo.id,
    MAIN_STATE.service.duration,
    MAIN_ACTIONS.SET_SCHEDULE_SLOT,
    MAIN_DISPATCH,
  ]);

  useEffect(() => {
    listSlots();
  }, [listSlots]);

  return (
    <div className="my-4 border divide-solid border-stone-200 rounded-xl p-4">
      <div className="flex justify-between mb-2">
        <div className="flex">
          <AiOutlineClockCircle size={20} className="mr-2" />
          <h2 className="text-md font-semibold">Data e Hora</h2>
        </div>
        <div>
          <span>{getDayLabelByDate(MAIN_STATE.startDate)}</span>
        </div>
      </div>

      {isLoading ? (
        <Loading />
      ) : (
        <div>
          <div>
            <ScheduleDate />
          </div>
          {!!timegrid.length && (
            <div className="grid grid-cols-4 gap-2 mt-4">
              {timegrid.map((slot, index) => (
                <div
                  key={index}
                  onClick={() => handleSetSlot(slot, index)}
                  className={`border divide-solid border-stone-200 rounded-lg p-2 cursor-pointer text-center ${
                    activedSlot === index ? 'bg-slate-800 text-white' : ''
                  }`}
                >
                  <span>{slot.start.slice(0, 5)}</span>
                </div>
              ))}
            </div>
          )}

          {MAIN_STATE.service.id && MAIN_STATE.user.id && !timegrid.length && (
            <div className="text-amber-500 mt-2">
              <span>Nenhum horário disponível para esta pesquisa</span>
            </div>
          )}

          {!MAIN_STATE.service.id ? (
            <div className="text-amber-500 mt-2">
              <span>Selecione um serviço.</span>
            </div>
          ) : (
            <Fragment />
          )}
        </div>
      )}
    </div>
  );
};

export default MainSlotGrid;
