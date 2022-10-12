import React, { useState, useEffect, useCallback, Fragment } from 'react';
import { AiOutlineForm } from 'react-icons/ai';
import UserService from '../../services/user.service';
import PageHeader from '../../common/components/page-header';
import { Modal } from '../../common/components/modal';
import { handleError } from '../../common/utils/api';
import { telephoneMask } from '../../common/utils/telephone-mask';
import {
  companyPlanLabels,
  getLeftTrialDays,
} from '../../common/utils/company';
import ProfileForm from '../../common/components/profile-form';
import Loading from '../../common/components/loading';
import CompanyThumb from '../../common/components/company-thumb';

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
      const { user, company } = values;

      await UserService.updateProfile({
        user,
        company,
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

              <ul className="mb-4">
                <li className="mb-1">
                  <span className="font-semibold mr-2">Nome:</span>
                  <span>{profile.name}</span>
                </li>
                <li className="mb-1">
                  <span className="font-semibold mr-2">Email:</span>
                  <span>{profile.email}</span>
                </li>
                <li className="mb-1">
                  <span className="font-semibold mr-2">Meu telefone:</span>
                  <span>
                    {telephoneMask(profile.telephone) || 'Não informado'}
                  </span>
                </li>
                <li className="mb-1">
                  <span className="font-semibold mr-2">Administrador:</span>
                  <span>{profile.role === 'ADMIN' ? 'Sim' : 'Não'}</span>
                </li>
              </ul>

              <div className="mb-2">
                <h2 className="text-md font-semibold">
                  Dados do estabelecimento:
                </h2>
              </div>

              <ul>
                <li className="mb-1">
                  <span className="font-semibold mr-2">Conta:</span>
                  <span>{profile.company.name}</span>
                </li>
                <li className="mb-1">
                  <span className="font-semibold mr-2">Link:</span>
                  <span className="break-all">
                    http://agenda.skedapp.com.br/{profile.company.url}
                  </span>
                </li>
                <li className="mb-1">
                  <span className="font-semibold mr-2">Telefone:</span>
                  <span>
                    {telephoneMask(profile.company.telephone) ||
                      'Não informado'}
                  </span>
                </li>
                <li className="mb-1">
                  <span className="font-semibold mr-2">Endereço:</span>
                  <span>{profile.company.address || 'Não informado'}</span>
                </li>
                <li className="mb-1">
                  <span className="font-semibold mr-2">Plano:</span>
                  <span>
                    {companyPlanLabels(profile.company.plan)}
                    {profile.company.plan === 'TRIAL' && (
                      <span>
                        {` - ${getLeftTrialDays(
                          profile.company.createdAt,
                        )} dia(s) restante(s)`}
                      </span>
                    )}
                  </span>
                </li>
                {profile.company.thumbnail && (
                  <li>
                    <CompanyThumb src={profile.company.thumbnail} />
                  </li>
                )}
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
          isProfessional={true}
          onSubmit={handleSubmitModal}
        />
      </Modal>
    </div>
  );
};

export default Profile;
