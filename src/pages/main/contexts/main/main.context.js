import React, {
  createContext,
  useEffect,
  useCallback,
  useReducer,
} from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import AccountService from '../../../../services/company.service';
import { handleError } from '../../../../common/utils/api';

const initialState = {
  scheduleSlot: '',
  accountInfo: {},
  accountExists: true,
  isMainRequestPeding: true,
  startDate: moment().format('YYYY-MM-DD'),
  service: {},
  user: {},
};

const actions = {
  SET_START_DATE: 'SET_START_DATE',
  SET_SCHEDULE_SLOT: 'SET_SCHEDULE_SLOT',
  SET_SERVICE: 'SET_SERVICE',
  SET_USER: 'SET_USER',
  SET_ACCOUNT_NOT_EXIST: 'SET_ACCOUNT_NOT_EXIST',
  SET_ACCOUNT_INFO: 'SET_ACCOUNT_INFO',
};

const reducer = (state, action) => {
  switch (action.type) {
    case actions.SET_START_DATE:
      return {
        ...state,
        startDate: action.value,
      };
    case actions.SET_SCHEDULE_SLOT:
      return {
        ...state,
        scheduleSlot: action.value,
      };
    case actions.SET_SERVICE:
      return {
        ...state,
        service: action.value,
      };
    case actions.SET_USER:
      return {
        ...state,
        user: action.value,
      };
    case actions.SET_ACCOUNT_NOT_EXIST:
      return {
        ...state,
        isMainRequestPeding: false,
        accountExists: false,
      };
    case actions.SET_ACCOUNT_INFO:
      return {
        ...state,
        accountInfo: action.value,
        isMainRequestPeding: false,
      };
    default:
      return state;
  }
};

export const MainContext = createContext();

export const MainProvider = ({ children }) => {
  const { company } = useParams();
  const [state, dispatch] = useReducer(reducer, initialState);

  const resetMainDate = () => {
    dispatch({
      type: actions.SET_START_DATE,
      value: initialState.startDate,
    });
  };

  const resetMainService = () => {
    dispatch({
      type: actions.SET_SERVICE,
      value: initialState.service,
    });
  };

  const findCompany = useCallback(async () => {
    try {
      const { data } = await AccountService.find({ company });

      if (!data) {
        dispatch({
          type: actions.SET_ACCOUNT_NOT_EXIST,
        });
        return;
      }

      dispatch({
        type: actions.SET_ACCOUNT_INFO,
        value: data,
      });
    } catch (error) {
      alert(handleError(error));
    }
  }, [company]);

  useEffect(() => {
    findCompany();
  }, [findCompany]);

  return (
    <MainContext.Provider
      value={{
        startDate: state.startDate,
        scheduleSlot: state.scheduleSlot,
        accountInfo: state.accountInfo,
        accountExists: state.accountExists,
        isMainRequestPeding: state.isMainRequestPeding,
        service: state.service,
        user: state.user,
        setStartDate: (value) =>
          dispatch({ type: actions.SET_START_DATE, value }),
        setScheduleSlot: (value) =>
          dispatch({ type: actions.SET_SCHEDULE_SLOT, value }),
        setService: (value) => dispatch({ type: actions.SET_SERVICE, value }),
        setUser: (value) => dispatch({ type: actions.SET_USER, value }),
        resetMainDate,
        resetMainService,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

MainProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
