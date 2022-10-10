import React, { Fragment, useContext, useEffect, useState } from 'react';
import {
  AiOutlineRight,
  AiOutlinePlus,
  AiOutlineForm,
  AiOutlineDelete,
} from 'react-icons/ai';
import { useForm } from 'react-hook-form';
import { Wizard, useWizard } from 'react-use-wizard';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import PageHeader from '../../../../common/components/page-header';
import { handleError } from '../../../../common/utils/api';
import UserService from '../../../../services/user.service';
import CompanyService from '../../../../services/company.service';
import Button from '../../../../common/components/button';
import { replaceSpecialCharacters } from '../../../../common/utils/validator';
import WizardHeader from '../../../../common/components/wizard-header';
import TimegridForm from '../../../../common/components/timegrid-form';
import ServiceFormModal from '../../../../common/components/modal-service-form/modal-service-form.component';
import { AuthContext } from '../../../../common/contexts/auth';
import authService from '../../../../services/auth.service';
import { getTimeGridByDayStructure } from '../../../../common/utils/timegrid';
import AnimatedWrapper from '../../../../common/components/animated-wrapper';
import Input from '../../../../common/components/input';
import { Modal } from '../../../../common/components/modal';
import Loading from '../../../../common/components/loading';
import { getFormattedPrice } from '../../../../common/utils/price';

const AccountSetup = ({ token }) => {
  const [companyData, setCompanyData] = useState({});

  return (
    <div className="py-4">
      <Wizard header={<WizardHeader allowBackOnLastStep />}>
        <AnimatedWrapper>
          <AccountSetupValidation
            token={token}
            companyData={companyData}
            setCompanyData={setCompanyData}
          />
        </AnimatedWrapper>
        <AnimatedWrapper>
          <AccountSetupUrl
            companyData={companyData}
            setCompanyData={setCompanyData}
          />
        </AnimatedWrapper>
        <AnimatedWrapper>
          <AccountSetupTimegrid
            companyData={companyData}
            setCompanyData={setCompanyData}
          />
        </AnimatedWrapper>
        <AnimatedWrapper>
          <AccountSetupService
            companyData={companyData}
            setCompanyData={setCompanyData}
          />
        </AnimatedWrapper>
      </Wizard>
    </div>
  );
};

AccountSetup.propTypes = {
  token: PropTypes.string,
};

const AccountSetupValidation = ({ token, setCompanyData, companyData }) => {
  const { nextStep } = useWizard();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState({});

  const {
    formState: { errors, isDirty },
    register,
    handleSubmit,
    setValue,
  } = useForm({
    defaultValues: { password: '' },
    mode: 'onSubmit',
  });

  const formSubmit = async (values) => {
    try {
      setIsLoading(true);

      await UserService.findByConfirmationToken({
        password: values.password,
        token,
      });

      setCompanyData({
        ...companyData,
        token,
        password: values.password,
        email: user.email,
      });

      if (error) setError(null);
      setIsLoading(false);
      nextStep();
    } catch (error) {
      setError(handleError(error));
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const findByConfirmationToken = async () => {
      const { data } = await UserService.findByConfirmationToken({ token });

      setUser(data);
    };

    findByConfirmationToken();
  }, [token]);

  useEffect(() => {
    if (companyData.password) {
      setValue('password', companyData.password, { shouldDirty: true });
    }
  }, [companyData.password, setValue]);

  return (
    <div className="container mx-auto px-4 max-w-md">
      {user && (
        <PageHeader
          title={`Olá ${user.name}`}
          description="Nos próximos passos realizaremos a configuração de sua agenda."
          titleSize="medium"
        />
      )}
      <div className="my-4 border divide-solid border-stone-200 rounded-xl p-4">
        <form onSubmit={handleSubmit(formSubmit)}>
          {error && <div className="mb-2 text-sm text-red-500">{error}</div>}
          <div className="mb-2">
            <span className="text-sm font-semibold">{user && user.email}</span>
          </div>
          <div className="mb-4">
            <label className="text-sm" htmlFor="password">
              Digite sua senha
            </label>
            <Input
              id="password"
              type="password"
              disabled={isLoading}
              className="input"
              fieldName="password"
              errors={errors}
              {...register('password', {
                required: 'Este campo é obrigatório.',
              })}
            />
          </div>
          <div>
            <Button
              type="submit"
              disabled={!isDirty || isLoading}
              isLoading={isLoading}
              className="button button--block button--primary"
            >
              <div className="flex items-center justify-center">
                <span>Continuar</span>
                <AiOutlineRight size={18} className="ml-2" />
              </div>
            </Button>
          </div>
        </form>
      </div>
      <div className="text-center mb-6">
        <span className="text-sm mr-1">Esqueceu a senha?</span>
        <Link to="/recover-password" className="font-semibold">
          Recupere aqui
        </Link>
      </div>
    </div>
  );
};

