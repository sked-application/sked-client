export interface ICalendarTimelineItem {
  canceledAt: string;
  company: {
    name: string;
    url: string;
    telephone: string;
  };
  confirmedAt: string;
  createdAt: string;
  customer: { name: string; telephone: string };
  date: string;
  end: string;
  finishedAt: string;
  id: number;
  price: number;
  service: { name: string };
  start: string;
  user: { name: string };
}
