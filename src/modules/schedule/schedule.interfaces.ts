import { ICompany } from '../company/company.interfaces';
import { IService } from '../service/service.interfaces';
import { IUser } from '../user/user.interfaces';

export interface ISchedule {
  id: number;
  start: string;
  end: string;
  date: string;
  confirmedAt: string;
  canceledAt: string;
  finishedAt: string;
  price: number;
  createdAt: string;
  company: Pick<ICompany, 'name' | 'url' | 'telephone'>;
  customer: Pick<IUser, 'name' | 'telephone'>;
  user: Pick<IUser, 'name'>;
  service: Pick<IService, 'name'>;
}

export interface ISchedulesByDay {
  [key: string]: ISchedule[];
}
