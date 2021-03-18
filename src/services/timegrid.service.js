import api from '../api/api';

const set = ({ data }) => {
    return api.post('v1/timegrids', {
        timeGrids: data,
    });
};

const findAll = () => {
    return api.get('v1/timegrids');
};

const findByDay = (params) => {
    return api.get('/timegrid/by-day', {
        params,
    });
};

export default {
    set,
    findAll,
    findByDay,
};
