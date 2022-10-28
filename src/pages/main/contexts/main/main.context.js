import React, {
  createContext,
  useEffect,
  useCallback,
  useReducer,
} from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import CompanyService from '../../../../services/company.service';
import { handleError } from '../../../../common/utils/api';
import { replaceSpecialCharacters } from '../../../../common/utils/validator';
import { getLeftTrialDays } from '../../../../common/utils/company';

const initialState = {
  scheduleSlot: {},
  accountInfo: {},
  accountExists: true,
  accountIsExpired: false,
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
  SET_ACCOUNT_IS_EXPIRED: 'SET_ACCOUNT_IS_EXPIRED',
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
    case actions.SET_ACCOUNT_IS_EXPIRED:
      return {
        ...state,
        isMainRequestPeding: false,
        accountIsExpired: true,
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

  const findCompany = useCallback(async () => {
    try {
      const { data } = await CompanyService.find({
        url: replaceSpecialCharacters(company),
      });

      if (!data) {
        dispatch({
          type: actions.SET_ACCOUNT_NOT_EXIST,
        });
        return;
      } else if (
        data.plan === 'TRIAL' &&
        getLeftTrialDays(data.createdAt) <= 0
      ) {
        dispatch({
          type: actions.SET_ACCOUNT_IS_EXPIRED,
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
        MAIN_STATE: state,
        MAIN_DISPATCH: dispatch,
        MAIN_ACTIONS: actions,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

MainProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
