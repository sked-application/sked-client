import { ILayout } from '../../layout/layout.interfaces';
import { LayoutActions } from './layout.actions';

export type LayoutDispatch = {
  type: LayoutActions;
  value: ILayout;
};
