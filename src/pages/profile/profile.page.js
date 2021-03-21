import React, { useState, useEffect, useCallback, Fragment } from 'react';
import schema from './validators/profile-form.validator';
import UserService from '../../services/user.service';
import NumberFormat from 'react-number-format';
import PageHeader from '../../common/components/page-header';
import InputFormError from '../../common/components/input-form-error';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
import { Modal } from '../../common/components/modal';
import { handleError } from '../../common/utils/api';

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
    mode: 'onChange',
  });

  const { touched, isValid, isDirty } = formState;

  const handleCloseModal = () => {
    reset();
    setToggleShow(false);
  };

  const handleOpenModal = (data) => {
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
      handleCloseModal();
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
                  onClick={() => handleOpenModal(profile)}
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

      <Modal
        title="Edição de perfil"
        isOpen={toggleShow}
        handleClose={handleCloseModal}
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
            <InputFormError
              touched={touched.userName}
              error={errors.userName}
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
            <InputFormError touched={touched.userCpf} error={errors.userCpf} />
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
                <InputFormError
                  touched={touched.companyName}
                  error={errors.companyName}
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
                <InputFormError
                  touched={touched.companyCpfCnpj}
                  error={errors.companyCpfCnpj}
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
                <InputFormError
                  touched={touched.companyTelephone}
                  error={errors.companyTelephone}
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
                <InputFormError
                  touched={touched.companyAddress}
                  error={errors.companyAddress}
                />
              </div>
            </Fragment>
          )}

          <div className="flexbox__item m-t-16">
            <button
              type="submit"
              disabled={!isValid || !isDirty}
              className="button button--block button--purple"
            >
              Editar
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Profile;
