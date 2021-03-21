import React, { useState, useEffect, Fragment } from 'react';
import { BsPlus } from 'react-icons/bs';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { AiOutlineClockCircle } from 'react-icons/ai';
import ServiceService from '../../services/service.service';
import schema from './validators/service-form.validator';
import NumberFormat from 'react-number-format';
import PageHeader from '../../common/components/page-header';
import InputFormError from '../../common/components/input-form-error';
import { Modal, ModalOpenButton } from '../../common/components/modal';
import { handleError } from '../../common/utils/api';

const Services = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [services, setServices] = useState([]);
  const [toggleShow, setToggleShow] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState,
    errors,
    setValue,
    control,
  } = useForm({
    resolver: yupResolver(schema.form.validator),
    defaultValues: schema.form.initialValues,
    mode: 'onChange',
  });

  const { touched, isValid, isDirty } = formState;

  const serviceForm = async (values) => {
    try {
      const { id, name, duration, price, showPrice } = values;
      let message;

      if (id) {
        await ServiceService.update(id, {
          name,
          price,
          duration,
          showPrice,
        });

        message = 'Serviço atualizado com sucesso!';
      } else {
        await ServiceService.create({
          name,
          price,
          duration,
          showPrice,
        });

        message = 'Serviço cadastrado com sucesso!';
      }

      reset();
      listServices();
      handleCloseModal();
      alert(message);
    } catch (error) {
      alert(handleError(error));
    }
  };

  const removeService = async (id) => {
    try {
      const alertQuestion = 'Deseja remover esse serviço?';

      if (window.confirm(alertQuestion)) {
        await ServiceService.remove(id);

        listServices();
      }
    } catch (error) {
      alert(handleError(error));
    }
  };

  const handleCloseModal = () => {
    reset();
    setToggleShow(false);

    if (isEdit) {
      setIsEdit(false);
    }
  };

  const handleOpenModal = (data) => {
    if (data) {
      setValue('id', data.id);
      setValue('name', data.name);
      setValue('duration', data.duration);
      setValue('price', data.price);
      setValue('showPrice', data.showPrice);
      setIsEdit(true);
    }

    setToggleShow(true);
  };

  const listServices = async () => {
    try {
      setIsLoading(true);

      const { data } = await ServiceService.findAll();

      setServices(data);
      setIsLoading(false);
    } catch (error) {
      alert(handleError(error));
    }
  };

  useEffect(() => {
    listServices();
  }, []);

  return (
    <div className="container">
      <PageHeader
        title="Serviços"
        description="Adicione e gerencie seus serviços."
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
          {services.map((item) => (
            <div key={item.id} className="card card--outline">
              <div className="card__header">
                <h2 className="card__title m-r-16">{item.name}</h2>
                <strong
                  onClick={() => handleOpenModal(item)}
                  className="card__subtitle color--purple cursor--pointer"
                >
                  Editar
                </strong>
              </div>
              <div className="card__content flexbox flexbox--end flexbox__justify--between">
                <div>
                  <div className="flexbox">
                    <AiOutlineClockCircle /> {item.duration} minutos
                  </div>
                  <div className="flexbox m-t-16">
                    <strong>R$ {item.price}</strong>
                  </div>
                </div>
                <div className="flexbox m-t-16">
                  <button
                    onClick={() => removeService(item.id)}
                    className="button button--small button--outline"
                  >
                    Remover
                  </button>
                </div>
              </div>
            </div>
          ))}
          {!services.length && (
            <div className="text--center">
              <span>Clique no botão acima e adicione seus serviços.</span>
            </div>
          )}
        </Fragment>
      )}
      <Modal
        title={`${isEdit ? 'Atualizar serviço' : 'Adicione um serviço'}`}
        isOpen={toggleShow}
        handleClose={handleCloseModal}
      >
        <form
          onSubmit={handleSubmit(serviceForm)}
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
              <label htmlFor="duration">Duração em minutos</label>
            </div>
            <input
              id="duration"
              name="duration"
              type="number"
              ref={register}
              className="input input--dark"
            />
            <InputFormError
              touched={touched.duration}
              error={errors.duration}
            />
          </div>
          <div className="flexbox__item m-t-16">
            <div className="m-b-5">
              <label htmlFor="price">Valor</label>
            </div>
            <Controller
              id="price"
              name="price"
              control={control}
              as={
                <NumberFormat
                  decimalSeparator={'.'}
                  decimalScale={2}
                  allowNegative={false}
                  className="input input--dark"
                />
              }
            />
            <InputFormError touched={touched.price} error={errors.price} />
          </div>
          <div className="flexbox__item m-t-16">
            <div className="m-b-5">
              <label className="flexbox cursor--pointer">
                <input
                  name="showPrice"
                  type="checkbox"
                  ref={register}
                  className="checkbox"
                />
                <span className="m-l-10">Mostrar preço</span>
              </label>
            </div>
          </div>
          <div>
            <input name="id" type="hidden" ref={register} />
          </div>
          <div className="flexbox__item m-t-16">
            <button
              type="submit"
              disabled={!isValid || !isDirty}
              className="button button--block button--purple"
            >
              {isEdit ? 'Atualizar' : 'Adicionar'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Services;
