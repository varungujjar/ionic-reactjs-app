import { useEffect } from 'react';
import { IonApp, setupIonicReact } from '@ionic/react';

import Routes from '../routes';
import { useToast } from '../hooks/useToast';
import { useSelector } from 'react-redux';
// import { Storage, Drivers } from "@ionic/storage";

import '@ionic/react/css/core.css';
import '../boostrap/bootstrap.css';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import '@fancyapps/ui/dist/fancybox.css';

setupIonicReact();

const Pages = () => {
	const [setToast] = useToast();
	const { storeNotifications } = useSelector((state) => {
		return state;
	});

	useEffect(() => {
		setToast(storeNotifications);
	}, [storeNotifications]);

	return (
		<IonApp>
			<Routes />
		</IonApp>
	);
};

export default Pages;
