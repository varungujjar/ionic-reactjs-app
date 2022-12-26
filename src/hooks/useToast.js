import { useEffect, useState } from 'react';
import { useIonToast } from '@ionic/react';
import { closeCircle } from 'ionicons/icons';
// import { useDispatch } from 'react-redux';
// import { clearNotificationAction } from '../redux/actions';

export const useToast = () => {
	const [message, setMessage] = useState();
	const [present] = useIonToast();
	// const reduxDispatch = useDispatch();

	const dispatchToastMessages = (message, type) => {
		setMessage({ message: message, type: type });
	};

	//Decode message cominng from API
	const setToast = (messageObject) => {
		// console.log(messageObject);
		if (messageObject) {
			if (messageObject.message) {
				dispatchToastMessages(messageObject.message, messageObject.type ? messageObject.type : 'warning');
			}

			if (messageObject.messages) {
				for (const [key, value] of Object.entries(messageObject.messages)) {
					value.forEach((message) => {
						dispatchToastMessages(message, key);
					});
				}
			}
		}
	};

	const onDismiss = () => {
		// reduxDispatch(clearNotificationAction());
	};

	useEffect(() => {
		const initToast = () => {
			present({
				duration: 3000,
				position: 'bottom',
				color: message.type,
				showCloseButton: true,
				//   icon: "",
				onDidDismiss: onDismiss,
				htmlAttributes: '',
				// header: "Header",
				message: message.message,
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
		};

		message && initToast();
	}, [message, present]);

	return [setToast];
};
