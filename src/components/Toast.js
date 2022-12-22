import { useEffect, useState } from 'react';
import { useIonToast } from '@ionic/react';
import { closeCircle } from 'ionicons/icons';
import { showNotificationAction, clearNotificationAction } from '../redux/actions';
import { useSelector, useDispatch } from 'react-redux';

//Function to decode the messages from the API and dispatching to Context
export const setToast = (reduxDispatch, data) => {
	const dispatchToastMessages = (message, type) => {
		reduxDispatch(showNotificationAction({ message: message, type: type }));
	};

	if (data.message) {
		dispatchToastMessages(data.message, data.type ? data.type : 'warning');
	}

	if (data.messages) {
		for (const [key, value] of Object.entries(data.messages)) {
			value.forEach((message) => {
				dispatchToastMessages(message, key);
			});
		}
	}
};

//Renders the Toast
export const RenderToast = ({ message, type }) => {
	const [present] = useIonToast();
	const reduxDispatch = useDispatch();
	const [thisMessage, setThisMessage] = useState(message);

	const onDismiss = () => {
		// reduxDispatch(clearNotificationAction());
	};

	useEffect(() => {
		present({
			duration: 3000,
			position: 'bottom',
			color: type,
			showCloseButton: true,
			//   icon: "",
			onDidDismiss: () => {
				setThisMessage('');
			},
			htmlAttributes: '',
			// header: "Header",
			message: thisMessage,
			buttons: [
				{
					side: 'end', // start
					icon: closeCircle,
					// text: "Close",
					role: 'cancel',
					handler: onDismiss,
				},
			],
		});
	}, [thisMessage]);
};

RenderToast.defaultProps = {
	type: 'primary',
	message: 'Notification Message',
};
