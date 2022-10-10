import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import FavoriteService from '../../services/favorite.service';
import PageHeader from '../../common/components/page-header';
import { handleError } from '../../common/utils/api';
import { telephoneMask } from '../../common/utils/telephone-mask';
import Loading from '../../common/components/loading';

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
                <h2 className="text-sm font-semibold">{item.company.name}</h2>
                <Link
                  to={`/${item.company.url}`}
                  className="text-sm font-weight cursor-pointer"
                >
                  <strong>Ver agenda</strong>
                </Link>
              </div>
              <ul>
                <li className="text-sm mb-1">
                  <span className="font-semibold mr-2">Endereço:</span>
                  <span>{item.company.address || 'Não informado'}</span>
                </li>
                <li className="text-sm">
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
              <span className="text-sm">
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
