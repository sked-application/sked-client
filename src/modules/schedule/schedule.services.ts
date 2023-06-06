import api from '../../api';
import { ISchedulesByDay } from './schedule.interfaces';
import { TScheduleStatus } from './schedule.types';

const create = (data: {
  date: string;
  start: string;
  end: string;
  companyId: number;
  serviceId: number;
  userId: number;
}): Promise<{ data: string }> => {
  return api.post('v1/schedules', data);
};

const updateStatus = (data: {
  id: number;
  status: TScheduleStatus;
}): Promise<{ data: string }> => {
  return api.put(`v1/schedules/status/${data.id}`, {
    status: data.status,
  });
};

const findAll = (data: {
  startDate: string;
  endDate: string;
  status: TScheduleStatus;
}): Promise<{ data: ISchedulesByDay }> => {
  return api.get('v1/schedules', {
    params: {
      startDate: data.startDate,
      endDate: data.endDate,
      status: data.status,
    },
  });
};

export default {
  create,
  findAll,
  updateStatus,
};
