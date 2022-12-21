import { useEffect } from 'react';
import { useIonLoading, IonButton, IonIcon } from '@ionic/react';
import { logoFacebook } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import { FacebookLogin } from '@capacitor-community/facebook-login';
import { useDispatch, useSelector } from 'react-redux';
import { loginAction } from '../redux/actions';
import { setToast } from '../components/Toast';
import api from '../config/axios';

const FacebookAuth = () => {
	let history = useHistory();
	const [showLoader, hideLoader] = useIonLoading();
	const reduxDispatch = useDispatch();
	const { storeAuth } = useSelector((state) => {
		return state;
	});

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
			await FacebookLogin.initialize({ appId: '730915411432768' });
			let socialData = {};
			const FACEBOOK_PERMISSIONS = ['public_profile', 'email'];
			const _response = await FacebookLogin.login({
				permissions: FACEBOOK_PERMISSIONS,
			});
			if (_response.accessToken) {
				const response = await FacebookLogin.getProfile({
					fields: ['email', 'name', 'picture'],
				});
				socialData['type'] = 'social';
				socialData['platform'] = 'facebook';
				socialData['token'] = JSON.stringify(_response.accessToken);
				socialData['name'] = response.name;
				socialData['email'] = response.email;
				socialData['id'] = response.id;
				socialData['image'] = `http://graph.facebook.com/${response.id}/picture?type=large`;
				submitData(socialData);
			}
		};
		initAuth();
	};

	return (
		<IonButton onClick={doLogin}>
			<IonIcon icon={logoFacebook}></IonIcon>
		</IonButton>
	);
};

export default FacebookAuth;
