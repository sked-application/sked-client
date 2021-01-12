import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import AccountService from '../../../services/account.service';

import { useParams } from 'react-router-dom';

export const MainContext = createContext();

export const MainProvider = ({ children }) => {
    const { account } = useParams();
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

    useEffect(() => {
        let unmounted = false;

        (async () => {
            const { data } = await AccountService.find({ account });

            if (!data.account) {
                if (unmounted) return;

                setIsMainRequestPeding(false);
                setAccountExists(false);
                return;
            }

            if (unmounted) return;

            setAccountInfo(data.account);
            setIsMainRequestPeding(false);
        })();

        return () => (unmounted = true);
    }, [account]);

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
