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
  const [MainState, MainDispatch, MainActions] = useContext(MainContext);
  const [isLoading, setIsLoading] = useState();
  const [timegrid, setTimegrid] = useState([]);
  const [activedSlot, setActivedSlot] = useState();

  const handleSetSlot = (slot, index) => {
    setActivedSlot(index);

    MainDispatch({
      type: MainActions.SET_SCHEDULE_SLOT,
      value: {
        ...slot,
        date: MainState.startDate,
      },
    });
  };

  const listSlots = useCallback(async () => {
    try {
      if (!MainState.service.id || !MainState.user.id) {
        setTimegrid([]);
        return;
      }

      if (!MainState.startDate) {
        alert('Escolha uma data válida');
        return;
      }

      setIsLoading(true);

      const { data } = await TimegridService.findSlots({
        userId: MainState.user.id,
        date: MainState.startDate,
        serviceId: MainState.service.id,
        companyId: MainState.accountInfo.id,
        serviceDuration: MainState.service.duration,
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
    MainState.user.id,
    MainState.startDate,
    MainState.service.id,
    MainState.accountInfo.id,
    MainState.service.duration,
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
            {getDayLabelByDate(MainState.startDate)}
          </span>
        </div>
      </div>

      {MainState.service.id && MainState.user.id && !!timegrid.length && (
        <Fragment>
          <div>
            <span className="card__subtitle">{MainState.service.name}</span>
          </div>
          {MainState.service.showPrice && (
            <div>
              <span className="card__subtitle color--green">
                R$ {MainState.service.price}
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

          {MainState.service.id && MainState.user.id && !timegrid.length && (
            <div className="slot__pending">
              <span>Nenhum horário disponível</span>
            </div>
          )}

          {!MainState.user.id ? (
            <div className="slot__pending">
              <span>Selecione um profissional.</span>
            </div>
          ) : !MainState.service.id ? (
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
