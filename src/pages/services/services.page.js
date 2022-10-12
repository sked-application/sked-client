import React, { useState, useEffect, Fragment } from 'react';
import { AiOutlineDelete, AiOutlineForm, AiOutlinePlus } from 'react-icons/ai';
import ServiceService from '../../services/service.service';
import PageHeader from '../../common/components/page-header';
import { handleError } from '../../common/utils/api';
import ServiceFormModal from '../../common/components/modal-service-form';
import { Modal } from '../../common/components/modal';
import Button from '../../common/components/button';
import Loading from '../../common/components/loading';
import { getFormattedPrice } from '../../common/utils/price';

const Services = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [services, setServices] = useState([]);
  const [toggleShow, setToggleShow] = useState(false);
  const [formData, setFormData] = useState(null);

  const removeService = async (id) => {
    try {
      const alertQuestion = 'Deseja remover esse serviço?';

      if (window.confirm(alertQuestion)) {
        await ServiceService.remove(id);

        listServices();
      }
    } catch (error) {
      alert(handleError(error));
    }
  };

  const handleOpenModal = (data) => {
    setFormData(data);
    setToggleShow(true);
  };

  const handleCloseModal = () => setToggleShow(false);

  const handleSubmitModal = async (values) => {
    setToggleShow(false);

    try {
      const { id, name, duration, price, showPrice } = values;
      let message;

      if (id) {
        await ServiceService.update(id, {
          name,
          price,
          duration,
          showPrice,
        });

        message = 'Serviço atualizado com sucesso!';
      } else {
        await ServiceService.create({
          name,
          price,
          duration,
          showPrice,
        });

        message = 'Serviço cadastrado com sucesso!';
      }

      alert(message);
    } catch (error) {
      alert(handleError(error));
    }

    listServices();
  };

  const listServices = async () => {
    try {
      setIsLoading(true);

      const { data } = await ServiceService.findAll();

      setServices(data);
      setIsLoading(false);
    } catch (error) {
      alert(handleError(error));
    }
  };

  useEffect(() => {
    listServices();
  }, []);

  return (
    <div className="container mx-auto px-4 max-w-screen-lg flex-1">
      <PageHeader
        title="Serviços"
        description="Adicione e gerencie seus serviços para que as pessoas possam agendar com você"
      />
      {isLoading ? (
        <Loading />
      ) : (
        <Fragment>
          <Button
            type="button"
            onClick={() => handleOpenModal()}
            className="button button--block button--primary mb-4"
          >
            <div className="flex items-center justify-center">
              <AiOutlinePlus size={18} className="mr-2" />
              <span>Adicionar novo serviço</span>
            </div>
          </Button>
          {services.map((item) => (
            <div
              key={item.id}
              className="mb-4 border divide-solid border-stone-200 rounded-xl p-4"
            >
              <div className="flex justify-between">
                <h2 className="font-semibold">{item.name}</h2>
                <AiOutlineForm
                  onClick={() => handleOpenModal(item)}
                  size={18}
                  className="cursor-pointer"
                />
              </div>
              <div className="flex items-end justify-between mt-4">
                <ul>
                  <li className="mb-1">
                    <span className="font-semibold mr-2">Duração:</span>
                    <span>{item.duration} minutos</span>
                  </li>
                  <li>
                    <span className="font-semibold mr-2">Preço:</span>
                    <span>{getFormattedPrice(item.price, 'R$')}</span>
                  </li>
                </ul>
                <div className="flex">
                  <AiOutlineDelete
                    onClick={() => removeService(item.id)}
                    size={18}
                    className="cursor-pointer"
                  />
                </div>
              </div>
            </div>
          ))}
          {!services.length && (
            <div className="text-center mt-4">
              <span>Clique no botão acima e adicione seus serviços.</span>
            </div>
          )}
        </Fragment>
      )}

      <Modal
        isOpen={toggleShow}
        handleClose={handleCloseModal}
        title={formData ? 'Adicionar serviço' : 'Editar serviço'}
      >
        <ServiceFormModal data={formData} onSubmit={handleSubmitModal} />
      </Modal>
    </div>
  );
};

export default Services;
