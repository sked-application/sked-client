import api from '../../api';
import {
  IFavorite,
  IFavoriteCreateParams,
  IFavoriteFindParams,
  IFavoriteRemoveParams,
} from './favorite.interfaces';

const create = (data: IFavoriteCreateParams): Promise<{ data: string }> => {
  return api.post('v1/favorites', data);
};

const remove = (data: IFavoriteRemoveParams): Promise<{ data: string }> => {
  return api.delete(`v1/favorites/${data.companyId}`);
};

const find = (data: IFavoriteFindParams): Promise<IFavorite> => {
  return api.get(`v1/favorites/${data.companyId}`);
};

const findAll = (): Promise<IFavorite[]> => {
  return api.get('v1/favorites');
};

export default {
  create,
  remove,
  findAll,
  find,
};
