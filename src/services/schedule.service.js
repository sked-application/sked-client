import api from '../api/api';

const create = (data) => {
    return api.post('v1/schedules', data);
};

const updateStatus = ({ id, status }) => {
    return api.put(`/schedules/status/${id}`, {
		status
	});
};

const updateStatusFromCostumer = ({ id, status }) => {
    return api.put(`/schedules/customer/status/${id}`, {
		status
	});
};

const findAll = (params) => {
    return api.get('v1/schedules', {
		params
	});
};

export default {
    create,
	findAll,
	updateStatus,
	updateStatusFromCostumer,
};
