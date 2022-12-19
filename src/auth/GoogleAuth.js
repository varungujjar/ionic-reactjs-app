import { useIonLoading, IonButton, IonIcon } from '@ionic/react';
import { logoGoogle } from 'ionicons/icons';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';

const GoogleOAuth = () => {
	const [showLoader, hideLoader] = useIonLoading();
	GoogleAuth.initialize();

	const doLogin = () => {
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
				console.log(socialData);
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
