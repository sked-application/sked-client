import React, { useCallback, useContext, useEffect, useState } from 'react';
import { AiOutlineCarryOut } from 'react-icons/ai';
import ServiveService from '../../../../services/service.service';
import { MainContext } from '../../contexts/main';
import { handleError } from '../../../../api/api.utils';

const ScheduleServices = () => {
  const { MAIN_STATE, MAIN_DISPATCH, MAIN_ACTIONS } = useContext(MainContext);
  const [services, setServices] = useState({});

  const handleChangeService = (value) => {
    MAIN_DISPATCH({
      type: MAIN_ACTIONS.SET_SERVICE,
      value: services[value] || {},
    });
  };

  const listServices = useCallback(async () => {
    try {
      if (!MAIN_STATE.accountInfo.id || !MAIN_STATE.user.id) return;

      const { data } = await ServiveService.findAllByCompanyId({
        companyId: MAIN_STATE.accountInfo.id,
        userId: MAIN_STATE.user.id,
      });

      setServices(data);
    } catch (error) {
      alert(handleError(error));
    }
  }, [MAIN_STATE.accountInfo.id, MAIN_STATE.user.id]);

  useEffect(() => {
    listServices();
  }, [listServices]);

  return (
    <div className="my-4 border divide-solid border-stone-200 rounded-xl p-4">
      <div className="mb-2 flex">
        <AiOutlineCarryOut size={20} className="mr-2" />
        <h2 className="text-md font-semibold">Serviço</h2>
      </div>
      <div>
        <select
          value={MAIN_STATE.service.id || ''}
          onChange={(event) => handleChangeService(event.target.value)}
          className="select"
        >
          <option>Selecione</option>
          {Object.values(services).map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>

        {!MAIN_STATE.service.id && (
          <div className="text-amber-500 mt-2">
            <span>Selecione um serviço.</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScheduleServices;
