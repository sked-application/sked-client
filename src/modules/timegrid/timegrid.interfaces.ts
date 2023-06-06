export interface ITimegrid {
  start: string;
  end: string;
  day: number;
}

export interface ITimegridByDay {
  [key: number]: ITimegrid[];
}
