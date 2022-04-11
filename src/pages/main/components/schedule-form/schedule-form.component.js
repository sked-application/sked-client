import React, { useContext, useState } from 'react';
import { AiOutlineCarryOut } from 'react-icons/ai';
import moment from 'moment';
import ScheduleService from '../../../../services/schedule.service';
import CustomerSignInForm from '../customer-sign-in-form';
import CustomerSignUpForm from '../customer-sign-up-form';
import { MainContext } from '../../contexts/main';
import { AuthContext } from '../../../../common/contexts/auth';
import { handleError } from '../../../../common/utils/api';
import { useHistory } from 'react-router-dom';
import SignInGoogleButton from '../../../../common/components/signin-google-button';

const ScheduleForm = () => {
  const history = useHistory();
  const [formType, setFormType] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const { MAIN_STATE, MAIN_DISPATCH, MAIN_ACTIONS } = useContext(MainContext);
  const { AUTH_STATE, AUTH_DISPATCH, AUTH_ACTIONS } = useContext(AuthContext);

  const getScheduleInfoPreview = ({ date, start, end }) => {
    if (!date) return 'Selecione um horário';

    return `${start.slice(0, 5)} às ${end.slice(0, 5)}`;
  };

  const submitSchedule = async () => {
    try {
      const { date, start, end } = MAIN_STATE.scheduleSlot;

      if (!MAIN_STATE.service.id) {
        alert('Escolha um serviço');
        return;
      }

      if (!MAIN_STATE.user.id) {
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
        companyId: MAIN_STATE.accountInfo.id,
        serviceId: MAIN_STATE.service.id,
        userId: MAIN_STATE.user.id,
      });

      alert('Agendamento realizado com sucesso!');

      history.push('/customer-schedules', {
        date,
      });
    } catch (error) {
      MAIN_DISPATCH({
        type: MAIN_ACTIONS.SET_START_DATE,
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
          {getScheduleInfoPreview(MAIN_STATE.scheduleSlot)}
        </span>
      </div>

      {isLoading && <span className="loading m-b-16" />}

      {!AUTH_STATE.isAuthenticated && !isLoading && formType === 'SIGN_UP' && (
        <CustomerSignUpForm
          setIsLoading={setIsLoading}
          setFormType={setFormType}
        />
      )}

      {!AUTH_STATE.isAuthenticated && !isLoading && formType === 'SIGN_IN' && (
        <CustomerSignInForm
          setIsLoading={setIsLoading}
          setFormType={setFormType}
        />
      )}

      {!AUTH_STATE.isAuthenticated && !formType && (
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

          <div className="text--center m-t-16">
            <SignInGoogleButton />
          </div>
        </div>
      )}

      {AUTH_STATE.isCustomer && AUTH_STATE.isAuthenticated && (
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

      {AUTH_STATE.isProfessional && AUTH_STATE.isAuthenticated && (
        <div className="flexbox m-t-5">
          <div className="flexbox__item">
            <button
              className="button button--block button--outline"
              onClick={() =>
                AUTH_DISPATCH({
                  type: AUTH_ACTIONS.SET_SIGN_OUT_WITHOUT_REDIRECT,
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
