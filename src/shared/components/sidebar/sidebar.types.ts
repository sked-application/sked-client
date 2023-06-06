import { IMenuValues } from './sidebar.interfaces';

export type TMenuCategories = 'Agenda' | 'Finanças' | 'Configurações';

export type TMenuObject = {
  [key in TMenuCategories]?: IMenuValues[];
};
