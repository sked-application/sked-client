import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import FavoriteService from '../../modules/favorite/favorite.services';
import PageHeader from '../../shared/components/page-header';
import { handleError } from '../../api/api.utils';
import { telephoneMask } from '../../shared/utils/telephone-mask';
import Loading from '../../shared/components/loading';

const Favorites = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [favorites, setFavorites] = useState([]);

  const listFavorites = async () => {
    try {
      setIsLoading(true);

      const { data } = await FavoriteService.findAll();

      setFavorites(data);
      setIsLoading(false);
    } catch (error) {
      alert(handleError(error));
      setIsLoading(false);
    }
  };

  useEffect(() => {
    listFavorites();
  }, []);

  return (
    <div className="container mx-auto px-4 max-w-screen-lg flex-1">
      <PageHeader
        title="Favoritos"
        description="Lista de estabelecimentos favoritos."
      />
      {isLoading ? (
        <Loading />
      ) : (
        <Fragment>
          {favorites.map((item) => (
            <div
              key={item.id}
              className="mb-4 border divide-solid border-stone-200 rounded-xl p-4"
            >
              <div className="mb-4 flex justify-between">
                <h2 className="font-semibold">{item.company.name}</h2>
                <Link
                  to={`/${item.company.url}`}
                  className="font-weight cursor-pointer"
                >
                  <strong>Ver agenda</strong>
                </Link>
              </div>
              <ul>
                <li className="mb-1">
                  <span className="font-semibold mr-2">Endereço:</span>
                  <span>{item.company.address || 'Não informado'}</span>
                </li>
                <li>
                  <span className="font-semibold mr-2">Telefone:</span>
                  <span>
                    {telephoneMask(item.company.telephone) || 'Não informado'}
                  </span>
                </li>
              </ul>
            </div>
          ))}
          {!favorites.length && (
            <div className="text-center">
              <span>
                Você ainda não adicionou nenhum estabelecimento aos favoritos.
              </span>
            </div>
          )}
        </Fragment>
      )}
    </div>
  );
};

export default Favorites;
