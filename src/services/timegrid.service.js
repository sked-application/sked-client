import api from '../api';

const set = ({ data }) => {
  return api.post('v1/timegrids', {
    timeGrids: data,
  });
};

const findAll = () => {
  return api.get('v1/timegrids');
};

const findSlots = (params) => {
  return api.get('v1/timegrids/slots', {
    params,
  });
};

export default {
  set,
  findAll,
  findSlots,
};
