import React, { useState, useEffect, useCallback } from 'react';
import { addDays, format, endOfDay, startOfDay } from 'date-fns';
import CalendarTimeline from '../../common/components/calendar-timeline';
import ScheduleService from '../../services/schedule.service';
import PageHeader from '../../common/components/page-header';
import { handleError } from '../../common/utils/api';

const statusLabels = {
  CONFIRMED: 'confirmar',
  CANCELED: 'cancelar',
  FINISHED: 'finalizar',
};

const Schedule = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [schedules, setSchedules] = useState({});
  const [status, setStatus] = useState('SCHEDULED');
  const [date, setDate] = useState({
    startDate: startOfDay(new Date()),
    endDate: endOfDay(addDays(new Date(), 6)),
  });

  const updateStatus = async (id, updateStatus) => {
    try {
      const alertQuestion = `Deseja ${statusLabels[updateStatus]} esse agendamento?`;

      if (window.confirm(alertQuestion)) {
        setIsLoading(true);

        await ScheduleService.updateStatus({
          id,
          status: updateStatus,
        });

        listSchedules();
      }
    } catch (error) {
      alert(handleError(error));
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

      setSchedules(data);
      setIsLoading(false);
    } catch (error) {
      alert(handleError(error));
      setIsLoading(false);
    }
  }, [date, status]);

  useEffect(() => {
    listSchedules();
  }, [listSchedules]);

  return (
    <div className="container mx-auto px-4 max-w-screen-lg flex-1">
      <PageHeader
        title="Agendamentos"
        description="Gerencie sua lista de agendamentos."
      />
      <CalendarTimeline
        status={status}
        list={schedules}
        isLoading={isLoading}
        date={date}
        updateStatus={updateStatus}
        setDate={setDate}
        setStatus={setStatus}
      />
    </div>
  );
};

export default Schedule;
