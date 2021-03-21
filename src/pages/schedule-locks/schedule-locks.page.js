import React, { useState, useEffect, Fragment } from 'react';
import moment from 'moment';
import schema from './validators/schedule-locks-form.validator';
import ScheduleLockService from '../../services/schedule-lock.service';
import PageHeader from '../../common/components/page-header';
import InputFormError from '../../common/components/input-form-error';

import { getFormattedDatePreview } from '../../common/utils/date';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Modal, ModalOpenButton } from '../../common/components/modal';
import { BsPlus } from 'react-icons/bs';
import { handleError } from '../../common/utils/api';

const ScheduleLocks = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [scheduleLocks, setScheduleLocks] = useState([]);
  const [toggleShow, setToggleShow] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState,
    errors,
    setValue,
  } = useForm({
    resolver: yupResolver(schema.form.validator),
    defaultValues: schema.form.initialValues,
    mode: 'onChange',
  });

  const { touched, isValid, isDirty } = formState;

  const scheduleLockForm = async (values) => {
    try {
      const { id, date, start, end } = values;
      let message;

      if (id) {
        await ScheduleLockService.update(id, {
          date,
          start,
          end,
        });

        message = 'Bloqueio atualizado com sucesso!';
      } else {
        await ScheduleLockService.create({
          date,
          start,
          end,
        });

        message = 'Bloqueio cadastrado com sucesso!';
      }

      reset();
      listScheduleLocks();
      handleCloseModal();
      alert(message);
    } catch (error) {
      alert(handleError(error));
    }
  };

  const removeScheduleLock = async (id) => {
    try {
      const alertQuestion = 'Deseja remover esse bloqueio de agenda?';

      if (window.confirm(alertQuestion)) {
        await ScheduleLockService.remove(id);

        listScheduleLocks();
      }
    } catch (error) {
      alert(handleError(error));
    }
  };

  const handleCloseModal = () => {
    setTimeout(() => {
      reset();
    }, 300);

    setToggleShow(false);
  };

  const handleOpenModal = (data) => {
    if (data) {
      setValue('id', data.id);
      setValue('start', data.start);
      setValue('end', data.end);
      setValue('date', moment(data.date).format('YYYY-MM-DD'));
      setIsEdit(true);
    } else {
      setValue('date', moment().format('YYYY-MM-DD'));
    }

    setToggleShow(true);
  };

  const listScheduleLocks = async () => {
    try {
      setIsLoading(true);

      const { data } = await ScheduleLockService.findAll();

      setScheduleLocks(data);
      setIsLoading(false);
    } catch (error) {
      alert(handleError(error));
    }
  };

  useEffect(() => {
    listScheduleLocks();
  }, []);

  return (
    <div className="container">
      <PageHeader
        title="Bloqueio de agenda"
        description="Aqui você gerencia o bloqueio de agenda para dias específicos."
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
          {scheduleLocks.map((item, index) => (
            <div key={index} className="card card--outline">
              <div>
                <div className="card__header">
                  <h2 className="card__title">
                    {getFormattedDatePreview(item.date)}
                  </h2>
                  <strong
                    onClick={() => handleOpenModal(item)}
                    className="card__subtitle color--purple cursor--pointer"
                  >
                    Editar
                  </strong>
                </div>
                <div className="flexbox flexbox--end flexbox__justify--between">
                  <div className="badge badge--light badge--outline cursor--pointer text--center">
                    <span>
                      {item.start.slice(0, 5)} às {item.end.slice(0, 5)}
                    </span>
                  </div>
                  <button
                    onClick={() => removeScheduleLock(item.id)}
                    className="button button--outline button--small"
                  >
                    Remover
                  </button>
                </div>
              </div>
            </div>
          ))}
          {!scheduleLocks.length && (
            <div className="text--center">
              <span>
                Clique no botão acima para configurar um bloqueio de agenda.
              </span>
            </div>
          )}
        </Fragment>
      )}
      <Modal
        title="Gerenciar bloqueio de agenda"
        isOpen={toggleShow}
        handleClose={handleCloseModal}
      >
        <Fragment>
          <form
            onSubmit={handleSubmit(scheduleLockForm)}
            className="flexbox flexbox--column"
          >
            <div className="flexbox flexbox--column">
              <div className="flexbox__item">
                <div className="m-b-5">
                  <label htmlFor="date">Data</label>
                </div>
                <input
                  id="date"
                  name="date"
                  type="date"
                  ref={register}
                  className="input input--dark"
                />
                <InputFormError touched={touched.date} error={errors.date} />
              </div>
              <div className="flexbox m-t-16">
                <div className="flexbox__item">
                  <div className="m-b-5">
                    <label htmlFor="start">Início</label>
                  </div>
                  <input
                    id="start"
                    name="start"
                    type="time"
                    ref={register}
                    className="input input--dark"
                  />
                  <InputFormError
                    touched={touched.start}
                    error={errors.start}
                  />
                </div>
                <div className="flexbox__item m-l-16">
                  <div className="m-b-5">
                    <label htmlFor="end">Término</label>
                  </div>
                  <input
                    id="end"
                    name="end"
                    type="time"
                    ref={register}
                    className="input input--dark"
                  />
                  <InputFormError touched={touched.end} error={errors.end} />
                </div>
              </div>
              <div>
                <input name="id" type="hidden" ref={register} />
              </div>
              <div className="flexbox m-t-16">
                <button
                  disabled={!isValid || !isDirty}
                  className="button button--block button--purple"
                >
                  {isEdit ? 'Atualizar' : 'Salvar'}
                </button>
              </div>
            </div>
          </form>
        </Fragment>
      </Modal>
    </div>
  );
};

export default ScheduleLocks;