AccountSetupValidation.propTypes = {
  token: PropTypes.string,
  companyData: PropTypes.object,
  setCompanyData: PropTypes.func,
};

const AccountSetupUrl = ({ companyData, setCompanyData }) => {
  const { nextStep } = useWizard();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const {
    formState: { errors, isDirty },
    register,
    handleSubmit,
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      url: '',
      name: '',
    },
    mode: 'onSubmit',
  });

  const watchUrl = watch('url');

  const formSubmit = async (values) => {
    try {
      setIsLoading(true);

      await CompanyService.valid({
        url: values.url,
      });

      setCompanyData({
        ...companyData,
        url: values.url,
        name: values.name,
      });

      if (error) setError(null);
      setIsLoading(false);
      nextStep();
    } catch (error) {
      setError(handleError(error));
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (companyData.name)
      setValue('name', companyData.name, { shouldDirty: true });

    if (companyData.url)
      setValue('url', companyData.url, { shouldDirty: true });
  }, [companyData.name, companyData.url, setValue]);

  return (
    <div className="container mx-auto px-4 max-w-md">
      <PageHeader
        title="Bem vindo ao SKED"
        description="Crie o endereço de sua agenda online"
        titleSize="medium"
      />
      <div className="my-4 border divide-solid border-stone-200 rounded-xl p-4">
        <form onSubmit={handleSubmit(formSubmit)}>
          {error && <div className="mb-2 text-sm text-red-500">{error}</div>}
          <div className="mb-4">
            <span className="text-sm">
              Preencha o nome e escolha uma URL que seja curta e fácil de
              memorizar que represente você ou seu negócio de forma concisa para
              facilitar o compartilhamento.
            </span>
          </div>
          <div className="mb-4">
            <label className="text-sm" htmlFor="name">
              Nome do seu negócio
            </label>
            <Input
              id="name"
              disabled={isLoading}
              className="input"
              fieldName="name"
              errors={errors}
              {...register('name', {
                required: 'Este campo é obrigatório.',
              })}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="url" className="text-sm">
              Digite sua url de compartilhamento
            </label>
            <Input
              id="url"
              placeholder="conta"
              disabled={isLoading}
              className="input"
              fieldName="url"
              errors={errors}
              {...register('url', {
                required: 'Este campo é obrigatório.',
                onBlur: (event) =>
                  setValue('url', replaceSpecialCharacters(event.target.value)),
              })}
            />
            <div className=" mt-2">
              <span className="text-sm">agenda.skedapp.com.br/{watchUrl}</span>
            </div>
          </div>
          <div>
            <Button
              type="submit"
              disabled={!isDirty || isLoading}
              isLoading={isLoading}
              className="button button--block button--primary"
            >
              <div className="flex items-center justify-center">
                <span>Continuar</span>
                <AiOutlineRight size={18} className="ml-2" />
              </div>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

AccountSetupUrl.propTypes = {
  companyData: PropTypes.object,
  setCompanyData: PropTypes.func,
};

const AccountSetupTimegrid = ({ companyData, setCompanyData }) => {
  const { nextStep } = useWizard();

  const handleOnSubmit = async ({ data }) => {
    setCompanyData({
      ...companyData,
      timeGrids: data,
    });

    nextStep();
  };

  const handleOnChange = async ({ data }) => {
    setCompanyData({
      ...companyData,
      timeGrids: data,
    });
  };

  const isWeekendDay = (day) => {
    return [0, 6].includes(day);
  };

  const getInitialTimegrid = () => {
    const initialTimegridData = getTimeGridByDayStructure();

    Object.keys(initialTimegridData).forEach((day) => {
      const intDay = parseInt(day);

      if (isWeekendDay(intDay)) return;

      initialTimegridData[day].push({
        start: '09:00',
        end: '12:00',
        day: intDay,
      });
    });

    return initialTimegridData;
  };

  const getCurrentTimegrid = (currentTimegrids) => {
    const timegridData = getTimeGridByDayStructure();

    currentTimegrids.forEach(({ day, start, end }) => {
      if (timegridData[day]) {
        timegridData[day].push({
          start,
          end,
          day,
        });
      }
    });

    return timegridData;
  };

  const loadTimegrid = (currentTimegrids) => {
    if (!currentTimegrids) {
      return getInitialTimegrid();
    }

    return getCurrentTimegrid(currentTimegrids);
  };

  return (
    <div className="container mx-auto px-4 max-w-md">
      <PageHeader
        title="Grade de horários"
        description="Informe para nós quando você costuma estar disponível para realizar atendimentos. Não se preocupe você ainda poderá personalizar seus horários depois."
        titleSize="medium"
      />
      <div className="felx flex-column">
        <TimegridForm
          timegrid={loadTimegrid(companyData.timeGrids)}
          handleOnSubmit={handleOnSubmit}
          submitButtonText="Continuar"
          handleOnCancel={() => nextStep()}
          handleOnChange={handleOnChange}
          cancelButtonText="Ignorar"
          buttonIsEnabled
          isFromSetupForm
        />
      </div>
    </div>
  );
};

AccountSetupTimegrid.propTypes = {
  companyData: PropTypes.object,
  setCompanyData: PropTypes.func,
};

const services = [
  {
    duration: 30,
    name: 'Meu primeiro serviço',
    price: 0,
    showPrice: true,
    id: 1,
  },
];

const AccountSetupService = ({ companyData, setCompanyData }) => {
  const [toggleShow, setToggleShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState(null);
  const [serviceList, setServiceList] = useState(services);
  const { AUTH_DISPATCH, AUTH_ACTIONS } = useContext(AuthContext);

  const handleOnSubmit = async () => {
    const signUpData = {
      ...companyData,
      services: serviceList,
    };

    setCompanyData(signUpData);

    try {
      setIsLoading(true);

      await authService.setup(signUpData);
      const { data } = await authService.signIn({
        email: signUpData.email,
        password: signUpData.password,
      });

      AUTH_DISPATCH({
        type: AUTH_ACTIONS.SET_SIGN_IN,
        value: data.token,
      });
    } catch (error) {
      setError(handleError(error));
      setIsLoading(false);
    }
  };

  const getServiceIndex = (id) => {
    return serviceList.findIndex((service) => service.id === id);
  };

  const removeService = async (id) => {
    try {
      const alertQuestion = 'Deseja remover esse serviço?';

      if (window.confirm(alertQuestion)) {
        const itemIndex = getServiceIndex(id);
        const tempServices = [...serviceList];

        tempServices.splice(itemIndex, 1);
        setServiceList(tempServices);
      }
    } catch (error) {
      alert(handleError(error));
    }
  };

  const handleOpenModal = (data) => {
    setFormData(data);
    setToggleShow(true);
  };

  const handleCloseModal = () => setToggleShow(false);

  const handleSubmitModal = async (values) => {
    setToggleShow(false);

    const { id, name, duration, price, showPrice } = values;

    if (id) {
      const itemIndex = getServiceIndex(id);

      if (itemIndex !== -1) {
        const tempServices = [...serviceList];

        tempServices[itemIndex] = {
          id,
          name,
          duration,
          price,
          showPrice,
        };

        setServiceList(tempServices);
      }
    } else {
      setServiceList([
        ...serviceList,
        {
          id: serviceList.length + 1,
          name,
          price,
          duration,
          showPrice,
        },
      ]);
    }
  };

  return (
    <div className="container mx-auto px-4 max-w-md">
      <PageHeader
        title="Serviços"
        description="Adicione um tipo de serviço para que as pessoas possam agendar com você."
        titleSize="medium"
      />

      {isLoading ? (
        <Loading />
      ) : (
        <>
          {error && <div className="mb-2 text-sm text-red-500">{error}</div>}
          <div className="flex mb-4">
            <Button
              type="button"
              onClick={() => handleOpenModal()}
              className="button button--block button--primary"
            >
              <div className="flex items-center justify-center">
                <AiOutlinePlus className="mr-2" size={18} />
                <span>Adicionar novo serviço</span>
              </div>
            </Button>
          </div>
          {serviceList.map((item) => (
            <div
              key={item.id}
              className="my-4 border divide-solid border-stone-200 rounded-xl p-4"
            >
              <div className="flex justify-between">
                <div>
                  <span className="text-sm font-semibold">{item.name}</span>
                </div>
                <div>
                  <AiOutlineForm
                    onClick={() => handleOpenModal(item)}
                    size={18}
                    className="cursor-pointer"
                  />
                </div>
              </div>
              <div className="flex items-end justify-between mt-4">
                <ul>
                  <li className="text-sm mb-1">
                    <span className="font-semibold mr-2">Duração:</span>
                    <span>{item.duration} minutos</span>
                  </li>
                  <li className="text-sm">
                    <span className="font-semibold mr-2">Preço:</span>
                    <span>{getFormattedPrice(item.price, 'R$')}</span>
                  </li>
                </ul>
                <div className="flex">
                  <AiOutlineDelete
                    onClick={() => removeService(item.id)}
                    size={18}
                    className="cursor-pointer"
                  />
                </div>
              </div>
            </div>
          ))}
          <Modal
            isOpen={toggleShow}
            handleClose={handleCloseModal}
            title={formData ? 'Adicionar serviço' : 'Editar serviço'}
          >
            <ServiceFormModal data={formData} onSubmit={handleSubmitModal} />
          </Modal>
          <div className="fixed bottom-0 left-0 bg-white w-full">
            <div className="flex p-4 mx-auto max-w-md">
              <Button
                type="button"
                onClick={() => handleOnSubmit()}
                className="button button--block button--primary"
              >
                <span>Finalizar</span>
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

AccountSetupService.propTypes = {
  companyData: PropTypes.object,
  setCompanyData: PropTypes.func,
};

export default AccountSetup;
