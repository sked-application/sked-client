import React, { useState, Fragment, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  subDays,
  addDays,
  getDate,
  startOfDay,
  endOfDay,
  format,
} from 'date-fns';
import {
  AiOutlineCheck,
  AiOutlineLeft,
  AiOutlineRight,
  AiOutlineCloseCircle,
  AiOutlineCheckCircle,
} from 'react-icons/ai';
import ScheduleService from '../../../modules/schedule/schedule.services';
import {
  getDayLabelByDate,
  getFormattedDatePreview,
  getMonthLabelByDate,
} from '../../utils/date';
import { handleError } from '../../../api/api.utils';
import { telephoneMask } from '../../utils/telephone-mask';
import { getFormattedPrice } from '../../utils/price';
import Loading from '../loading';
import { Tab } from '@headlessui/react';
import { classNames } from '../../utils/helper';
import {
  TCalendarTimelineDate,
  TCalendarTimelineSchedulesByDate,
  TCalendarTimelineTabStatus,
} from './calendar-timeline.types';
import {
  ECalendarTimelineDirections,
  EupdateStatusMessage,
} from './calendar-timeline.enums';
import { TScheduleStatus } from '../../../modules/schedule/schedule.types';
import { ErrorType } from '../../../api/api.types';

const CalendarTimeline: React.FC<{
  initialDate: Date;
  isCustomerSchudule: boolean;
}> = ({ initialDate, isCustomerSchudule }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [schedulesByDate, setSchedulesByDate] =
    useState<TCalendarTimelineSchedulesByDate>({});
  const [status, setStatus] = useState<TScheduleStatus>('SCHEDULED');
  const [date, setDate] = useState<TCalendarTimelineDate>({
    startDate: startOfDay(initialDate),
    endDate: endOfDay(addDays(initialDate, 6)),
  });
  const [tabStatus] = useState<TCalendarTimelineTabStatus[]>([
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

  const updateStatus = async (id: number, updateStatus: TScheduleStatus) => {
    try {
      const alertQuestion = EupdateStatusMessage[updateStatus];

      if (window.confirm(alertQuestion)) {
        setIsLoading(true);

        await ScheduleService.updateStatus({
          id,
          status: updateStatus,
        });

        listSchedules();
      }
    } catch (error) {
      alert(handleError(error as ErrorType));
    }
  };

  const listSchedules = useCallback(async () => {
    try {
      setIsLoading(true);

      const { data } = await ScheduleService.findAll({
        startDate: format(date.startDate, 'yyyy-MM-dd'),
        endDate: format(date.endDate, 'yyyy-MM-dd'),
        status,
      });

      setSchedulesByDate(data);
      setIsLoading(false);
    } catch (error) {
      alert(handleError(error as ErrorType));
      setIsLoading(false);
    }
  }, [date, status]);

  const handleDirection = (direction: ECalendarTimelineDirections): void => {
    switch (direction) {
      case ECalendarTimelineDirections.PREV:
        setDate({
          startDate: subDays(date.startDate, 7),
          endDate: subDays(date.startDate, 1),
        });
        break;
      case ECalendarTimelineDirections.NEXT:
        setDate({
          startDate: addDays(date.endDate, 1),
          endDate: addDays(date.endDate, 7),
        });
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    listSchedules();
  }, [listSchedules]);

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
          onClick={() => handleDirection(ECalendarTimelineDirections.PREV)}
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
          onClick={() => handleDirection(ECalendarTimelineDirections.NEXT)}
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
            {Object.entries(schedulesByDate)
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
            {!Object.keys(schedulesByDate).length && (
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

export default CalendarTimeline;
