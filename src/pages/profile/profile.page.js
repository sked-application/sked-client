import React, { useState, useEffect, useCallback, Fragment } from 'react';
import schema from './validators/profile-form.validator';
import UserService from '../../services/user.service';
import PageHeader from '../../common/components/page-header';
import InputFormError from '../../common/components/input-form-error';
import InputTelephone from '../../common/components/input-telephone';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Modal } from '../../common/components/modal';
import { handleError } from '../../common/utils/api';
import { telephoneMask } from '../../common/utils/telephone-mask';
import { replaceSpecialCharacters } from '../../common/utils/validator';
import {
  companyPlanLabels,
  getLeftTrialDays,
} from '../../common/utils/company';

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
      setValue('userTelephone', telephoneMask(data.telephone));
      setValue('companyName', data.company.name);
      setValue('companyTelephone', telephoneMask(data.company.telephone));
      setValue('companyAddress', data.company.address);
    }

    setToggleShow(true);
  };

  const profileForm = async (values) => {
    try {
      const {
        userName,
        userTelephone,
        companyName,
        companyTelephone,
        companyAddress,
      } = values;

      await UserService.updateProfile({
        user: {
          name: userName,
          telephone: userTelephone || null,
        },
        company: {
          name: companyName,
          telephone: replaceSpecialCharacters(companyTelephone) || null,
          address: companyAddress || null,
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
                  <strong>Email: </strong>
                  <span>{profile.email}</span>
                </div>
                <div className="m-t-10">
                  <strong>Meu telefone: </strong>
                  <span>
                    {telephoneMask(profile.telephone) || 'Não informado'}
                  </span>
                </div>
                <div className="m-t-10">
                  <strong>Administrador: </strong>
                  <span>{profile.role === 'ADMIN' ? 'Sim' : 'Não'}</span>
                </div>
              </div>

              <div className="card__header">
                <h2 className="card__title">Dados do estabelecimento</h2>
              </div>
              <div className="flexbox flexbox--column m-b-30">
                <div className="m-t-10">
                  <strong>Conta: </strong>
                  <span>{profile.company.name}</span>
                </div>
                <div className="m-t-10">
                  <strong>Url: </strong>
                  <span>agenda.skedapp.com.br/{profile.company.url}</span>
                </div>
                <div className="m-t-10">
                  <strong>Telefone: </strong>
                  <span>
                    {telephoneMask(profile.company.telephone) ||
                      'Não informado'}
                  </span>
                </div>
                <div className="m-t-10">
                  <strong>Endereço: </strong>
                  <span>{profile.company.address || 'Não informado'}</span>
                </div>
                <div className="m-t-10">
                  <strong>Plano: </strong>
                  <span>
                    {companyPlanLabels(profile.company.plan)}
                    {profile.company.plan === 'TRIAL' && (
                      <span>
                        {` - ${getLeftTrialDays(
                          profile.company.createdAt,
                        )} dia(s) restante(s)`}
                      </span>
                    )}
                  </span>
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
          <div className="m-b-16">
            <strong>Meus dados</strong>
          </div>
          <div className="flexbox__item m-b-16">
            <div className="m-b-5">
              <label htmlFor="userName">Nome</label>
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
          <div className="flexbox__item m-b-16">
            <div className="m-b-5">
              <label htmlFor="userTelephone">Telefone</label>
            </div>
            <InputTelephone
              id="userTelephone"
              name="userTelephone"
              className="input input--dark"
              ref={register}
              onChange={(event) =>
                setValue('userTelephone', telephoneMask(event.target.value))
              }
            />
            <InputFormError
              touched={touched.userTelephone}
              error={errors.userTelephone}
            />
          </div>
          {profile && profile.role === 'ADMIN' && (
            <Fragment>
              <div className="m-b-16">
                <strong>Dados do estabelecimento</strong>
              </div>
              <div className="flexbox__item m-b-16">
                <div className="m-b-5">
                  <label htmlFor="companyName">Nome</label>
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
              <div className="flexbox__item m-b-16">
                <div className="m-b-5">
                  <label htmlFor="companyTelephone">Telefone</label>
                </div>
                <InputTelephone
                  id="companyTelephone"
                  name="companyTelephone"
                  className="input input--dark"
                  ref={register}
                  onChange={(event) =>
                    setValue(
                      'companyTelephone',
                      telephoneMask(event.target.value),
                    )
                  }
                />
                <InputFormError
                  touched={touched.companyTelephone}
                  error={errors.companyTelephone}
                />
              </div>
              <div className="flexbox__item m-b-16">
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

          <div className="flexbox__item">
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
