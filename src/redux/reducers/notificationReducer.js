import { config } from '../../config/config';

const notificationReducer = (state = null, action) => {
	switch (action.type) {
		case config.showNotification:
			return { ...action.payload };
		case config.clearNotification:
			console.log(action.payload);
			return { ...action.payload };
		default:
			return state;
	}
};

export default notificationReducer;
