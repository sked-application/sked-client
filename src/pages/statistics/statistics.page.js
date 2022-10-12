import React, { useState, useEffect, Fragment, useCallback } from 'react';
import PageHeader from '../../common/components/page-header';
import { handleError } from '../../common/utils/api';
import { getDatesByPeriod } from '../../common/utils/date';
import UserService from '../../services/user.service';
import StatisticsService from '../../services/statistics.service';
import Loading from '../../common/components/loading';

const mountStatisticsData = (data = []) => {
  const filteredData = {};
  const calculateAmount = (acc, schedule) => schedule.price + acc;

  filteredData.finished = data.filter((schedule) => schedule.finishedAt);
  filteredData.canceled = data.filter((schedule) => schedule.canceledAt);
  filteredData.open = data.filter(
    (schedule) => !schedule.finishedAt && !schedule.canceledAt,
  );

  return {
    total: {
      quantity: data.length,
    },
    finished: {
      amount: filteredData.finished.reduce(calculateAmount, 0),
      quantity: filteredData.finished.length,
    },
    canceled: {
      amount: filteredData.canceled.reduce(calculateAmount, 0),
      quantity: filteredData.canceled.length,
    },
    open: {
      amount: filteredData.open.reduce(calculateAmount, 0),
      quantity: filteredData.open.length,
    },
  };
};

const Statistics = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [period, setPeriod] = useState('MONTH');
  const [dates, setDates] = useState(getDatesByPeriod('MONTH'));
  const [professionalId, setProfessionalId] = useState('');
  const [users, setUsers] = useState([]);
  const [statistics, setStatistics] = useState(mountStatisticsData([]));

  const handleFilter = (field, value) => {
    switch (field) {
      case 'PERIOD':
        setPeriod(value);
        setDates(getDatesByPeriod(value));
        break;
      case 'START_DATE':
        setPeriod('');
        setDates({ ...dates, start: value });
        break;
      case 'END_DATE':
        setPeriod('');
        setDates({ ...dates, end: value });
        break;
      case 'PROFESSIONAL':
        setProfessionalId(value);
        break;
      default:
        break;
    }
  };

  const listStatistics = useCallback(async () => {
    try {
      if (!dates.start || !dates.end) {
        alert('Escolha um período ou selecione datas válidas.');
        return;
      }

      setIsLoading(true);

      const { data } = await StatisticsService.findAll({
        userId: professionalId,
        startDate: dates.start,
        endDate: dates.end,
      });

      setStatistics(mountStatisticsData(data));
      setIsLoading(false);
    } catch (error) {
      alert(handleError(error));
      setIsLoading(false);
    }
  }, [professionalId, dates.start, dates.end]);

  const listUsers = async () => {
    try {
      const { data } = await UserService.findAll();

      setUsers(data);
    } catch (error) {
      alert(handleError(error));
    }
  };

  useEffect(() => {
    listStatistics();
  }, [listStatistics]);

  useEffect(() => {
    listUsers();
  }, []);

  return (
    <div className="container mx-auto px-4 max-w-screen-lg flex-1">
      <PageHeader
        title="Relatórios"
        description="Confira as estatísticas de seus agendamentos e veja como vai suas finanças."
      />
      {isLoading ? (
        <Loading />
      ) : (
        <Fragment>
          <div>
            <select
              value={period}
              onChange={(event) => handleFilter('PERIOD', event.target.value)}
              className="select mb-1"
            >
              <option value="">Selecione</option>
              <option value="TODAY">Hoje</option>
              <option value="WEEK">Esta semana</option>
              <option value="MONTH">Este mês</option>
              <option value="YEAR">Este ano</option>
            </select>
          </div>
          <div className="flex mb-1">
            <div className="flex-1 mr-1">
              <input
                type="date"
                value={dates.start}
                onChange={(event) =>
                  handleFilter('START_DATE', event.target.value)
                }
                className="input"
              />
            </div>
            <div className="flex-1">
              <input
                type="date"
                value={dates.end}
                onChange={(event) =>
                  handleFilter('END_DATE', event.target.value)
                }
                className="input"
              />
            </div>
          </div>
          {users.length > 1 && (
            <div>
              <select
                value={professionalId}
                onChange={(event) =>
                  handleFilter('PROFESSIONAL', event.target.value)
                }
                className="select"
              >
                <option value="">Todos profissionais</option>
                {users.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
          )}
          <div className="grid grid-cols-2 gap-2 mt-4">
            <div className="border divide-solid border-stone-200 rounded-xl p-4">
              <div className="mb-4">
                <h2 className="text-md font-semibold">Em aberto</h2>
              </div>
              <ul className="font-semibold">
                <li className="mb-1">
                  <span className="mr-2">Total:</span>
                  <span>{statistics.open.quantity}</span>
                </li>
                <li>
                  <span className="mr-2">Valor:</span>
                  <span className="text-indigo-500">
                    R$ {statistics.open.amount}
                  </span>
                </li>
              </ul>
            </div>
            <div className="border divide-solid border-stone-200 rounded-xl p-4">
              <div className="mb-4">
                <h2 className="text-md font-semibold">Realizados</h2>
              </div>
              <ul className="font-semibold">
                <li className="mb-1">
                  <span className="mr-2">Total:</span>
                  <span>{statistics.finished.quantity}</span>
                </li>
                <li>
                  <span className="mr-2">Valor:</span>
                  <span className="text-green-500">
                    R$ {statistics.finished.amount}
                  </span>
                </li>
              </ul>
            </div>
            <div className="border divide-solid border-stone-200 rounded-xl p-4">
              <div className="mb-4">
                <h2 className="text-md font-semibold">Cancelados</h2>
              </div>
              <ul className="font-semibold">
                <li className="mb-1">
                  <span className="mr-2">Total:</span>
                  <span>{statistics.canceled.quantity}</span>
                </li>
                <li>
                  <span className="mr-2">Valor:</span>
                  <span className="text-red-500">
                    R$ {statistics.canceled.amount}
                  </span>
                </li>
              </ul>
            </div>
            <div className="border divide-solid border-stone-200 rounded-xl p-4">
              <div className="mb-4">
                <h2 className="text-md font-semibold">Todos</h2>
              </div>
              <ul className="font-semibold">
                <li>
                  <span className="mr-2">Total:</span>
                  <span>{statistics.total.quantity}</span>
                </li>
              </ul>
            </div>
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default Statistics;
