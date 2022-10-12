import React from 'react';
import PropTypes from 'prop-types';
import { AiOutlinePlusSquare, AiOutlineDelete } from 'react-icons/ai';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import Input from '../input';

const TimegridWeekDay = ({ label, day }) => {
  const fieldName = `${day}`;
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: fieldName,
  });

  const handleAppend = () => {
    append({ start: '', end: '' });
  };

  return (
    <div className="my-4 border divide-solid border-stone-200 rounded-xl p-4">
      <div className="flex justify-between pb-2">
        <div>
          <span className="font-semibold">{label}</span>
        </div>
        <div onClick={() => handleAppend()}>
          <AiOutlinePlusSquare fontsize={20} className="cursor-pointer" />
        </div>
      </div>
      {fields.length ? (
        <div>
          {fields.map((item, index) => (
            <div key={item.id}>
              <div className="flex items-end mt-4">
                <Input
                  type="hidden"
                  {...register(`${fieldName}.${index}.day`, {
                    value: day,
                    required: 'Este campo é obrigatório',
                  })}
                />
                <div className="flex-1">
                  <label>Início</label>
                  <Input
                    type="time"
                    className="input"
                    {...register(`${fieldName}.${index}.start`, {
                      required: 'Este campo é obrigatório',
                    })}
                  />
                </div>
                <div className="flex-1 ml-2">
                  <label>Término</label>
                  <Input
                    type="time"
                    className="input"
                    {...register(`${fieldName}.${index}.end`, {
                      required: 'Este campo é obrigatório',
                    })}
                  />
                </div>
                <div className="ml-4 mb-3">
                  <AiOutlineDelete
                    onClick={() => remove(index)}
                    size={20}
                    className="cursor-pointer"
                  />
                </div>
              </div>
            </div>
          ))}
          <ErrorMessage
            errors={errors}
            name={fieldName}
            render={() => (
              <div className="text-red-500 mt-2">
                Preencha todos os campos corretamente
              </div>
            )}
          />
        </div>
      ) : (
        <div>
          <span>Sem definições para este dia.</span>
        </div>
      )}
    </div>
  );
};

TimegridWeekDay.propTypes = {
  label: PropTypes.string,
  day: PropTypes.number,
};

export default TimegridWeekDay;
