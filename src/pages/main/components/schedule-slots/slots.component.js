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
  const [mainState, mainDispatch, mainActions] = useContext(MainContext);
  const [isLoading, setIsLoading] = useState();
  const [timegrid, setTimegrid] = useState([]);
  const [activedSlot, setActivedSlot] = useState();

  const handleSetSlot = (slot, index) => {
    setActivedSlot(index);

    mainDispatch({
      type: mainActions.SET_SCHEDULE_SLOT,
      value: {
        ...slot,
        date: mainState.startDate,
      },
    });
  };

  const listSlots = useCallback(async () => {
    try {
      if (!mainState.service.id || !mainState.user.id) {
        setTimegrid([]);
        return;
      }

      if (!mainState.startDate) {
        alert('Escolha uma data válida');
        return;
      }

      setIsLoading(true);

      const { data } = await TimegridService.findSlots({
        userId: mainState.user.id,
        date: mainState.startDate,
        serviceId: mainState.service.id,
        companyId: mainState.accountInfo.id,
        serviceDuration: mainState.service.duration,
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
    mainState.user.id,
    mainState.startDate,
    mainState.service.id,
    mainState.accountInfo.id,
    mainState.service.duration,
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
            {getDayLabelByDate(mainState.startDate)}
          </span>
        </div>
      </div>

      {mainState.service.id && mainState.user.id && !!timegrid.length && (
        <Fragment>
          <div>
            <span className="card__subtitle">{mainState.service.name}</span>
          </div>
          {mainState.service.showPrice && (
            <div>
              <span className="card__subtitle color--green">
                R$ {mainState.service.price}
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

          {mainState.service.id && mainState.user.id && !timegrid.length && (
            <div className="slot__pending">
              <span>Nenhum horário disponível</span>
            </div>
          )}

          {!mainState.user.id ? (
            <div className="slot__pending">
              <span>Selecione um profissional.</span>
            </div>
          ) : !mainState.service.id ? (
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
