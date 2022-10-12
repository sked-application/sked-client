import React, { useEffect, useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Link } from 'react-router-dom';
import {
  AiOutlineCheck,
  AiOutlineLeft,
  AiOutlineRight,
  AiOutlineCloseCircle,
  AiOutlineCheckCircle,
} from 'react-icons/ai';
import {
  getDayLabelByDate,
  getFormattedDatePreview,
  getMonthLabelByDate,
} from '../../utils/date';
import { telephoneMask } from '../../utils/telephone-mask';
import { getFormattedPrice } from '../../utils/price';
import Loading from '../loading';
import { Tab } from '@headlessui/react';
import { classNames } from '../../utils/helper';

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
  setStatus,
  updateStatus,
  setDate,
  isCustomerSchudule,
}) => {
  const [startDate, setStartDate] = useState(moment(date.startDate));
  const [endDate, setEndDate] = useState(moment(date.endDate));
  const [dates, setDates] = useState([]);
  const [tabStatus] = useState([
    {
      name: 'Agendados',
      value: 'SCHEDULED',
    },
    {
      name: 'Cancelados',
      value: 'CANCELED',
    },
    {
      name: 'Finalizados',
      value: 'FINISHED',
    },
  ]);

  const handlePrev = () => {
    setStartDate(moment(startDate).subtract(7, 'day'));
    setEndDate(moment(endDate).subtract(7, 'day'));
  };

  const handleNext = () => {
    setStartDate(moment(startDate).add(7, 'days'));
    setEndDate(moment(endDate).add(7, 'days'));
  };

  useEffect(() => {
    const newDates = generateCalendarDates(startDate, endDate);

    setDates(newDates);
    setDate({
      startDate: startDate.format('YYYY-MM-DD'),
      endDate: endDate.format('YYYY-MM-DD'),
    });
  }, [startDate, endDate, setDate]);

  return (
    <div>
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-gray-200 p-1">
          {tabStatus.map((status) => (
            <Tab
              key={status.name}
              onClick={() => setStatus(status.value)}
              className={({ selected }) =>
                classNames(
                  'w-full rounded-lg py-2.5 font-semibold ',
                  'ring-none outline-none focus:outline-none focus:ring-none',
                  selected ? 'bg-indigo-500 text-white' : 'text-slate-800',
                )
              }
            >
              {status.name}
            </Tab>
          ))}
        </Tab.List>
      </Tab.Group>
      <div className="h-12 p-1 bg-gray-200 rounded-xl flex justify-between mt-1">
        <a
          onClick={handlePrev}
          className="flex items-center justify-center cursor-pointer bg-indigo-500 rounded-lg w-10"
        >
          <AiOutlineLeft className="text-white" />
        </a>
        <div className="flex justify-around flex-1 items-center">
          <div className="pt-1">
            <span className="mr-1">De</span>
            <span className="mr-1 font-semibold">
              {dates[0]?.split('-')[2]}
            </span>
            <span>{getMonthLabelByDate(dates[0])}</span>
          </div>
          <div className="pt-1">
            <span className="mr-1">Até</span>
            <span className="mr-1 font-semibold">
              {dates[dates.length - 1]?.split('-')[2]}
            </span>
            <span>{getMonthLabelByDate(dates[dates.length - 1])}</span>
          </div>
        </div>
        <a
          onClick={handleNext}
          className="flex items-center justify-center cursor-pointer bg-indigo-500 rounded-lg w-10"
        >
          <AiOutlineRight className="text-white" />
        </a>
      </div>
      <section className="mt-4">
        {isLoading ? (
          <Loading />
        ) : (
          <Fragment>
            {Object.entries(list).map(([date, schedules]) => (
              <div key={date} className="mb-4">
                <div className="flex items-center justify-between px-4 py-2 bg-white">
                  <h3 className="font-semibold text-lg mr-2">
                    {getFormattedDatePreview(date)}
                  </h3>
                  <span className="font-semibold">
                    {getDayLabelByDate(date)}
                  </span>
                </div>
                {schedules.map((schedule) => (
                  <div
                    key={schedule.id}
                    className="mb-4 border divide-solid border-stone-200 rounded-xl p-4 bg-white"
                  >
                    <div className="flex justify-between mb-2">
                      {isCustomerSchudule ? (
                        <h2 className="font-semibold">
                          <Link to={`/${schedule.company.url}`}>
                            {schedule.company.name}
                          </Link>
                        </h2>
                      ) : (
                        <h2 className="font-semibold">
                          {schedule.customer.name}
                        </h2>
                      )}

                      <div>
                        {status === 'SCHEDULED' && !schedule.confirmedAt && (
                          <div>Agendado</div>
                        )}

                        {status === 'SCHEDULED' && schedule.confirmedAt && (
                          <div>Confirmado</div>
                        )}

                        {status === 'CANCELED' && <div>Cancelado</div>}

                        {status === 'FINISHED' && <div>Finalizado</div>}
                      </div>
                    </div>
                    <ul className="mb-4">
                      <li className="mb-1">
                        <span className="font-semibold mr-2">Serviço:</span>
                        <span>{schedule.service.name}</span>
                      </li>
                      <li className="mb-1">
                        {isCustomerSchudule ? (
                          <Fragment>
                            <span className="font-semibold mr-2">
                              Profissional:
                            </span>
                            <span>{schedule.user.name}</span>
                          </Fragment>
                        ) : (
                          <Fragment>
                            <span className="font-semibold mr-2">
                              Telefone:
                            </span>
                            <a href={`tel:+351${schedule.customer.telephone}`}>
                              {telephoneMask(schedule.customer.telephone)}
                            </a>
                          </Fragment>
                        )}
                      </li>
                      <li className="mb-1">
                        <span className="font-semibold mr-2">Data/Hora:</span>
                        <span>
                          {`${getFormattedDatePreview(
                            schedule.date,
                          )} ${schedule.start.slice(0, 5)}`}
                        </span>
                      </li>
                      <li className="mb-1">
                        <span className="font-semibold mr-2">Preço:</span>
                        <span>{getFormattedPrice(schedule.price, 'R$')}</span>
                      </li>
                    </ul>

                    {status === 'SCHEDULED' && (
                      <Fragment>
                        <div className="flex">
                          {!schedule.confirmedAt && (
                            <a
                              className="mr-4 cursor-pointer"
                              onClick={() =>
                                updateStatus(schedule.id, 'CONFIRMED')
                              }
                            >
                              <div className="flex items-center justify-center text-indigo-500">
                                <AiOutlineCheck size={20} className="mr-1" />
                                <span className="pt-1 font-semibold">
                                  Confirmar
                                </span>
                              </div>
                            </a>
                          )}

                          {!isCustomerSchudule && schedule.confirmedAt && (
                            <a
                              className="mr-4 cursor-pointer"
                              onClick={() =>
                                updateStatus(schedule.id, 'FINISHED')
                              }
                            >
                              <div className="flex items-center justify-center text-green-600">
                                <AiOutlineCheckCircle
                                  size={20}
                                  className="mr-1"
                                />
                                <span className="pt-1 font-semibold">
                                  Finalizar
                                </span>
                              </div>
                            </a>
                          )}

                          <a
                            className="cursor-pointer"
                            onClick={() =>
                              updateStatus(schedule.id, 'CANCELED')
                            }
                          >
                            <div className="flex items-center justify-center text-red-500">
                              <AiOutlineCloseCircle
                                size={20}
                                className="mr-1"
                              />
                              <span className="pt-1 font-semibold">
                                Cancelar
                              </span>
                            </div>
                          </a>
                        </div>
                      </Fragment>
                    )}
                  </div>
                ))}
              </div>
            ))}
            {!Object.keys(list).length && (
              <div className="text-center p-4">
                <span>
                  {`Nenhum ${
                    isCustomerSchudule ? 'compromisso' : 'agendamento'
                  } para esta pesquisa.`}
                </span>
              </div>
            )}
          </Fragment>
        )}
      </section>
    </div>
  );
};

CalendarTimeline.propTypes = {
  list: PropTypes.object.isRequired,
  status: PropTypes.string.isRequired,
  updateStatus: PropTypes.func.isRequired,
  setDate: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  date: PropTypes.shape({
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired,
  }),
  setStatus: PropTypes.func.isRequired,
  isCustomerSchudule: PropTypes.bool,
};

export default CalendarTimeline;
