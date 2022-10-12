import React, { useCallback, useContext, useEffect, useState } from 'react';
import { AiOutlineUser } from 'react-icons/ai';
import UserService from '../../../../services/user.service';
import { MainContext } from '../../contexts/main';
import { handleError } from '../../../../common/utils/api';

const ScheduleProfessionals = () => {
  const { MAIN_STATE, MAIN_DISPATCH, MAIN_ACTIONS } = useContext(MainContext);
  const [users, setUsers] = useState({});

  const handleChangeUser = (userId) => {
    MAIN_DISPATCH({
      type: MAIN_ACTIONS.SET_USER,
      value: users[userId] || {},
    });

    MAIN_DISPATCH({
      type: MAIN_ACTIONS.SET_SERVICE,
      value: {},
    });
  };

  const listUsers = useCallback(async () => {
    try {
      if (!MAIN_STATE.accountInfo.id) return;

      const { data } = await UserService.findAllByCompanyId({
        companyId: MAIN_STATE.accountInfo.id,
      });

      const userValues = Object.values(data);

      if (userValues.length === 1) {
        MAIN_DISPATCH({
          type: MAIN_ACTIONS.SET_USER,
          value: userValues[0] || {},
        });
      }

      setUsers(data);
    } catch (error) {
      alert(handleError(error));
    }
  }, [MAIN_STATE.accountInfo.id, MAIN_DISPATCH, MAIN_ACTIONS.SET_USER]);

  useEffect(() => {
    listUsers();
  }, [listUsers]);

  return (
    <div className="my-4 border divide-solid border-stone-200 rounded-xl p-4">
      <div className="mb-2 flex">
        <AiOutlineUser size={20} className="mr-2" />
        <h2 className="text-md font-semibold">Profissional</h2>
      </div>
      <div>
        <select
          value={MAIN_STATE.user.id || ''}
          onChange={(event) => handleChangeUser(event.target.value)}
          className="select"
        >
          <option>Selecione</option>
          {Object.values(users).map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default ScheduleProfessionals;
