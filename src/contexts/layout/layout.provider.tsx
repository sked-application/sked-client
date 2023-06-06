import React from 'react';
import { LayoutActions } from './layout.actions';
import { LayoutContext, LayoutInitialState } from './layout.context';
import { LayoutReducer } from './layout.reducer';

export const LayoutProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = React.useReducer(LayoutReducer, LayoutInitialState);
  return (
    <LayoutContext.Provider
      value={{
        LAYOUT_PROVIDER: {
          state,
          dispatch,
          actions: LayoutActions,
        },
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
};
