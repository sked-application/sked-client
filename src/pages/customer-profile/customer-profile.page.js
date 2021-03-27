import React, { useState, useEffect, useCallback, Fragment } from 'react';
import schema from './validators/customer-profile-form.validator';
import UserService from '../../services/user.service';
import PageHeader from '../../common/components/page-header';
import InputFormError from '../../common/components/input-form-error';

import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { Modal } from '../../common/components/modal';
import { handleError } from '../../common/utils/api';
import NumberFormat from 'react-number-format';

const Profile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState();
  const [toggleShow, setToggleShow] = useState(false);

  const {
    errors,
    formState,
    reset,
    setValue,
    register,
    handleSubmit,
    control,
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
      setValue('userTelephone', data.telephone);
    }

    setToggleShow(true);
  };

  const profileForm = async (values) => {
    try {
      const { userName, userCpf, userTelephone } = values;

      await UserService.updateProfile({
        user: {
          cpf: userCpf || null,
          telephone: userTelephone || null,
          name: userName,
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
                  <strong>Meu telefone: </strong>
                  <span>{profile.telephone || 'Não informado'}</span>
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
          <div className="flexbox__item m-t-16">
            <div className="m-b-5">
              <label htmlFor="userTelephone">Meu telefone</label>
            </div>
            <Controller
              id="userTelephone"
              name="userTelephone"
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
              touched={touched.userTelephone}
              error={errors.userTelephone}
            />
          </div>

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