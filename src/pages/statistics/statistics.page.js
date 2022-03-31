import React, { useState, useEffect, Fragment, useCallback } from 'react';
import PageHeader from '../../common/components/page-header';
import { handleError } from '../../common/utils/api';
import { getDatesByPeriod } from '../../common/utils/date';
import UserService from '../../services/user.service';
import StatisticsService from '../../services/statistics.service';

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
    <div className="container">
      <PageHeader
        title="Relatórios"
        description="Confira como vai suas finanças."
      />
      {isLoading ? (
        <div className="loading"></div>
      ) : (
        <Fragment>
          <div>
            <select
              value={period}
              onChange={(event) => handleFilter('PERIOD', event.target.value)}
              className="select select--dark m-b-16"
            >
              <option value="">Selecione</option>
              <option value="TODAY">Hoje</option>
              <option value="WEEK">Esta semana</option>
              <option value="MONTH">Este mês</option>
              <option value="YEAR">Este ano</option>
            </select>
          </div>
          <div className="flexbox m-b-16">
            <div className="flexbox__item m-r-16">
              <input
                type="date"
                value={dates.start}
                onChange={(event) =>
                  handleFilter('START_DATE', event.target.value)
                }
                className="input input--dark"
              />
            </div>
            <div className="flexbox__item">
              <input
                type="date"
                value={dates.end}
                onChange={(event) =>
                  handleFilter('END_DATE', event.target.value)
                }
                className="input input--dark"
              />
            </div>
          </div>
          {users.length > 1 && (
            <div className="m-b-16">
              <select
                value={professionalId}
                onChange={(event) =>
                  handleFilter('PROFESSIONAL', event.target.value)
                }
                className="select m-t-0 select--dark"
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
          <div>
            <h3 className="m-t-8 m-b-16 text--center">Agendamentos</h3>
          </div>
          <div className="flexbox">
            <div className="card card--outline ">
              <div className="card__header">
                <h2 className="card__title m-r-16">Em aberto</h2>
              </div>
              <div className="card__content">
                <div className="flexbox flexbox__justify--between">
                  <strong>Total:</strong>
                  <strong className="color--purple">
                    {statistics.open.quantity}
                  </strong>
                </div>
                <div className="flexbox flexbox__justify--between m-t-8">
                  <strong>Valor:</strong>
                  <strong className="color--purple">
                    R$ {statistics.open.amount}
                  </strong>
                </div>
              </div>
            </div>
            <div className="card card--outline m-l-16">
              <div className="card__header">
                <h2 className="card__title m-r-16">Realizados</h2>
              </div>
              <div className="card__content">
                <div className="flexbox flexbox__justify--between">
                  <strong>Total:</strong>
                  <strong className="color--green">
                    {statistics.finished.quantity}
                  </strong>
                </div>
                <div className="flexbox flexbox__justify--between m-t-8">
                  <strong>Valor:</strong>
                  <strong className="color--green">
                    R$ {statistics.finished.amount}
                  </strong>
                </div>
              </div>
            </div>
          </div>
          <div className="flexbox">
            <div className="card card--outline ">
              <div className="card__header">
                <h2 className="card__title m-r-16">Cancelados</h2>
              </div>
              <div className="card__content">
                <div className="flexbox flexbox__justify--between">
                  <strong>Total:</strong>
                  <strong className="color--orange">
                    {statistics.canceled.quantity}
                  </strong>
                </div>
                <div className="flexbox flexbox__justify--between m-t-8">
                  <strong>Valor:</strong>
                  <strong className="color--orange">
                    R$ {statistics.canceled.amount}
                  </strong>
                </div>
              </div>
            </div>
            <div className="card card--outline m-l-16">
              <div className="card__header">
                <h2 className="card__title m-r-16">Todos</h2>
              </div>
              <div className="card__content">
                <div className="flexbox flexbox__justify--between">
                  <strong>Total:</strong>
                  <strong>{statistics.total.quantity}</strong>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default Statistics;
