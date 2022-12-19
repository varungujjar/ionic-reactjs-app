import { useEffect, useState } from 'react';
import { useIonLoading, IonButton, IonIcon } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { SetSession, AuthSocial } from '../../auth/Auth';
import { logoFacebook, logoGoogle } from 'ionicons/icons';
import { LoaderOptions } from '../../helpers/Util';
import { config } from '../../config/config';

import PageLayout from '../../components/PageLayout';
import WebAuth from '../../auth/WebAuth';

import { FacebookLogin, FacebookLoginResponse } from '@capacitor-community/facebook-login';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';

const Login = () => {
	let history = useHistory();
	const [showLoader, hideLoader] = useIonLoading();
	const [jsonme, setJsonme] = useState('');
	const [facebookSession, setFacebookSession] = useState(false);

	GoogleAuth.initialize();

	const socialLogin = async (platform) => {
		const doAuthSocial = (socialData) => {
			showLoader(LoaderOptions);
			AuthSocial(socialData, (apiResponse) => {
				hideLoader();
				if (apiResponse.message) {
				}

				if (apiResponse.messages) {
					for (const [key, value] of Object.entries(apiResponse.messages)) {
						value.forEach((message) => {
							// presentToast(message, key);
						});
					}
				}

				if (apiResponse.success == true && apiResponse.data) {
					// SetSession(authGlobalContext, apiResponse.data); //authGlobalContext is important or else it wont work
					history.push('/page/profile');
				}
			});
		};

		let socialData = {};

		if (platform == 'facebook') {
			const FACEBOOK_PERMISSIONS = ['public_profile', 'email'];
			const _response = await FacebookLogin.login({
				permissions: FACEBOOK_PERMISSIONS,
			});
			if (_response.accessToken) {
				setFacebookSession(_response.accessToken);
				const response = await FacebookLogin.getProfile({
					fields: ['email', 'name', 'picture'],
				});
				socialData['type'] = 'social';
				socialData['platform'] = platform;
				socialData['token'] = JSON.stringify(_response.accessToken);
				socialData['name'] = response.name;
				socialData['email'] = response.email;
				socialData['id'] = response.id;
				socialData['image'] = `http://graph.facebook.com/${response.id}/picture?type=large`;
				doAuthSocial(socialData);
			}
		}

		if (platform == 'google') {
			const response = await GoogleAuth.signIn();
			if (response) {
				socialData['type'] = 'social';
				socialData['platform'] = platform;
				socialData['token'] = JSON.stringify(response.authentication);
				socialData['name'] = response.name;
				socialData['email'] = response.email;
				socialData['id'] = response.id;
				socialData['image'] = response.imageUrl;
				doAuthSocial(socialData);
			}
		}
	};

	useEffect(() => {}, []);

	return (
		<PageLayout title={config.login.name}>
			<div className="login-container center-container">
				<h2 className="mt-3">Login</h2>
				<p className="mb-2 text-muted">
					To view or manage your profile <br></br>you will need to login.
					{JSON.stringify(jsonme)}
				</p>
				<img src={jsonme.picture ? jsonme.picture.data.url : ''} />
				<div className="social-login">
					<IonButton
						onClick={() => {
							socialLogin('facebook');
						}}
					>
						<IonIcon icon={logoFacebook}></IonIcon>
					</IonButton>
					<IonButton
						onClick={() => {
							socialLogin('google');
						}}
					>
						<IonIcon icon={logoGoogle}></IonIcon>
					</IonButton>

					<div className="subtitle fancy">
						<span>Or</span>
					</div>

					<WebAuth />
				</div>
			</div>
		</PageLayout>
	);
};

export default Login;
