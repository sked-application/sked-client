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
  const { accountInfo } = useContext(MainContext);
  const [isFavorited, setIsFavorited] = useState(false);
  const [isPending, setIsPending] = useState(true);
  const AUTH = useContext(AuthContext);

  const handleFavorite = async (favorite) => {
    try {
      setIsFavorited(favorite);

      if (favorite) {
        await FavoriteService.create({
          companyId: accountInfo.id,
        });
        return;
      }

      await FavoriteService.remove({
        companyId: accountInfo.id,
      });
    } catch (error) {
      alert(handleError(error));
      setIsFavorited(!isFavorited);
    }
  };

  const getFavorite = useCallback(
    async (companyId) => {
      try {
        if (!AUTH.isAuthenticated || !companyId) {
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
    [AUTH.isAuthenticated],
  );

  useEffect(() => {
    getFavorite(accountInfo.id);
  }, [accountInfo.id, getFavorite]);

  return (
    <Fragment>
      {AUTH.isCustomer && (
        <div className={`favorite ${isFavorited ? 'favorite__active' : ''}`}>
          {!isPending && (
            <button
              className="button button--block button--outline m-b-16"
              onClick={() => handleFavorite(!isFavorited)}
              disabled={!AUTH.isAuthenticated}
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
