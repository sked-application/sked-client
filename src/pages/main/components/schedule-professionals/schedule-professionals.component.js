import React, { useCallback, useContext, useEffect, useState } from 'react';
import { AiOutlineUser } from 'react-icons/ai';
import UserService from '../../../../services/user.service';
import { MainContext } from '../../contexts/main';
import { handleError } from '../../../../common/utils/api';

const ScheduleProfessionals = () => {
  const { setUser, user, accountInfo, setService } = useContext(MainContext);
  const [users, setUsers] = useState({});

  const handleChangeUser = (userId) => {
    setUser(users[userId] || {});
    setService({});
  };

  const listUsers = useCallback(async () => {
    try {
      if (!accountInfo.id) return;

      const { data } = await UserService.findAllByCompanyId({
        companyId: accountInfo.id,
      });

      const userValues = Object.values(data);

      if (userValues.length === 1) {
        setUser(userValues[0]);
      }

      setUsers(data);
    } catch (error) {
      alert(handleError(error));
    }
  }, [accountInfo, setUser]);

  useEffect(() => {
    listUsers();
  }, [listUsers]);

  return (
    <div className="card card--professional card--outline">
      <div className="card__header">
        <h2 className="card__title">
          <AiOutlineUser /> Profissional
        </h2>
      </div>
      <div className="m-t-5">
        <select
          value={user.id || ''}
          onChange={(event) => handleChangeUser(event.target.value)}
          className="select select--dark"
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