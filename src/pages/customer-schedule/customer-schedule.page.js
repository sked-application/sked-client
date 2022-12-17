import React, { useState, useEffect, useCallback } from 'react';
import { startOfDay, endOfDay, addDays, format } from 'date-fns';
import CalendarTimeline from '../../common/components/calendar-timeline';
import ScheduleService from '../../services/schedule.service';
import PageHeader from '../../common/components/page-header';
import { handleError } from '../../common/utils/api';
import { useLocation } from 'react-router-dom';

const statusLabels = {
  CONFIRMED: 'confirmar',
  CANCELED: 'cancelar',
};

const CustomerSchedules = () => {
  const location = useLocation();
  const initialDate = location.state?.date
    ? new Date(location.state.date)
    : new Date();
  const [isLoading, setIsLoading] = useState(true);
  const [schedules, setSchedules] = useState({});
  const [status, setStatus] = useState('SCHEDULED');
  const [date, setDate] = useState({
    startDate: startOfDay(initialDate),
    endDate: endOfDay(addDays(initialDate, 6)),
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
        title="Meus compromissos"
        description="Acompanhe seu histórico de agendamentos."
      />
      <CalendarTimeline
        status={status}
        list={schedules}
        isLoading={isLoading}
        date={date}
        updateStatus={updateStatus}
        setDate={setDate}
        setStatus={setStatus}
        isCustomerSchudule={true}
      />
    </div>
  );
};

export default CustomerSchedules;
