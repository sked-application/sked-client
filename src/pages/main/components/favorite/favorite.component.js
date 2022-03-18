import React, {
  Fragment,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { AiFillStar } from 'react-icons/ai';
import FavoriteService from '../../../../services/favorite.service';
import { handleError } from '../../../../common/utils/api';
import { MainContext } from '../../contexts/main';
import { AuthContext } from '../../../../common/contexts/auth';

import './favorite.component.scss';

const Favorite = () => {
  const { MAIN_STATE } = useContext(MainContext);
  const { AUTH_STATE } = useContext(AuthContext);
  const [isFavorited, setIsFavorited] = useState(false);
  const [isPending, setIsPending] = useState(true);

  const handleFavorite = (favorite) => {
    try {
      setIsFavorited(favorite);

      if (favorite) {
        FavoriteService.create({
          companyId: MAIN_STATE.accountInfo.id,
        });
        return;
      }

      FavoriteService.remove({
        companyId: MAIN_STATE.accountInfo.id,
      });
    } catch (error) {
      alert(handleError(error));
      setIsFavorited(!isFavorited);
    }
  };

  const getFavorite = useCallback(
    async (companyId) => {
      try {
        if (!AUTH_STATE.isAuthenticated || !companyId) {
          setIsPending(false);
          return false;
        }

        const { data } = await FavoriteService.find({ companyId });

        setIsFavorited(!!data);
        setIsPending(false);
      } catch (error) {
        alert(handleError(error));
        setIsPending(false);
      }
    },
    [AUTH_STATE.isAuthenticated],
  );

  useEffect(() => {
    getFavorite(MAIN_STATE.accountInfo.id);
  }, [MAIN_STATE.accountInfo.id, getFavorite]);

  return (
    <Fragment>
      {AUTH_STATE.isCustomer && (
        <div className={`favorite ${isFavorited ? 'favorite__active' : ''}`}>
          {!isPending && (
            <button
              className="button button--block button--outline m-b-16"
              onClick={() => handleFavorite(!isFavorited)}
              disabled={!AUTH_STATE.isAuthenticated}
            >
              <Fragment>
                <AiFillStar className="favorite__star" />
                {isFavorited ? 'Favoritado' : 'Adicionar aos favoritos'}
              </Fragment>
            </button>
          )}
        </div>
      )}
    </Fragment>
  );
};

export default Favorite;
