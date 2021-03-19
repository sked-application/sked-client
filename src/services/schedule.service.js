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
    return api.get('/schedules', {
		params
	});
};

const findCustomerSchedules = (params) => {
    return api.get('/schedules/customer', {
		params
	});
};

export default {
    create,
	findAll,
	findCustomerSchedules,
	updateStatus,
	updateStatusFromCostumer,
};
