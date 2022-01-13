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
  const [mainState, mainDispatch, mainActions] = useContext(MainContext);
  const AUTH = useContext(AuthContext);

  const getScheduleInfoPreview = ({ date, start, end }) => {
    if (!date) return 'Selecione um horário';

    return `${start.slice(0, 5)} às ${end.slice(0, 5)}`;
  };

  const submitSchedule = async () => {
    try {
      const { date, start, end } = mainState.scheduleSlot;

      if (!mainState.service.id) {
        alert('Escolha um serviço');
        return;
      }

      if (!mainState.user.id) {
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
        companyId: mainState.accountInfo.id,
        serviceId: mainState.service.id,
        userId: mainState.user.id,
      });

      mainDispatch({
        type: mainActions.SET_START_DATE,
        value: moment().format('YYYY-MM-DD'),
      });

      mainDispatch({
        type: mainActions.SET_SERVICE,
        value: {},
      });

      alert('Agendamento realizado com sucesso!');
    } catch (error) {
      mainDispatch({
        type: mainActions.SET_START_DATE,
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
          {getScheduleInfoPreview(mainState.scheduleSlot)}
        </span>
      </div>

      {isLoading && <span className="loading m-b-16" />}

      {!AUTH.isAuthenticated && !isLoading && formType === 'SIGN_UP' && (
        <CustomerSignUpForm
          setIsLoading={setIsLoading}
          setFormType={setFormType}
        />
      )}

      {!AUTH.isAuthenticated && !isLoading && formType === 'SIGN_IN' && (
        <CustomerSignInForm
          setIsLoading={setIsLoading}
          setFormType={setFormType}
        />
      )}

      {!AUTH.isAuthenticated && !formType && (
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

      {AUTH.isCustomer && AUTH.isAuthenticated && (
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

      {AUTH.isProfessional && AUTH.isAuthenticated && (
        <div className="flexbox m-t-5">
          <div className="flexbox__item">
            <button
              className="button button--block button--outline"
              onClick={() => AUTH.handleSignOut(true)}
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
