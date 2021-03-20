import React, { createContext, useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import AccountService from '../../../services/account.service';

import { useParams } from 'react-router-dom';
import { handleError } from '../../../utils/api';

export const MainContext = createContext();

export const MainProvider = ({ children }) => {
  const { company } = useParams();
  const [scheduleSlot, setScheduleSlot] = useState('');
  const [accountInfo, setAccountInfo] = useState({});
  const [accountExists, setAccountExists] = useState(true);
  const [isMainRequestPeding, setIsMainRequestPeding] = useState(true);
  const [startDate, setStartDate] = useState(moment().format('YYYY-MM-DD'));
  const [service, setService] = useState({});
  const [user, setUser] = useState({});

  const resetMainDate = () => {
    setStartDate(moment().format('YYYY-MM-DD'));
  };

  const resetMainService = () => {
    setService({});
  };

  const findCompany = useCallback(async () => {
    try {
      const { data } = await AccountService.find({ company });

      if (!data) {
        setIsMainRequestPeding(false);
        setAccountExists(false);
        return;
      }

      setAccountInfo(data);
      setIsMainRequestPeding(false);
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
        startDate,
        scheduleSlot,
        accountInfo,
        accountExists,
        isMainRequestPeding,
        service,
        user,
        setStartDate,
        setScheduleSlot,
        setService,
        setUser,
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
