import React, { useCallback, useContext, useEffect, useState } from 'react';
import { AiOutlineUser } from 'react-icons/ai';
import srcPlaceholder from '../../../../assets/images/user-placeholder.png';
import UserService from '../../../../services/user.service';
import { MainContext } from '../../contexts/main';
import { handleError } from '../../../../api/api.utils';
import { classNames } from '../../../../shared/utils/helper';

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
    <div className="my-4 border divide-solid border-stone-200 rounded-xl px-4 pt-4">
      <div className="mb-2 flex">
        <AiOutlineUser size={20} className="mr-2" />
        <h2 className="text-md font-semibold">Profissional</h2>
      </div>
      <div className="mt-4 pb-4">
        <div className="flex flex-nowrap snap-x snap-mandatory overflow-x-auto overscroll-x-none">
          {Object.values(users).map((item) => (
            <div
              className="snap-start snap-always mr-2 last:mr-0 cursor-pointer"
              key={item.id}
              onClick={() => handleChangeUser(item.id)}
            >
              <div
                className={classNames(
                  'flex items-center border divide-solid rounded-xl py-1 pl-1 pr-2 w-max',
                  item.id === MAIN_STATE.user.id
                    ? 'border-transparent text-white bg-slate-800'
                    : 'border-stone-200',
                )}
              >
                <figure className="mr-2 rounded-lg overflow-hidden h-10 w-10 bg-white border divide-solid border-stone-200">
                  <img src={item.thumbnail || srcPlaceholder} />
                </figure>
                <span className="mt-1">{item.name}</span>
              </div>
            </div>
          ))}
        </div>
        {!MAIN_STATE.user.id && (
          <div className="text-amber-500 mt-2">
            <span>Selecione um profissional.</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScheduleProfessionals;
