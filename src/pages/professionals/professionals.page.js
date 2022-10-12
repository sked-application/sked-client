import React, { useState, useEffect, Fragment } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { useForm } from 'react-hook-form';
import UserService from '../../services/user.service';
import PageHeader from '../../common/components/page-header';
import { Modal } from '../../common/components/modal';
import { handleError } from '../../common/utils/api';
import Button from '../../common/components/button';
import Input from '../../common/components/input';
import { emailRegex } from '../../common/utils/validator';
import Loading from '../../common/components/loading';

const Professionals = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingModal, setIsLoadingModal] = useState(false);
  const [professionals, setProfessionals] = useState([]);
  const [toggleShow, setToggleShow] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isDirty, errors },
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
    },
    mode: 'onSubmit',
  });

  const professionalForm = async (values) => {
    setIsLoadingModal(true);

    try {
      const { name, email } = values;

      await UserService.create({
        name,
        email,
      });

      reset();
      setIsLoadingModal(false);
      listProfessionals();
      handleCloseModal();
      alert('Solicitação enviada para o email do profissional!');
    } catch (error) {
      setIsLoadingModal(false);
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
    <div className="container mx-auto px-4 max-w-screen-lg flex-1">
      <PageHeader
        title="Profissionais"
        description="Adicione e gerencie os profissionais de seu estabelecimentos."
      />
      {isLoading ? (
        <Loading />
      ) : (
        <Fragment>
          <Button
            type="button"
            onClick={() => handleOpenModal()}
            className="button button--block button--primary mb-4"
          >
            <div className="flex items-center justify-center">
              <AiOutlinePlus size={20} className="mr-2" />
              <span>Adicionar novo profissional</span>
            </div>
          </Button>

          {professionals.map((professional) => (
            <div
              key={professional.id}
              className="mb-4 border divide-solid border-stone-200 rounded-xl p-4"
            >
              <div className="mb-4 flex justify-between">
                <h2 className="text-md font-semibold">{professional.name}</h2>
                {professional.confirmationToken ? (
                  <span className="text-indigo-500">Pendente</span>
                ) : (
                  <span className="text-green-500">Ativo</span>
                )}
              </div>
              <div>
                <div>{professional.email}</div>
              </div>
            </div>
          ))}
          {!professionals.length && (
            <div className="text-center">
              <span>Clique no botão acima e adicione profissionais.</span>
            </div>
          )}
        </Fragment>
      )}

      <Modal
        isOpen={toggleShow}
        handleClose={handleCloseModal}
        title="Convidar um novo profissional"
      >
        <form onSubmit={handleSubmit(professionalForm)}>
          <div className="mb-4">
            <label htmlFor="name">Nome</label>
            <Input
              id="name"
              className="input"
              fieldName="name"
              errors={errors}
              {...register('name', {
                required: 'Este campo é obrigatório.',
              })}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email">Email</label>
            <Input
              type="email"
              disabled={isLoading}
              className="input"
              fieldName="email"
              errors={errors}
              {...register('email', {
                required: 'Este campo é obrigatório.',
                pattern: {
                  value: emailRegex,
                  message: 'Insira um email válido.',
                },
              })}
            />
          </div>
          <Button
            type="submit"
            disabled={!isDirty || isLoadingModal}
            isLoading={isLoadingModal}
            className="button button--block button--primary"
          >
            <span>Convidar</span>
          </Button>
        </form>
      </Modal>
    </div>
  );
};

export default Professionals;
