import React from 'react';
import Button from '../button';
import PropTypes from 'prop-types';
import TimegridWeekDay from '../timegrid-week-day';
import { handleError } from '../../../api/api.utils';
import { useForm, FormProvider } from 'react-hook-form';
import { classNames } from '../../utils/helper';

const weekDays = [
  {
    label: 'Domingo',
    day: 0,
  },
  {
    label: 'Segunda-feira',
    day: 1,
  },
  {
    label: 'Terça-feira',
    day: 2,
  },
  {
    label: 'Quarta-feira',
    day: 3,
  },
  {
    label: 'Quinta-feira',
    day: 4,
  },
  {
    label: 'Sexta-feira',
    day: 5,
  },
  {
    label: 'Sábado',
    day: 6,
  },
];

const TimegridForm = ({
  timegrid,
  handleOnSubmit,
  handleOnChange,
  handleOnCancel,
  submitButtonText,
  buttonIsEnabled,
  cancelButtonText,
  isLoading,
  isFromSetupForm,
}) => {
  const methods = useForm({
    defaultValues: timegrid,
    mode: 'onSubmit',
  });

  if (handleOnChange) {
    methods.watch((values) => {
      handleOnChange({ data: getParsedValues(values) });
    });
  }

  const { isDirty } = methods.formState;

  const getParsedValues = (values) => {
    const parsedValues = Object.values(values);
    return [].concat.apply([], parsedValues);
  };

  const onSubmit = (values) => {
    try {
      handleOnSubmit({ data: getParsedValues(values) });
    } catch (error) {
      alert(handleError(error));
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        {weekDays.map((weekDay) => (
          <TimegridWeekDay
            key={weekDay.day}
            label={weekDay.label}
            day={weekDay.day}
          />
        ))}
        {(submitButtonText || cancelButtonText) && (
          <div className="fixed bottom-0 left-0 bg-white w-full">
            <div
              className={classNames(
                'container flex p-4 mx-auto',
                isFromSetupForm ? 'max-w-md' : 'md:pl-64 max-w-screen-lg',
              )}
            >
              {cancelButtonText && (
                <Button
                  type="button"
                  onClick={handleOnCancel}
                  disabled={(!isDirty || isLoading) && !buttonIsEnabled}
                  className="button button--block button--link mr-4 md:ml-4"
                >
                  <span>{cancelButtonText}</span>
                </Button>
              )}
              {submitButtonText && (
                <Button
                  type="submit"
                  disabled={(!isDirty || isLoading) && !buttonIsEnabled}
                  isLoading={isLoading}
                  className="button button--block button--primary"
                >
                  <span>{submitButtonText}</span>
                </Button>
              )}
            </div>
          </div>
        )}
      </form>
    </FormProvider>
  );
};

TimegridForm.propTypes = {
  timegrid: PropTypes.object,
  handleOnSubmit: PropTypes.func,
  handleOnCancel: PropTypes.func,
  handleOnChange: PropTypes.func,
  submitButtonText: PropTypes.string,
  cancelButtonText: PropTypes.string,
  buttonIsEnabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  isFromSetupForm: PropTypes.bool,
};

export default TimegridForm;
