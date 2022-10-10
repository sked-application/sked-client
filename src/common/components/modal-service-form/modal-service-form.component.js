import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Controller, useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import NumberFormat from 'react-number-format';
import Button from '../button';
import Input from '../input';

const durationLimit = 1440;

const ServiceFormModal = ({ data, onSubmit }) => {
  const isEdit = !!data;
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    setValue,
    control,
  } = useForm({
    defaultValues: {
      id: '',
      name: '',
      price: '',
      duration: null,
      showPrice: true,
    },
    mode: 'onSubmit',
  });

  const serviceForm = (values) => {
    onSubmit &&
      onSubmit({
        id: values.id,
        name: values.name,
        duration: values.duration,
        price: values.price,
        showPrice: values.showPrice,
      });
  };

  useEffect(() => {
    if (data) {
      setValue('id', data.id);
      setValue('name', data.name);
      setValue('duration', data.duration);
      setValue('price', data.price);
      setValue('showPrice', data.showPrice);
    }
  }, [data, setValue]);

  return (
    <form onSubmit={handleSubmit(serviceForm)}>
      <div className="mb-4">
        <label className="text-sm" htmlFor="name">
          Nome
        </label>
        <Input
          id="name"
          className="input"
          fieldName="name"
          errors={errors}
          {...register('name', {
            required: 'Este campo é obrigatório',
          })}
        />
      </div>
      <div className="mb-4">
        <label className="text-sm" htmlFor="duration">
          Duração em minutos
        </label>
        <Input
          id="duration"
          type="number"
          className="input"
          fieldName="duration"
          errors={errors}
          {...register('duration', {
            required: 'Este campo é obrigatório',
            validate: (value) =>
              value <= durationLimit || 'A duração não pode exceder 24 horas.',
          })}
        />
      </div>
      <div className="mb-4">
        <label className="text-sm" htmlFor="price">
          Valor
        </label>
        <Controller
          control={control}
          name="price"
          render={({ field }) => (
            <NumberFormat
              {...field}
              decimalSeparator={'.'}
              decimalScale={2}
              allowNegative={false}
              className="input"
            />
          )}
          rules={{ required: 'Este campo é obrigatório' }}
        />
        <ErrorMessage
          errors={errors}
          name="price"
          render={({ message }) => (
            <div className="text-red-500 text-sm mt-2">{message}</div>
          )}
        />
      </div>
      <div className="mb-4">
        <label className="flex">
          <Input
            type="checkbox"
            className="checkbox"
            {...register('showPrice')}
          />
          <span className="cursor-pointer text-sm ml-2">
            Mostrar preço na agenda
          </span>
        </label>
      </div>
      <div>
        <input {...register('id')} type="hidden" />
      </div>
      <Button
        type="submit"
        disabled={!isDirty}
        className="button button--block button--primary"
      >
        <span>{isEdit ? 'Atualizar' : 'Adicionar'}</span>
      </Button>
    </form>
  );
};

ServiceFormModal.propTypes = {
  data: PropTypes.object,
  onSubmit: PropTypes.func,
};

export default ServiceFormModal;
