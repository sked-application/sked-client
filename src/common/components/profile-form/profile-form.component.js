import React, { useState, useEffect, Fragment } from 'react';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import Input from '../input';
import CompanyThumb from '../company-thumb';
import { handleError } from '../../utils/api';
import { telephoneMask } from '../../utils/telephone-mask';
import { phoneRegex, replaceSpecialCharacters } from '../../utils/validator';
import Loading from '../loading';
import Button from '../button';
import { uploadFile } from '../../utils/upload';

const ProfileForm = ({ data, isProfessional, onSubmit }) => {
  const [companyThumbnailIsLoading, setCompanyThumbnailIsLoading] = useState(
    false,
  );
  const [companyThumbPreview, setCompanyThumbPreview] = useState();
  const [userThumbnailIsLoading, setUserThumbnailIsLoading] = useState(false);
  const [userThumbPreview, setUserThumbPreview] = useState();

  const {
    formState: { isDirty, errors },
    setValue,
    register,
    handleSubmit,
  } = useForm({
    defaultValues: {
      userName: '',
      userTelephone: '',
      userThumbnail: '',
      companyName: '',
      companyTelephone: '',
      companyAddress: '',
      companyThumbnail: '',
    },
    mode: 'onSubmit',
  });

  const profileForm = async (values) => {
    const {
      userName,
      userTelephone,
      userThumbnail,
      companyName,
      companyTelephone,
      companyAddress,
      companyThumbnail,
    } = values;

    onSubmit &&
      onSubmit({
        user: {
          name: userName,
          telephone: userTelephone,
          thumbnail: userThumbnail,
        },
        company: {
          name: companyName,
          telephone: companyTelephone,
          address: companyAddress || null,
          thumbnail: companyThumbnail || null,
        },
      });
  };

  const onChangeFile = async (file, { onStart, onSucess, onError }) => {
    onStart();

    try {
      const fileUrl = await uploadFile(file, data.id);

      onSucess(fileUrl);
    } catch (error) {
      onError(error);
      alert(handleError(error));
    }
  };

  useEffect(() => {
    if (data) {
      setValue('userName', data.name);
      setValue('userTelephone', telephoneMask(data.telephone));

      if (isProfessional) {
        setValue('userThumbnail', data.thumbnail);
        setUserThumbPreview(data.thumbnail);
        setValue('companyName', data.company?.name);
        setValue('companyTelephone', telephoneMask(data.company?.telephone));
        setValue('companyAddress', data.company?.address);
        setValue('companyThumbnail', data.company?.thumbnail);
        setCompanyThumbPreview(data.company?.thumbnail);
      }
    }
  }, [data, setValue, isProfessional]);

  return (
    <form onSubmit={handleSubmit(profileForm)}>
      <div className="mb-2">
        <span className="font-semibold">Meus dados</span>
      </div>
      <div className="mb-4">
        <label htmlFor="userName">Nome</label>
        <Input
          id="userName"
          className="input"
          fieldName="userName"
          errors={errors}
          {...register('userName', {
            required: 'Este campo é obrigatório',
          })}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="userTelephone">Telefone</label>
        <Input
          id="userTelephone"
          type="tel"
          className="input"
          fieldName="userTelephone"
          errors={errors}
          {...register('userTelephone', {
            required: {
              value: !isProfessional,
              message: 'Este campo é obrigatório.',
            },
            onChange: (event) =>
              setValue('userTelephone', telephoneMask(event.target.value)),
            validate: (value) =>
              phoneRegex(value) || 'Por favor, verifique o número de telefone.',
            setValueAs: (value) => replaceSpecialCharacters(value) || null,
          })}
        />
      </div>

      {isProfessional && (
        <Fragment>
          <div className="mb-4">
            <label htmlFor="uploadUserFile">Foto/logo</label>
            {userThumbPreview ? (
              <Fragment>
                <div className="flex">
                  <CompanyThumb src={userThumbPreview} />
                  <button
                    onClick={() => {
                      setUserThumbPreview(null);
                      setValue('userThumbnail', null, {
                        shouldDirty: true,
                      });
                    }}
                    className="button button--small button--secondary ml-4"
                  >
                    Remover
                  </button>
                </div>
              </Fragment>
            ) : (
              <Input
                id="uploadUserFile"
                type="file"
                accept=".jpg, .jpeg, .png"
                onChange={(event) =>
                  onChangeFile(event.target.files[0], {
                    onStart: () => setUserThumbnailIsLoading(true),
                    onSucess: (fileUrl) => {
                      setValue('userThumbnail', fileUrl, {
                        shouldDirty: true,
                      });
                      setUserThumbPreview(fileUrl);
                      setUserThumbnailIsLoading(false);
                    },
                    onError: () => setUserThumbnailIsLoading(false),
                  })
                }
              />
            )}
            <Input
              {...register('userThumbnail', {
                setValueAs: (value) => value || null,
              })}
              id="userThumbnail"
              type="hidden"
            />
            {userThumbnailIsLoading && <Loading />}
          </div>
          <div className="mb-4">
            <span className="font-semibold">Dados do estabelecimento</span>
          </div>
          <div className="mb-4">
            <label htmlFor="companyName">Nome</label>
            <Input
              id="companyName"
              className="input"
              fieldName="companyName"
              errors={errors}
              {...register('companyName', {
                required: 'Este campo é obrigatório',
              })}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="companyTelephone">Telefone</label>
            <Input
              id="companyTelephone"
              type="tel"
              className="input"
              fieldName="companyTelephone"
              errors={errors}
              {...register('companyTelephone', {
                onChange: (event) =>
                  setValue(
                    'companyTelephone',
                    telephoneMask(event.target.value),
                  ),
                validate: (value) =>
                  phoneRegex(value) ||
                  'Por favor, verifique o número de telefone.',
                setValueAs: (value) => replaceSpecialCharacters(value) || null,
              })}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="companyAddress">Endereço</label>
            <Input
              id="companyAddress"
              className="input"
              fieldName="companyAddress"
              errors={errors}
              {...register('companyAddress', {
                setValueAs: (value) => value || null,
              })}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="uploadFile">Foto/logo</label>
            {companyThumbPreview ? (
              <Fragment>
                <div className="flex">
                  <CompanyThumb src={companyThumbPreview} />
                  <button
                    onClick={() => {
                      setCompanyThumbPreview(null);
                      setValue('companyThumbnail', null, {
                        shouldDirty: true,
                      });
                    }}
                    className="button button--small button--secondary ml-4"
                  >
                    Remover
                  </button>
                </div>
              </Fragment>
            ) : (
              <Input
                id="uploadFile"
                type="file"
                accept=".jpg, .jpeg, .png"
                onChange={(event) =>
                  onChangeFile(event.target.files[0], {
                    onStart: () => setCompanyThumbnailIsLoading(true),
                    onSucess: (fileUrl) => {
                      setValue('companyThumbnail', fileUrl, {
                        shouldDirty: true,
                      });
                      setCompanyThumbPreview(fileUrl);
                      setCompanyThumbnailIsLoading(false);
                    },
                    onError: () => setCompanyThumbnailIsLoading(false),
                  })
                }
              />
            )}
            <Input
              {...register('companyThumbnail', {
                setValueAs: (value) => value || null,
              })}
              id="companyThumbnail"
              type="hidden"
            />
            {companyThumbnailIsLoading && <Loading />}
          </div>
        </Fragment>
      )}
      <div>
        <Button
          type="submit"
          disabled={!isDirty || companyThumbnailIsLoading}
          className="button button--block button--primary"
        >
          <span>Atualizar</span>
        </Button>
      </div>
    </form>
  );
};

ProfileForm.propTypes = {
  data: PropTypes.object,
  isProfessional: PropTypes.bool,
  onSubmit: PropTypes.func,
};

export default ProfileForm;
