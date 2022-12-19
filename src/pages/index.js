import { useEffect } from 'react';
import { IonApp, setupIonicReact } from '@ionic/react';

import Routes from '../routes';
import { RenderToast } from '../components/Toast';
import { useSelector, useDispatch } from 'react-redux';
import { clearNotificationAction } from '../redux/actions';
// import { Storage, Drivers } from "@ionic/storage";

import '@ionic/react/css/core.css';
import '../boostrap/bootstrap.css';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import '@fancyapps/ui/dist/fancybox.css';

setupIonicReact();

const Pages = () => {
	const reduxDispatch = useDispatch();
	const { storeNotifications, storeAuth } = useSelector((state) => {
		return state;
	});

	useEffect(() => {}, [storeAuth.isLoggedin]);

	return (
		<>
			{storeNotifications && (
				<RenderToast
					message={storeNotifications.message}
					type={storeNotifications.type}
					onDismiss={() => {
						reduxDispatch(clearNotificationAction());
					}}
				/>
			)}
			<IonApp>
				<Routes />
			</IonApp>
		</>
	);
};

export default Pages;
