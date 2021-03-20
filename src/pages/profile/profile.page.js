import React, { useState, useEffect, useCallback, Fragment } from 'react';
import schema from './validators/profile-form.validator';
import UserService from '../../services/user.service';
import NumberFormat from 'react-number-format';
import PageHeader from '../../components/page-header-component/page-header.component';
import FormInputError from '../../components/input-form-error-component/input-form-error.component';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
import { ShowUp } from '../../components/modal-component/modal.component';
import { handleError } from '../../utils/api';

const Profile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState();
  const [toggleShow, setToggleShow] = useState(false);

  const {
    errors,
    control,
    formState,
    reset,
    setValue,
    register,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema.form.validator),
    defaultValues: schema.form.initialValues,
    mode: 'all',
  });

  const handleCloseShowUp = () => {
    reset();
    setToggleShow(false);
  };

  const handleOpenShowUp = (data) => {
    if (data) {
      setValue('userName', data.name);
      setValue('userCpf', data.cpf);
      setValue('companyName', data.company.name);
      setValue('companyCpfCnpj', data.company.cpfCnpj);
      setValue('companyTelephone', data.company.telephone);
      setValue('companyAddress', data.company.address);
    }

    setToggleShow(true);
  };

  const profileForm = async (values) => {
    try {
      const {
        userName,
        userCpf,
        companyName,
        companyCpfCnpj,
        companyTelephone,
        companyAddress,
      } = values;

      await UserService.updateProfile({
        user: {
          cpf: userCpf,
          name: userName,
        },
        company: {
          name: companyName,
          cpfCnpj: companyCpfCnpj,
          telephone: companyTelephone,
          address: companyAddress,
        },
      });

      getProfile();
      handleCloseShowUp();
      alert('Perfil atualizado com sucesso!');
    } catch (error) {
      alert(handleError(error));
    }
  };

  const getProfile = useCallback(async () => {
    try {
      setIsLoading(true);

      const { data } = await UserService.profile();

      setProfile(data);
      setIsLoading(false);
    } catch (error) {
      alert(handleError(error));
    }
  }, []);

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  return (
    <div className="container">
      <PageHeader
        title="Perfil"
        description="Gerencie os dados de sua conta."
      />
      {isLoading ? (
        <div className="loading"></div>
      ) : (
        <Fragment>
          {profile && (
            <div className="card card--outline">
              <div className="card__header">
                <h2 className="card__title">Meus dados</h2>
                <strong
                  onClick={() => handleOpenShowUp(profile)}
                  className="card__subtitle color--purple cursor--pointer"
                >
                  Gerenciar
                </strong>
              </div>
              <div className="flexbox flexbox--column m-b-30">
                <div className="m-t-10">
                  <strong>Nome: </strong>
                  <span>{profile.name}</span>
                </div>
                <div className="m-t-10">
                  <strong>E-mail: </strong>
                  <span>{profile.email}</span>
                </div>
                <div className="m-t-10">
                  <strong>Cpf: </strong>
                  <span>{profile.cpf || 'Não informado'}</span>
                </div>
                <div className="m-t-10">
                  <strong>Administrador: </strong>
                  <span>{profile.role === 'ADMIN' ? 'Sim' : 'Não'}</span>
                </div>
              </div>

              <div className="card__header">
                <h2 className="card__title">Dados da conta</h2>
              </div>
              <div className="flexbox flexbox--column m-b-30">
                <div className="m-t-10">
                  <strong>Conta: </strong>
                  <span>{profile.company.name}</span>
                </div>
                <div className="m-t-10">
                  <strong>Url: </strong>
                  <span>skedapp.com.br/{profile.company.url}</span>
                </div>
                <div className="m-t-10">
                  <strong>Cpf/Cnpj: </strong>
                  <span>{profile.company.cpfCnpj}</span>
                </div>
                <div className="m-t-10">
                  <strong>Número: </strong>
                  <span>{profile.company.telephone || 'Não informado'}</span>
                </div>
                <div className="m-t-10">
                  <strong>Endereço: </strong>
                  <span>{profile.company.address || 'Não informado'}</span>
                </div>
              </div>
            </div>
          )}
        </Fragment>
      )}

      <ShowUp
        title="Edição de perfil"
        isOpen={toggleShow}
        handleClose={handleCloseShowUp}
      >
        <form
          onSubmit={handleSubmit(profileForm)}
          className="flexbox flexbox--column"
        >
          <div className="flexbox__item">
            <div className="m-b-5">
              <label htmlFor="userName">Meu nome</label>
            </div>
            <input
              id="userName"
              name="userName"
              type="text"
              ref={register}
              className="input input--dark"
            />
            <FormInputError
              error={errors.userName && errors.userName.message}
            />
          </div>
          <div className="flexbox__item m-t-16">
            <div className="m-b-5">
              <label htmlFor="userCpf">Meu cpf</label>
            </div>
            <input
              id="userCpf"
              name="userCpf"
              type="text"
              ref={register}
              placeholder="Cpf sem pontos e barras"
              className="input input--dark"
            />
            <FormInputError error={errors.userCpf && errors.userCpf.message} />
          </div>

          {profile && profile.role === 'ADMIN' && (
            <Fragment>
              <div className="flexbox__item m-t-16">
                <div className="m-b-5">
                  <label htmlFor="companyName">Nome da conta</label>
                </div>
                <input
                  id="companyName"
                  name="companyName"
                  type="text"
                  ref={register}
                  className="input input--dark"
                />
                <FormInputError
                  error={errors.companyName && errors.companyName.message}
                />
              </div>
              <div className="flexbox__item m-t-16">
                <div className="m-b-5">
                  <label htmlFor="companyCpfCnpj">Cpf/Cnpj da conta</label>
                </div>
                <input
                  id="companyCpfCnpj"
                  name="companyCpfCnpj"
                  type="text"
                  ref={register}
                  placeholder="Cpf/Cnpj sem pontos e barras"
                  className="input input--dark"
                />
                <FormInputError
                  error={errors.companyCpfCnpj && errors.companyCpfCnpj.message}
                />
              </div>
              <div className="flexbox__item m-t-16">
                <div className="m-b-5">
                  <label htmlFor="companyTelephone">Telefone</label>
                </div>
                <Controller
                  id="companyTelephone"
                  name="companyTelephone"
                  control={control}
                  as={
                    <NumberFormat
                      format="(##) #####-####"
                      mask="_"
                      type="tel"
                      className="input input--dark"
                      placeholder="Telefone"
                    />
                  }
                />
                <FormInputError
                  error={
                    errors.companyTelephone && errors.companyTelephone.message
                  }
                />
              </div>
              <div className="flexbox__item m-t-16">
                <div className="m-b-5">
                  <label htmlFor="companyAddress">Endereço</label>
                </div>
                <input
                  id="companyAddress"
                  name="companyAddress"
                  type="text"
                  ref={register}
                  className="input input--dark"
                />
                <FormInputError
                  error={errors.companyAddress && errors.companyAddress.message}
                />
              </div>
            </Fragment>
          )}

          <div className="flexbox__item m-t-16">
            <button
              type="submit"
              disabled={!formState.isValid}
              className="button button--block button--purple"
            >
              Editar
            </button>
          </div>
        </form>
      </ShowUp>
    </div>
  );
};

export default Profile;
