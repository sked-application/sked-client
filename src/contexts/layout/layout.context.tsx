import React from 'react';
import { ILayout } from '../../layout/layout.interfaces';
import { LayoutActions } from './layout.actions';
import { LayoutDispatch } from './layout.dispatch';

export const LayoutInitialState: ILayout = {
  currentPathname: '',
  isMenuOpen: false,
};

export const LayoutContext = React.createContext<{
  LAYOUT_PROVIDER: {
    state: ILayout;
    dispatch: React.Dispatch<LayoutDispatch>;
    actions: { [key in LayoutActions]: LayoutActions };
  };
}>({
  LAYOUT_PROVIDER: {
    state: LayoutInitialState,
    dispatch: () => null,
    actions: LayoutActions,
  },
});
