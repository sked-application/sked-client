import React, { useContext, useState, Fragment } from 'react';
import { AiOutlineCarryOut } from 'react-icons/ai';
import { Wizard } from 'react-use-wizard';
import moment from 'moment';
import ScheduleService from '../../../../services/schedule.service';
import CustomerVerificationForm from '../../../../common/components/customer-verification-form';
import CustomerTelephoneForm from '../../../../common/components/customer-telephone-form';
import { MainContext } from '../../contexts/main';
import { AuthContext } from '../../../../common/contexts/auth';
import { handleError } from '../../../../common/utils/api';
import { useHistory } from 'react-router-dom';
import Button from '../../../../common/components/button';
import { getFormattedDatePreview } from '../../../../common/utils/date';
import { getFormattedPrice } from '../../../../common/utils/price';
import AnimatedWrapper from '../../../../common/components/animated-wrapper';

const ScheduleForm = () => {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [customerSignInData, setCustomerSignInData] = useState({});
  const { MAIN_STATE, MAIN_DISPATCH, MAIN_ACTIONS } = useContext(MainContext);
  const { AUTH_STATE, AUTH_DISPATCH, AUTH_ACTIONS } = useContext(AuthContext);

  const getScheduleInfoPreview = ({ date, start }) => {
    if (!date) return '';

    return start.slice(0, 5);
  };

  const isValidForm = () => {
    if (!MAIN_STATE.user.id) {
      alert('Escolha um profissional');
      return false;
    }

    if (!MAIN_STATE.service.id) {
      alert('Escolha um serviço');
      return false;
    }

    if (!MAIN_STATE.scheduleSlot.date) {
      alert('Escolha o horário');
      return false;
    }

    return true;
  };

  const submitSchedule = async () => {
    try {
      if (!isValidForm()) {
        return;
      }

      setIsLoading(true);

      await ScheduleService.create({
        date: MAIN_STATE.scheduleSlot.date,
        start: MAIN_STATE.scheduleSlot.start,
        end: MAIN_STATE.scheduleSlot.end,
        companyId: MAIN_STATE.accountInfo.id,
        serviceId: MAIN_STATE.service.id,
        userId: MAIN_STATE.user.id,
      });

      alert('Agendamento realizado com sucesso!');
      setIsLoading(false);

      history.push('/customer-schedules', {
        date: MAIN_STATE.scheduleSlot.date,
      });
    } catch (error) {
      MAIN_DISPATCH({
        type: MAIN_ACTIONS.SET_START_DATE,
        value: moment().format('YYYY-MM-DD'),
      });

      setIsLoading(false);
      alert(handleError(error));
    }
  };

  return (
    <div className="my-4 border divide-solid border-stone-200 rounded-xl p-4">
      <div className="flex mb-4">
        <AiOutlineCarryOut size={18} className="mr-2" />
        <h2 className="text-md font-semibold">
          {AUTH_STATE.isAuthenticated && AUTH_STATE.isCustomer
            ? 'Resumo'
            : 'Agendar'}
        </h2>
      </div>

      {AUTH_STATE.isAuthenticated && AUTH_STATE.isProfessional ? (
        <AnimatedWrapper>
          <Button
            type="button"
            className="button button--block button--secondary"
            onClick={() =>
              AUTH_DISPATCH({
                type: AUTH_ACTIONS.SET_SIGN_OUT_WITHOUT_REDIRECT,
              })
            }
          >
            <span>Entrar como cliente</span>
          </Button>
        </AnimatedWrapper>
      ) : AUTH_STATE.isAuthenticated && AUTH_STATE.isCustomer ? (
        <AnimatedWrapper>
          <Fragment>
            {MAIN_STATE.service.id &&
              MAIN_STATE.user.id &&
              MAIN_STATE.scheduleSlot.date && (
                <div>
                  <ul className="mb-4">
                    <li className="text-sm mb-1">
                      <span className="font-semibold mr-2">Profissional:</span>
                      <span>{MAIN_STATE.user.name}</span>
                    </li>
                    <li className="text-sm mb-1">
                      <span className="font-semibold mr-2">Serviço:</span>
                      <span>{MAIN_STATE.service.name}</span>
                    </li>
                    <li className="text-sm mb-1">
                      <span className="font-semibold mr-2">Data/Hora:</span>
                      <span>
                        {`${getFormattedDatePreview(
                          MAIN_STATE.scheduleSlot.date,
                        )} às ${getScheduleInfoPreview(
                          MAIN_STATE.scheduleSlot,
                        )}`}
                      </span>
                    </li>
                    {MAIN_STATE.service.showPrice && (
                      <li className="text-sm">
                        <span className="font-semibold mr-2">Preço:</span>
                        <span className="font-semibold text-green-600">
                          {getFormattedPrice(MAIN_STATE.service.price, 'R$')}
                        </span>
                      </li>
                    )}
                  </ul>
                </div>
              )}
            <Button
              type="submit"
              disabled={isLoading}
              isLoading={isLoading}
              className="button button--block button--primary"
              onClick={submitSchedule}
            >
              <span>Realizar agendamento</span>
            </Button>
          </Fragment>
        </AnimatedWrapper>
      ) : (
        <Wizard>
          <AnimatedWrapper>
            <CustomerTelephoneForm
              isValidToSubmit={isValidForm}
              onSubmit={(data) => setCustomerSignInData(data)}
            />
          </AnimatedWrapper>
          <AnimatedWrapper>
            <CustomerVerificationForm
              customerSignInData={customerSignInData}
              isValidToSubmit={isValidForm}
              onSubmit={(data) =>
                AUTH_DISPATCH({
                  type: AUTH_ACTIONS.SET_SIGN_IN,
                  value: data,
                })
              }
            />
          </AnimatedWrapper>
        </Wizard>
      )}
    </div>
  );
};

export default ScheduleForm;
