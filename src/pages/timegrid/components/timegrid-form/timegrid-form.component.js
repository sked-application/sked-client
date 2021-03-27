import React, { useState, useEffect, Fragment } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { BsPlus } from 'react-icons/bs';
import { useForm } from 'react-hook-form';
import TimegridWeekDay from '../timegrid-week-day';
import TimegridService from '../../../../services/timegrid.service';
import schema from '../../validators/timegrid-form.validator';
import { Modal } from '../../../../common/components/modal';
import { handleError } from '../../../../common/utils/api';
import './timegrid-form.component.scss';

const initialTimegrid = {
  0: [],
  1: [],
  2: [],
  3: [],
  4: [],
  5: [],
  6: [],
};

const TimegridForm = () => {
  const [timegrid, setTimegrid] = useState(initialTimegrid);
  const [formData, setFormData] = useState([]);
  const [toggleShow, setToggleShow] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [day, setDay] = useState();

  const { register, handleSubmit, reset, formState } = useForm({
    resolver: yupResolver(schema.form.validator),
    defaultValues: schema.form.initialValues,
    mode: 'onChange',
  });

  const timegridForm = (values) => {
    const { start, end } = values;

    setFormData([...formData, { start, end, day }]);

    reset();
  };

  const handleRemove = (index) => {
    if (window.confirm('Deseja remover esse horário?')) {
      const data = [...formData];

      data.splice(index, 1);
      setFormData(data);
    }
  };

  const handleSubmitTimegrid = async () => {
    try {
      const timegridData = { ...timegrid };

      timegridData[day] = formData;

      const values = Object.values(timegridData);
      const data = [].concat.apply([], values);

      await TimegridService.set({ data });

      listTimegrid();
      handleCloseModal();
    } catch (error) {
      setError(handleError(error));
      setIsLoading(false);
    }
  };

  const handleCloseModal = () => {
    setTimeout(() => {
      setFormData([]);
      reset();
    }, 300);

    setToggleShow(false);
  };

  const handleOpenModal = (currentDay) => {
    const timegridData = { ...timegrid };

    setDay(currentDay);
    setFormData(timegridData[currentDay]);
    setToggleShow(true);
  };

  const listTimegrid = async () => {
    try {
      setIsLoading(true);

      const { data } = await TimegridService.findAll();

      setTimegrid(data);
      setIsLoading(false);
    } catch (error) {
      alert(handleError(error));
    }
  };

  useEffect(() => {
    listTimegrid();
  }, []);

  return (
    <div className="p-b-20">
      {error && (
        <div className="m-t-16 m-b-16">
          <span>{error.message}</span>
        </div>
      )}
      {isLoading ? (
        <span className="loading"></span>
      ) : (
        <ul>
          <TimegridWeekDay
            label="Segunda-feira"
            timegrid={timegrid[0]}
            setTimegrid={setTimegrid}
            handleOpen={() => handleOpenModal(0)}
          />
          <TimegridWeekDay
            label="Terça-feira"
            timegrid={timegrid[1]}
            setTimegrid={setTimegrid}
            handleOpen={() => handleOpenModal(1)}
          />
          <TimegridWeekDay
            label="Quarta-feira"
            timegrid={timegrid[2]}
            setTimegrid={setTimegrid}
            handleOpen={() => handleOpenModal(2)}
          />
          <TimegridWeekDay
            label="Quinta-feira"
            timegrid={timegrid[3]}
            setTimegrid={setTimegrid}
            handleOpen={() => handleOpenModal(3)}
          />
          <TimegridWeekDay
            label="Sexta-feira"
            timegrid={timegrid[4]}
            setTimegrid={setTimegrid}
            handleOpen={() => handleOpenModal(4)}
          />
          <TimegridWeekDay
            label="Sábado"
            timegrid={timegrid[5]}
            setTimegrid={setTimegrid}
            handleOpen={() => handleOpenModal(5)}
          />
          <TimegridWeekDay
            label="Domingo"
            timegrid={timegrid[6]}
            setTimegrid={setTimegrid}
            handleOpen={() => handleOpenModal(6)}
          />
        </ul>
      )}
      <Modal
        title="Gerenciar horário"
        isOpen={toggleShow}
        handleClose={handleCloseModal}
      >
        <Fragment>
          <form
            onSubmit={handleSubmit(timegridForm)}
            className="flexbox flexbox--column"
          >
            <div className="flexbox flexbox--column">
              <div className="flexbox flexbox--end">
                <div className="flexbox__item">
                  <div className="m-b-5">
                    <label htmlFor="start">Início</label>
                  </div>
                  <input
                    name="start"
                    type="time"
                    id="start"
                    ref={register}
                    className="input input--dark"
                  />
                </div>
                <div className="flexbox__item m-l-16">
                  <div className="m-b-5">
                    <label htmlFor="end">Término</label>
                  </div>
                  <input
                    name="end"
                    type="time"
                    id="end"
                    ref={register}
                    className="input input--dark"
                  />
                </div>
                <button
                  type="submit"
                  disabled={!formState.isDirty}
                  className="button button--purple m-l-16"
                >
                  <BsPlus fontSize="35" fontWeight="700" />
                </button>
              </div>
            </div>
            <div className="timegrid-slot__box flexbox flexbox--wrap">
              {formData.map((item, index) => (
                <div
                  key={index}
                  className={`timegrid-slot__item flexbox m-t-16 p-l-5 p-r-5`}
                  onClick={() => handleRemove(index)}
                >
                  <div className="flexbox__item badge badge--light badge--outline cursor--pointer text--center">
                    <span>
                      {item.start.slice(0, 5)} às {item.end.slice(0, 5)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </form>
          {!!formData.length && (
            <div className="flexbox m-t-16">
              <span className="timegrid-form__tip">
                Obs: Clicando em um configuração, você consegue removê-la.
              </span>
            </div>
          )}
          <div className="flexbox m-t-16">
            <button
              onClick={handleSubmitTimegrid}
              className="button button--block button--purple"
            >
              Salvar grade de horário
            </button>
          </div>
        </Fragment>
      </Modal>
    </div>
  );
};

export default TimegridForm;
