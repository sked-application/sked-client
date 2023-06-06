import React, { useState, useEffect, useCallback, Fragment } from 'react';
import UserService from '../../services/user.service';
import PageHeader from '../../shared/components/page-header';
import { Modal } from '../../shared/components/modal';
import { handleError } from '../../api/api.utils';
import { telephoneMask } from '../../shared/utils/telephone-mask';
import ProfileForm from '../../shared/components/profile-form';
import Loading from '../../shared/components/loading';
import { AiOutlineForm } from 'react-icons/ai';

const Profile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState();
  const [toggleShow, setToggleShow] = useState(false);

  const handleCloseModal = () => {
    setToggleShow(false);
  };

  const handleOpenModal = () => {
    setToggleShow(true);
  };

  const handleSubmitModal = async (values) => {
    try {
      const { user } = values;

      await UserService.updateProfile({
        user,
      });

      getProfile();
      handleCloseModal();
      alert('Perfil atualizado com sucesso!');
    } catch (error) {
      alert(handleError(error));
    }
  };

  const getProfile = useCallback(async () => {
    try {
      setIsLoading(true);

      const { data } = await UserService.profile();

      setProfile(data);
      setIsLoading(false);
    } catch (error) {
      alert(handleError(error));
    }
  }, []);

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  return (
    <div className="container mx-auto px-4 max-w-screen-lg flex-1">
      <PageHeader
        title="Perfil"
        description="Gerencie os dados de sua conta."
      />
      {isLoading ? (
        <Loading />
      ) : (
        <Fragment>
          {profile && (
            <div className="mb-4 border divide-solid border-stone-200 rounded-xl p-4">
              <div className="flex justify-between mb-2">
                <h2 className="text-md font-semibold">Meus dados:</h2>
                <AiOutlineForm
                  onClick={() => handleOpenModal(profile)}
                  size={20}
                  className="cursor-pointer"
                />
              </div>
              <ul>
                <li className="mb-1">
                  <span className="font-semibold mr-2">Nome:</span>
                  <span>{profile.name}</span>
                </li>
                <li className="mb-1">
                  <span className="font-semibold mr-2">Meu telefone:</span>
                  <span>
                    {telephoneMask(profile.telephone) || 'Não informado'}
                  </span>
                </li>
              </ul>
            </div>
          )}
        </Fragment>
      )}

      <Modal
        isOpen={toggleShow}
        handleClose={handleCloseModal}
        title="Editar perfil"
      >
        <ProfileForm
          data={profile}
          isProfessional={false}
          onSubmit={handleSubmitModal}
        />
      </Modal>
    </div>
  );
};

export default Profile;
