import React, { useEffect, useState } from 'react';
import TimegridForm from '../../shared/components/timegrid-form';
import PageHeader from '../../shared/components/page-header';
import timegridService from '../../services/timegrid.service';
import { handleError } from '../../api/api.utils';
import Loading from '../../shared/components/loading';

const initialTimegrid = {
  0: [],
  1: [],
  2: [],
  3: [],
  4: [],
  5: [],
  6: [],
};

const Timegrid = () => {
  const [timegrid, setTimegrid] = useState(initialTimegrid);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingOnSubmit, setIsLoadingOnSubmit] = useState(false);

  const listTimegrid = async () => {
    try {
      setIsLoading(true);
      const { data } = await timegridService.findAll();

      setTimegrid(data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      alert(handleError(error));
    }
  };

  const handleOnSubmit = async (values) => {
    try {
      setIsLoadingOnSubmit(true);
      await timegridService.set(values);
      alert('Horários atualizados com sucesso!');
      listTimegrid();
      setIsLoadingOnSubmit(false);
    } catch (error) {
      setIsLoadingOnSubmit(false);
      alert(handleError(error));
    }
  };

  useEffect(() => {
    listTimegrid();
  }, []);

  return (
    <div className="container mx-auto px-4 max-w-screen-lg flex-1">
      <PageHeader
        title="Meus horários"
        description="Informe para nós quando você costuma estar disponível para realizar atendimentos."
      />
      {isLoading ? (
        <Loading />
      ) : (
        <TimegridForm
          timegrid={timegrid}
          handleOnSubmit={handleOnSubmit}
          submitButtonText="Salvar"
          handleOnCancel={() => listTimegrid()}
          cancelButtonText="Cancelar"
          isLoading={isLoadingOnSubmit}
        />
      )}
    </div>
  );
};

export default Timegrid;
