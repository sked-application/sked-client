import api from '../api/api';

const create = (data) => {
    return api.post('/schedules', data);
};

const updateStatus = ({ id, status }) => {
    return api.put(`/schedules/status/${id}`, {
		status
	});
};

const updateStatusFromCostumer = ({ id, status }) => {
    return api.put(`/customer-schedules/status/${id}`, {
		status
	});
};

const findAll = (params) => {
    return api.get('/schedules', {
		params
	});
};

const findCustomerSchedules = (params) => {
    return api.get('/customer-schedules', {
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
