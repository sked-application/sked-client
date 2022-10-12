import React, { useState, useEffect, Fragment } from 'react';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import Input from '../input';
import CompanyThumb from '../company-thumb';
import { handleError } from '../../utils/api';
import { telephoneMask } from '../../utils/telephone-mask';
import { phoneRegex, replaceSpecialCharacters } from '../../utils/validator';
import { firebaseApp } from '../../../services/firebase.service';
import { resizeFile } from '../../utils/image';
import { getUnixHash } from '../../utils/date';
import Loading from '../loading';
import Button from '../button';

const ProfileFormModal = ({ data, isProfessional, onSubmit }) => {
  const [thumbnailIsLoading, setThumbnailIsLoading] = useState(false);
  const [thumbPreview, setThumbPreview] = useState();

  const {
    formState: { isDirty, errors },
    setValue,
    register,
    handleSubmit,
  } = useForm({
    defaultValues: {
      userName: '',
      userTelephone: '',
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
        },
        company: {
          name: companyName,
          telephone: companyTelephone,
          address: companyAddress || null,
          thumbnail: companyThumbnail || null,
        },
      });
  };

  const onChangeFile = async (event, onRemove) => {
    if (onRemove) {
      setThumbPreview(null);
      setValue('companyThumbnail', null, {
        shouldDirty: true,
      });
      return;
    }

    setThumbnailIsLoading(true);

    try {
      const file = event.target.files[0];

      const image = await resizeFile(file);
      const storageRef = firebaseApp.storage().ref('thumbnails');
      const fileRef = storageRef.child(
        `${data.id}-${getUnixHash()}-${image.name}`,
      );
      await fileRef.put(image);
      const thumbnailUrl = await fileRef.getDownloadURL();

      setValue('companyThumbnail', thumbnailUrl, {
        shouldDirty: true,
      });

      setThumbPreview(thumbnailUrl);
      setThumbnailIsLoading(false);
    } catch (error) {
      setThumbnailIsLoading(false);
      alert(handleError(error));
    }
  };
  const onRemoveFile = () => {
    setThumbPreview(null);
    setValue('companyThumbnail', null, {
      shouldDirty: true,
    });
  };

  useEffect(() => {
    if (data) {
      setValue('userName', data.name);
      setValue('userTelephone', telephoneMask(data.telephone));

      if (isProfessional) {
        setValue('companyName', data.company?.name);
        setValue('companyTelephone', telephoneMask(data.company?.telephone));
        setValue('companyAddress', data.company?.address);
        setValue('companyThumbnail', data.company?.thumbnail);
        setThumbPreview(data.company?.thumbnail);
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
            {thumbPreview ? (
              <Fragment>
                <div className="flex">
                  <CompanyThumb src={thumbPreview} />
                  <button
                    onClick={onRemoveFile}
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
                onChange={onChangeFile}
              />
            )}
            <Input
              {...register('companyThumbnail', {
                setValueAs: (value) => value || null,
              })}
              id="companyThumbnail"
              type="hidden"
            />
            {thumbnailIsLoading && <Loading />}
          </div>
        </Fragment>
      )}
      <div>
        <Button
          type="submit"
          disabled={!isDirty || thumbnailIsLoading}
          className="button button--block button--primary"
        >
          <span>Atualizar</span>
        </Button>
      </div>
    </form>
  );
};

ProfileFormModal.propTypes = {
  data: PropTypes.object,
  isProfessional: PropTypes.bool,
  onSubmit: PropTypes.func,
};

export default ProfileFormModal;
