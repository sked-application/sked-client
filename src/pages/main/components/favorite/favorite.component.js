import React, {
  Fragment,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import FavoriteService from '../../../../services/favorite.service';
import { handleError } from '../../../../common/utils/api';
import { MainContext } from '../../contexts/main';
import { AuthContext } from '../../../../common/contexts/auth';

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
        <div className="flex">
          {!isPending && (
            <a
              className="mb-4 cursor-pointer"
              onClick={() => handleFavorite(!isFavorited)}
              disabled={!AUTH_STATE.isAuthenticated}
            >
              {isFavorited ? (
                <span className="flex">
                  <AiFillHeart size={20} className="mr-1" />
                  <span className="font-semibold">Favoritado</span>
                </span>
              ) : (
                <span className="flex">
                  <AiOutlineHeart size={20} className="mr-1" />
                  <span className="font-semibold">Adicionar aos favoritos</span>
                </span>
              )}
            </a>
          )}
        </div>
      )}
    </Fragment>
  );
};

export default Favorite;
