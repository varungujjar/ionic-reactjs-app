import { useIonLoading, IonButton, IonIcon } from '@ionic/react';
import { logoFacebook } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import { FacebookLogin } from '@capacitor-community/facebook-login';

const FacebookAuth = () => {
	let history = useHistory();
	const [showLoader, hideLoader] = useIonLoading();

	const doLogin = () => {
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
				console.log(socialData);
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
