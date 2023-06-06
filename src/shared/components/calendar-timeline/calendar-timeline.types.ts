import { TScheduleStatus } from '../../../modules/schedule/schedule.types';
import { ICalendarTimelineItem } from './calendar-timeline.interfaces';

export type TCalendarTimelineDate = {
  startDate: Date;
  endDate: Date;
};

export type TCalendarTimelineSchedulesByDate = {
  [key: string]: ICalendarTimelineItem[];
};

export type TCalendarTimelineTabStatus = {
  name: string;
  value: TScheduleStatus;
};
