import React, { useState, useEffect, Fragment } from 'react';
import { BsPlus } from 'react-icons/bs';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import UserService from '../../services/user.service';
import schema from './validators/professionals-form.validator';
import PageHeader from '../../common/components/page-header';
import InputFormError from '../../common/components/input-form-error';
import { Modal, ModalOpenButton } from '../../common/components/modal';
import { handleError } from '../../common/utils/api';

const Professionals = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [professionals, setProfessionals] = useState([]);
  const [toggleShow, setToggleShow] = useState(false);

  const { register, handleSubmit, reset, formState, errors } = useForm({
    resolver: yupResolver(schema.form.validator),
    defaultValues: schema.form.initialValues,
    mode: 'onChange',
  });

  const { touched, isValid, isDirty } = formState;

  const professionalForm = async (values) => {
    try {
      const { name, email } = values;

      await UserService.create({
        name,
        email,
      });

      reset();
      listProfessionals();
      handleCloseModal();
      alert('Solicitação enviada para o email do profissional!');
    } catch (error) {
      alert(handleError(error));
    }
  };

  const handleCloseModal = () => {
    reset();
    setToggleShow(false);
  };

  const handleOpenModal = () => {
    setToggleShow(true);
  };

  const listProfessionals = async () => {
    try {
      setIsLoading(true);

      const { data } = await UserService.findAll();

      setProfessionals(data);
      setIsLoading(false);
    } catch (error) {
      alert(handleError(error));
    }
  };

  useEffect(() => {
    listProfessionals();
  }, []);

  return (
    <div className="container">
      <PageHeader
        title="Profissionais"
        description="Adicione e gerencie os profissionais de seu estabelecimentos."
      />
      {isLoading ? (
        <div className="loading"></div>
      ) : (
        <Fragment>
          <div className="flexbox flexbox__justify--end m-b-16">
            <ModalOpenButton onClick={() => handleOpenModal()}>
              <BsPlus fontSize="30" fontWeight="700" />
            </ModalOpenButton>
          </div>
          {professionals.map((professional) => (
            <div key={professional.id} className="card card--outline">
              <div className="card__header">
                <h2 className="card__title m-r-16">{professional.name}</h2>
                <div className="flexbox flexbox--column flexbox--end">
                  {professional.confirmationToken ? (
                    <span className="card__subtitle color--orange m-b-5">
                      Pendente
                    </span>
                  ) : (
                    <span className="card__subtitle color--green m-b-5">
                      Ativo
                    </span>
                  )}
                </div>
              </div>
              <div className="card__content flexbox flexbox--center flexbox__justify--between">
                <div>
                  <div className="flexbox">{professional.email}</div>
                </div>
              </div>
            </div>
          ))}
          {!professionals.length && (
            <div className="text--center">
              <span>Clique no botão acima e adicione profissionais.</span>
            </div>
          )}
        </Fragment>
      )}
      <Modal
        title="Adicione um profissional"
        isOpen={toggleShow}
        handleClose={handleCloseModal}
      >
        <form
          onSubmit={handleSubmit(professionalForm)}
          className="flexbox flexbox--column"
        >
          <div className="flexbox__item">
            <div className="m-b-5">
              <label htmlFor="name">Nome</label>
            </div>
            <input
              id="name"
              name="name"
              type="text"
              ref={register}
              className="input input--dark"
            />
            <InputFormError touched={touched.name} error={errors.name} />
          </div>
          <div className="flexbox__item m-t-16">
            <div className="m-b-5">
              <label htmlFor="email">Email</label>
            </div>
            <input
              name="email"
              type="email"
              ref={register}
              placeholder="Email"
              disabled={isLoading}
              className="input"
            />
            <InputFormError touched={touched.email} error={errors.email} />
          </div>
          <div className="flexbox__item m-t-16">
            <button
              type="submit"
              disabled={!isValid || !isDirty}
              className="button button--block button--purple"
            >
              Adicionar
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Professionals;
