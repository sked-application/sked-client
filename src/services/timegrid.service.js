import api from '../api/api';

const set = ({ data }) => {
    return api.post('/timegrid', {
        timegrid: data,
    });
};

const findAll = () => {
    return api.get('/timegrid');
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
