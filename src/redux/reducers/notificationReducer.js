import { REDUX_ACTIONS } from '../../config/config';

const notificationReducer = (state = null, action) => {
	switch (action.type) {
		case REDUX_ACTIONS.showNotification:
			return { ...action.payload };
		case REDUX_ACTIONS.clearNotification:
			console.log(action.payload);
			return { ...action.payload };
		default:
			return state;
	}
};

export default notificationReducer;
