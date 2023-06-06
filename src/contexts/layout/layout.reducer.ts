import { ILayout } from '../../layout/layout.interfaces';
import { LayoutActions } from './layout.actions';
import { LayoutDispatch } from './layout.dispatch';

export const LayoutReducer = (
  state: ILayout,
  action: LayoutDispatch,
): ILayout => {
  switch (action.type) {
    case LayoutActions.SET_CURRENT_PATHNAME:
      return {
        ...state,
        currentPathname: action.value?.currentPathname,
      };
    case LayoutActions.SET_IS_MENU_OPEN:
      return {
        ...state,
        isMenuOpen: action.value.isMenuOpen,
      };
    default:
      return state;
  }
};
