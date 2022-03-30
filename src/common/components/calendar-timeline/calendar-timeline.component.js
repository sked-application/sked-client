import React, { useEffect, useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Link } from 'react-router-dom';
import {
  AiOutlineClockCircle,
  AiOutlineCheck,
  AiOutlineCarryOut,
  AiOutlineLeft,
  AiOutlineRight,
  AiOutlineMobile,
  AiOutlineCloseCircle,
  AiOutlineCheckCircle,
  AiOutlineUser,
} from 'react-icons/ai';
import { getDayLabelByDate, getMonthLabelByDate } from '../../utils/date';
import { telephoneMask } from '../../utils/telephone-mask';
import './calendar-timeline.component.scss';

const generateCalendarDates = (startDate, endDate) => {
  const start = startDate.clone();
  const end = endDate.clone();
  let dates = [];

  while (start < end) {
    const formattedDate = start.format('YYYY-MM-DD');

    dates.push(formattedDate);
    start.add(1, 'day');
  }

  return dates;
};

const CalendarTimeline = ({
  list,
  status,
  isLoading,
  date,
  initialDate,
  clearInitialDate,
  setStatus,
  updateStatus,
  setDate,
  isCustomerSchudule,
}) => {
  const today = moment().format('YYYY-MM-DD');
  const [startDate, setStartDate] = useState(moment(date).startOf('week'));
  const [endDate, setEndDate] = useState(moment(date).endOf('week'));
  const [dates, setDates] = useState([]);

  const handlePrev = () => {
    setStartDate(moment(startDate).subtract(7, 'day'));
    setEndDate(moment(endDate).subtract(7, 'day'));

    if (isCustomerSchudule) {
      clearInitialDate('');
    }
  };

  const handleNext = () => {
    setStartDate(moment(startDate).add(7, 'days'));
    setEndDate(moment(endDate).add(7, 'days'));

    if (isCustomerSchudule) {
      clearInitialDate('');
    }
  };

  const handleChangeDate = (currentDate) => {
    setDate(currentDate);
  };

  useEffect(() => {
    const newDates = generateCalendarDates(startDate, endDate);
    const activeDate =
      initialDate ||
      newDates.find((currentDate) => currentDate === today) ||
      newDates[0];

    setDates(newDates);
    setDate(activeDate);
  }, [startDate, endDate, today, setDate, initialDate]);

  return (
    <div>
      <div className="filter__body">
        <div className="input-month__switch">
          <span className="input-month__button" onClick={handlePrev}>
            <AiOutlineLeft />
          </span>
          <span className="input-month__label">
            {getMonthLabelByDate(date)}
          </span>
          <span className="input-month__button" onClick={handleNext}>
            <AiOutlineRight />
          </span>
        </div>
        <div className="select-month__status">
          <select
            value={status}
            onChange={(event) => setStatus(event.target.value)}
            className="select select--dark"
          >
            <option value="SCHEDULED">Agendados</option>
            <option value="CANCELED">Cancelados</option>
            <option value="FINISHED">Finalizados</option>
          </select>
        </div>
      </div>
      <div className="calendar-timeline__body">
        <aside className="calendar-timeline__date">
          {dates.map((currentDate) => (
            <div
              key={currentDate}
              onClick={() => handleChangeDate(currentDate)}
              className={`
								calendar-timeline__date__item
								${currentDate === date ? 'calendar-timeline__date__item--active' : ''} `}
            >
              <div>
                <strong className="calendar-timeline__date__title">
                  {currentDate.split('-')[2]}
                </strong>
              </div>
              <div>
                <span className="calendar-timeline__date__label">
                  {getDayLabelByDate(currentDate, 'SHORT')}
                </span>
              </div>
            </div>
          ))}
        </aside>
        <section className="calendar-timeline__list">
          {isLoading ? (
            <div className="loading"></div>
          ) : (
            <Fragment>
              {list.map((schedule) => (
                <div key={schedule.id} className="calendar-timeline__card">
                  <div className="calendar-timeline__card__header">
                    {isCustomerSchudule ? (
                      <h2 className="calendar-timeline__card__title">
                        <Link to={`/${schedule.company.url}`}>
                          {schedule.company.name}
                        </Link>
                      </h2>
                    ) : (
                      <h2 className="calendar-timeline__card__title">
                        {schedule.customer.name}
                      </h2>
                    )}

                    <div>
                      {status === 'SCHEDULED' && !schedule.confirmedAt && (
                        <div className="calendar-timeline__card__status">
                          Agendado
                        </div>
                      )}

                      {status === 'SCHEDULED' && schedule.confirmedAt && (
                        <div className="calendar-timeline__card__status">
                          Confirmado
                        </div>
                      )}

                      {status === 'CANCELED' && (
                        <div className="calendar-timeline__card__status">
                          Cancelado
                        </div>
                      )}

                      {status === 'FINISHED' && (
                        <div className="calendar-timeline__card__status">
                          Finalizado
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="calendar-timeline__card__body">
                    <div className="calendar-timeline__card__content">
                      <div className="calendar-timeline__card__item">
                        <span>
                          <AiOutlineCarryOut />
                        </span>
                        {schedule.service.name}
                      </div>

                      {isCustomerSchudule ? (
                        <div className="calendar-timeline__card__item">
                          <span>
                            <AiOutlineUser />
                          </span>
                          {schedule.user.name}
                        </div>
                      ) : (
                        <div className="calendar-timeline__card__item">
                          <span>
                            <AiOutlineMobile />
                          </span>
                          <a href={`tel:+55${schedule.customer.telephone}`}>
                            {telephoneMask(schedule.customer.telephone)}
                          </a>
                        </div>
                      )}
                    </div>
                    <div className="calendar-timeline__card__info">
                      <strong className="calendar-timeline__card__item">
                        <span>
                          <AiOutlineClockCircle />
                        </span>
                        {schedule.start.slice(0, 5)}
                      </strong>
                      <strong className="calendar-timeline__card__item">
                        R$ {schedule.price}
                      </strong>
                    </div>
                  </div>

                  {status === 'SCHEDULED' && (
                    <Fragment>
                      <div className="calendar-timeline__card__separator"></div>
                      <div className="calendar-timeline__card__actions">
                        {!schedule.confirmedAt && (
                          <button
                            onClick={() =>
                              updateStatus(schedule.id, 'CONFIRMED')
                            }
                            className="button button--small"
                          >
                            <AiOutlineCheck /> Confirmar
                          </button>
                        )}

                        {!isCustomerSchudule && schedule.confirmedAt && (
                          <button
                            onClick={() =>
                              updateStatus(schedule.id, 'FINISHED')
                            }
                            className="button button--small"
                          >
                            <AiOutlineCheckCircle /> Finalizar
                          </button>
                        )}

                        <button
                          onClick={() => updateStatus(schedule.id, 'CANCELED')}
                          className="button button--small"
                        >
                          <AiOutlineCloseCircle /> Cancelar
                        </button>
                      </div>
                    </Fragment>
                  )}
                </div>
              ))}
            </Fragment>
          )}

          {!isLoading && !list.length && (
            <div className="calendar-timeline__card calendar-timeline__card--not-found">
              <span>
                Nenhum {isCustomerSchudule ? 'compromisso' : 'agendamento'} para
                este dia.
              </span>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

CalendarTimeline.propTypes = {
  list: PropTypes.array.isRequired,
  status: PropTypes.string.isRequired,
  updateStatus: PropTypes.func.isRequired,
  setDate: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  date: PropTypes.string.isRequired,
  initialDate: PropTypes.string,
  clearInitialDate: PropTypes.func,
  setStatus: PropTypes.func.isRequired,
  isCustomerSchudule: PropTypes.bool,
};

export default CalendarTimeline;
