import React, { useContext, useState } from 'react';
import { AiOutlineCarryOut } from 'react-icons/ai';
import moment from 'moment';
import ScheduleService from '../../../../services/schedule.service';
import CustomerSignInForm from '../customer-sign-in-form';
import CustomerSignUpForm from '../customer-sign-up-form';
import { MainContext } from '../../contexts/main';
import { AuthContext } from '../../../../common/contexts/auth';
import { handleError } from '../../../../common/utils/api';

const ScheduleForm = () => {
  const [formType, setFormType] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [MainState, MainDispatch, MainActions] = useContext(MainContext);
  const [AuthState, AuthDispatch, AuthActions] = useContext(AuthContext);

  const getScheduleInfoPreview = ({ date, start, end }) => {
    if (!date) return 'Selecione um horário';

    return `${start.slice(0, 5)} às ${end.slice(0, 5)}`;
  };

  const submitSchedule = async () => {
    try {
      const { date, start, end } = MainState.scheduleSlot;

      if (!MainState.service.id) {
        alert('Escolha um serviço');
        return;
      }

      if (!MainState.user.id) {
        alert('Escolha um profissional');
        return;
      }

      if (!date) {
        alert('Escolha o horário');
        return;
      }

      await ScheduleService.create({
        date,
        start,
        end,
        companyId: MainState.accountInfo.id,
        serviceId: MainState.service.id,
        userId: MainState.user.id,
      });

      MainDispatch({
        type: MainActions.SET_START_DATE,
        value: moment().format('YYYY-MM-DD'),
      });

      MainDispatch({
        type: MainActions.SET_SERVICE,
        value: {},
      });

      alert('Agendamento realizado com sucesso!');
    } catch (error) {
      MainDispatch({
        type: MainActions.SET_START_DATE,
        value: moment().format('YYYY-MM-DD'),
      });

      alert(handleError(error));
    }
  };

  return (
    <div className="card card--schedule card--outline">
      <div className="card__header">
        <h2 className="card__title">
          <AiOutlineCarryOut /> Agende
        </h2>
        <span className="card__subtitle">
          {getScheduleInfoPreview(MainState.scheduleSlot)}
        </span>
      </div>

      {isLoading && <span className="loading m-b-16" />}

      {!AuthState.isAuthenticated && !isLoading && formType === 'SIGN_UP' && (
        <CustomerSignUpForm
          setIsLoading={setIsLoading}
          setFormType={setFormType}
        />
      )}

      {!AuthState.isAuthenticated && !isLoading && formType === 'SIGN_IN' && (
        <CustomerSignInForm
          setIsLoading={setIsLoading}
          setFormType={setFormType}
        />
      )}

      {!AuthState.isAuthenticated && !formType && (
        <div className="m-t-5">
          <button
            className="button button--block button--outline m-b-16"
            onClick={() => setFormType('SIGN_IN')}
          >
            Já sou cliente
          </button>
          <button
            className="button button--block button--outline"
            onClick={() => setFormType('SIGN_UP')}
          >
            Não tenho cadastro
          </button>
        </div>
      )}

      {AuthState.isCustomer && AuthState.isAuthenticated && (
        <div className="flexbox m-t-5">
          <div className="flexbox__item">
            <button
              className="button button--block button--purple"
              onClick={submitSchedule}
            >
              Agendar
            </button>
          </div>
        </div>
      )}

      {AuthState.isProfessional && AuthState.isAuthenticated && (
        <div className="flexbox m-t-5">
          <div className="flexbox__item">
            <button
              className="button button--block button--outline"
              onClick={() =>
                AuthDispatch({
                  type: AuthActions.SET_SIGN_OUT_WITHOUT_REDIRECT,
                })
              }
            >
              Entrar como cliente
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScheduleForm;
