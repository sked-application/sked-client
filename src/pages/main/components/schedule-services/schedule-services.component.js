import React, { useCallback, useContext, useEffect, useState } from 'react';
import { AiOutlineCarryOut } from 'react-icons/ai';
import ServiveService from '../../../../services/service.service';
import { MainContext } from '../../contexts/main';
import { handleError } from '../../../../common/utils/api';

const ScheduleServices = () => {
  const [mainState, mainDispatch, mainActions] = useContext(MainContext);
  const [services, setServices] = useState({});

  const handleChangeService = (value) => {
    mainDispatch({
      type: mainActions.SET_SERVICE,
      value: services[value] || {},
    });
  };

  const listServices = useCallback(async () => {
    try {
      if (!mainState.accountInfo.id || !mainState.user.id) return;

      const { data } = await ServiveService.findAllByCompanyId({
        companyId: mainState.accountInfo.id,
        userId: mainState.user.id,
      });

      setServices(data);
    } catch (error) {
      alert(handleError(error));
    }
  }, [mainState.accountInfo.id, mainState.user.id]);

  useEffect(() => {
    listServices();
  }, [listServices]);

  return (
    <div className="card card--service card--outline">
      <div className="card__header">
        <h2 className="card__title">
          <AiOutlineCarryOut /> Serviço
        </h2>
      </div>
      <div className="m-t-5">
        <select
          value={mainState.service.id || ''}
          onChange={(event) => handleChangeService(event.target.value)}
          className="select select--dark"
        >
          <option>Selecione</option>
          {Object.values(services).map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default ScheduleServices;
