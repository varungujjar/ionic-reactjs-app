import { config } from '../../config/config';
import api from '../../config/axios';

export const showNotificationAction = (messageObject) => {
	console.log(messageObject);
	return {
		type: config.showNotification,
		payload: messageObject,
	};
};

export const clearNotificationAction = () => {
	return {
		type: config.clearNotification,
		payload: { message: '', type: '' },
	};
};

export const logoutAction = () => {
	return (dispatch) => {
		dispatch({
			type: config.showNotification,
			payload: { message: 'Logged out successfully.', type: 'success' },
		});

		dispatch({
			type: 'AUTH_LOGOUT',
		});
	};
};

export const loginAction = (sessionObject = {}) => {
	return (dispatch) => {
		if (sessionObject.name) {
			dispatch({
				type: config.showNotification,
				payload: { message: `Welcome back ${sessionObject.name}`, type: 'success' },
			});
		}
		dispatch({
			type: 'AUTH_LOGIN',
			payload: sessionObject,
		});
	};
};

export const refreshSessionAction = (sessionObject = {}) => {
	return async (dispatch) => {
		await api.get(null, { params: { type: 'session', session: sessionObject.session, uid: sessionObject.id } }).then((response) => {
			if (response.data.data && response.data.data.session) {
				console.log(response.data.data);
				dispatch({
					type: 'AUTH_REFRESH',
					payload: response.data.data,
				});
			} else {
				// logoutAction();
				dispatch({
					type: 'AUTH_LOGOUT',
				});
			}
		});
	};
};
