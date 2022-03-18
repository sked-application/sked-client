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

import './slots.component.scss';

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
  ]);

  useEffect(() => {
    listSlots();
  }, [listSlots]);

  return (
    <div className="card card--slots card--outline">
      <div className="card__header">
        <div>
          <h2 className="card__title">
            <AiOutlineClockCircle /> Horários
          </h2>
        </div>
        <div className="flexbox flexbox--column flexbox--end">
          <span className="card__subtitle card__subtitle--captalized m-b-5">
            {getDayLabelByDate(MAIN_STATE.startDate)}
          </span>
        </div>
      </div>

      {MAIN_STATE.service.id && MAIN_STATE.user.id && !!timegrid.length && (
        <Fragment>
          <div>
            <span className="card__subtitle">{MAIN_STATE.service.name}</span>
          </div>
          {MAIN_STATE.service.showPrice && (
            <div>
              <span className="card__subtitle color--green">
                R$ {MAIN_STATE.service.price}
              </span>
            </div>
          )}
        </Fragment>
      )}

      {isLoading ? (
        <div className="loading"></div>
      ) : (
        <Fragment>
          {!!timegrid.length && (
            <div className="slot__box">
              {timegrid.map((slot, index) => (
                <div key={index} className="slot__item">
                  <div
                    onClick={() => handleSetSlot(slot, index)}
                    className={`badge badge--light badge--outline m-t-5 m-b-5 ${
                      activedSlot === index ? 'actived' : ''
                    }`}
                  >
                    <div className="badge__content">
                      <span>{slot.start.slice(0, 5)}</span>
                      <span>{slot.end.slice(0, 5)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {MAIN_STATE.service.id && MAIN_STATE.user.id && !timegrid.length && (
            <div className="slot__pending">
              <span>Nenhum horário disponível</span>
            </div>
          )}

          {!MAIN_STATE.user.id ? (
            <div className="slot__pending">
              <span>Selecione um profissional.</span>
            </div>
          ) : !MAIN_STATE.service.id ? (
            <div className="slot__pending">
              <span>Selecione um serviço.</span>
            </div>
          ) : (
            <Fragment />
          )}
        </Fragment>
      )}
    </div>
  );
};

export default MainSlotGrid;
