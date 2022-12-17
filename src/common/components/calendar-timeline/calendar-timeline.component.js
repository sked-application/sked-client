import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { subDays, addDays, getDate } from 'date-fns';
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

const DIRECTIONS = {
  PREV: 'PREV',
  NEXT: 'NEXT',
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

  const handleDirection = (direction) => {
    const handleDates =
      direction === DIRECTIONS.PREV
        ? {
            start: subDays(date.startDate, 7),
            end: subDays(date.startDate, 1),
          }
        : {
            start: addDays(date.endDate, 1),
            end: addDays(date.endDate, 7),
          };

    setDate({
      startDate: handleDates.start,
      endDate: handleDates.end,
    });
  };

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
          onClick={() => handleDirection(DIRECTIONS.PREV)}
          className="flex items-center justify-center cursor-pointer bg-indigo-500 rounded-lg w-10"
        >
          <AiOutlineLeft className="text-white" />
        </a>
        <div className="flex justify-around flex-1 items-center">
          <div className="pt-1">
            <span className="mr-1">De</span>
            <span className="mr-1 font-semibold">
              {getDate(date.startDate)}
            </span>
            <span>{getMonthLabelByDate(date.startDate)}</span>
          </div>
          <div className="pt-1">
            <span className="mr-1">Até</span>
            <span className="mr-1 font-semibold">{getDate(date.endDate)}</span>
            <span>{getMonthLabelByDate(date.endDate)}</span>
          </div>
        </div>
        <a
          onClick={() => handleDirection(DIRECTIONS.NEXT)}
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
            {Object.entries(list)
              .sort()
              .map(([date, schedules]) => (
                <div key={date} className="mb-4">
                  <div className="flex items-center justify-between px-4 py-2 bg-white sticky top-0">
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
                              <a href={`tel:+55${schedule.customer.telephone}`}>
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
    startDate: PropTypes.instanceOf(Date).isRequired,
    endDate: PropTypes.instanceOf(Date).isRequired,
  }),
  setStatus: PropTypes.func.isRequired,
  isCustomerSchudule: PropTypes.bool,
};

export default CalendarTimeline;
