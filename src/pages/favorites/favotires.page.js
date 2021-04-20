import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import FavoriteService from '../../services/favorite.service';
import PageHeader from '../../common/components/page-header';
import { handleError } from '../../common/utils/api';
import { telephoneMask } from '../../common/utils/telephone-mask';

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
    <div className="container">
      <PageHeader
        title="Favoritos"
        description="Lista de estabelecimentos favoritos."
      />
      {isLoading ? (
        <div className="loading"></div>
      ) : (
        <Fragment>
          {favorites.map((item) => (
            <div key={item.id} className="card card--outline">
              <div className="card__header">
                <h2 className="card__title m-r-16">{item.company.name}</h2>
                <Link
                  to={`/${item.company.url}`}
                  className="card__subtitle color--purple cursor--pointer"
                >
                  <strong>Ver agenda</strong>
                </Link>
              </div>
              <div className="card__content flexbox flexbox--end flexbox__justify--between">
                <div>
                  <div>
                    <strong>Endereço: </strong>
                    {item.company.address || 'Não informado'}
                  </div>
                  <div className="m-t-10">
                    <strong>Telefone: </strong>
                    {telephoneMask(item.company.telephone) || 'Não informado'}
                  </div>
                </div>
              </div>
            </div>
          ))}
          {!favorites.length && (
            <div className="text--center">
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
