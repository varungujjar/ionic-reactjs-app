import { useEffect } from 'react';
import { useIonLoading, IonButton, IonIcon } from '@ionic/react';
import { logoGoogle } from 'ionicons/icons';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginAction } from '../redux/actions';
import { setToast } from '../components/Toast';
import api from '../config/axios';

const GoogleOAuth = () => {
	let history = useHistory();
	const reduxDispatch = useDispatch();
	const { storeAuth } = useSelector((state) => {
		return state;
	});
	const [showLoader, hideLoader] = useIonLoading();
	GoogleAuth.initialize();

	useEffect(() => {
		if (storeAuth.isLoggedin) {
			history.push('/page/profile');
		}
	}, [storeAuth.isLoggedin]);

	const doLogin = () => {
		const submitData = async (socialData) =>
			await api
				.get(null, {
					params: {
						...socialData,
					},
				})
				.then((response) => {
					setToast(reduxDispatch, response.data);
					if (response.data.data && response.data.data.session) {
						reduxDispatch(loginAction(response.data.data));
					}
				})
				.catch((error) => {
					console.log(error);
					setToast(reduxDispatch, {
						message: error.toJSON().message,
						type: 'danger',
					});
				});

		const initAuth = async () => {
			let socialData = {};
			const response = await GoogleAuth.signIn();
			if (response) {
				socialData['type'] = 'social';
				socialData['platform'] = 'google';
				socialData['token'] = JSON.stringify(response.authentication);
				socialData['name'] = response.name;
				socialData['email'] = response.email;
				socialData['id'] = response.id;
				socialData['image'] = response.imageUrl;
				submitData(socialData);
			}
		};
		initAuth();
	};

	return (
		<IonButton onClick={doLogin}>
			<IonIcon icon={logoGoogle}></IonIcon>
		</IonButton>
	);
};

export default GoogleOAuth;
