import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { useForm } from 'react-hook-form';
import { AiOutlinePlus, AiOutlineForm, AiOutlineDelete } from 'react-icons/ai';
import ScheduleLockService from '../../services/schedule-lock.service';
import PageHeader from '../../common/components/page-header';
import { getFormattedDatePreview } from '../../common/utils/date';
import { Modal } from '../../common/components/modal';
import { handleError } from '../../common/utils/api';
import Button from '../../common/components/button';
import Input from '../../common/components/input';
import Loading from '../../common/components/loading';

const ScheduleLocks = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingModal, setIsLoadingModal] = useState(false);
  const [scheduleLocks, setScheduleLocks] = useState([]);
  const [toggleShow, setToggleShow] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isDirty, errors },
    setValue,
  } = useForm({
    defaultValues: {
      id: '',
      start: '',
      end: '',
      date: null,
    },
    mode: 'onSubmit',
  });

  const scheduleLockForm = async (values) => {
    setIsLoadingModal(true);

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
      setIsLoadingModal(false);
      listScheduleLocks();
      handleCloseModal();
      alert(message);
    } catch (error) {
      setIsLoadingModal(false);
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
    <div className="container mx-auto px-4 max-w-screen-lg flex-1">
      <PageHeader
        title="Bloqueio de agenda"
        description="Aqui você gerencia o bloqueio de agenda para dias específicos."
      />
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          <Button
            type="button"
            onClick={() => handleOpenModal()}
            className="button button--block button--primary mb-4"
          >
            <div className="flex items-center justify-center">
              <AiOutlinePlus size={20} className="mr-2" />
              <span>Adicionar novo bloqueio</span>
            </div>
          </Button>
          {scheduleLocks.map((item, index) => (
            <div
              key={index}
              className="mb-4 border divide-solid border-stone-200 rounded-xl p-4"
            >
              <div>
                <div className="mb-4 flex justify-between">
                  <h2 className="text-md font-semibold">
                    {getFormattedDatePreview(item.date)}
                  </h2>
                  <AiOutlineForm
                    onClick={() => handleOpenModal(item)}
                    size={20}
                    className="cursor-pointer"
                  />
                </div>
                <div className="flex justify-between">
                  <div>
                    <span>
                      {`Agenda bloqueada das ${item.start.slice(0, 5)} às
                      ${item.end.slice(0, 5)}`}
                    </span>
                  </div>
                  <AiOutlineDelete
                    onClick={() => removeScheduleLock(item.id)}
                    size={20}
                    className="cursor-pointer"
                  />
                </div>
              </div>
            </div>
          ))}
          {!scheduleLocks.length && (
            <div className="text-center">
              <span>
                Clique no botão acima para configurar um bloqueio de agenda.
              </span>
            </div>
          )}
        </div>
      )}

      <Modal
        isOpen={toggleShow}
        handleClose={handleCloseModal}
        title="Gerenciar bloqueio de agenda"
      >
        <form onSubmit={handleSubmit(scheduleLockForm)}>
          <div className="flex flex-col">
            <div className="mb-4">
              <label htmlFor="date">Data</label>
              <Input
                id="date"
                type="date"
                className="input"
                fieldName="date"
                errors={errors}
                {...register('date', {
                  required: 'Este campo é obrigatório',
                })}
              />
            </div>
            <div className="flex mb-4">
              <div className="flex-1">
                <label htmlFor="start">Início</label>
                <Input
                  id="start"
                  type="time"
                  className="input"
                  fieldName="start"
                  errors={errors}
                  {...register('start', {
                    required: 'Este campo é obrigatório',
                  })}
                />
              </div>
              <div className="flex-1 ml-4">
                <label htmlFor="end">Término</label>
                <Input
                  id="end"
                  type="time"
                  className="input"
                  fieldName="end"
                  errors={errors}
                  {...register('end', {
                    required: 'Este campo é obrigatório',
                  })}
                />
              </div>
            </div>
            <div>
              <input {...register('id')} type="hidden" />
            </div>
            <Button
              type="submit"
              disabled={!isDirty || isLoadingModal}
              isLoading={isLoadingModal}
              className="button button--block button--primary"
            >
              <span>{isEdit ? 'Atualizar' : 'Adicionar'}</span>
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ScheduleLocks;
