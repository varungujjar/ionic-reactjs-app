import { config } from '../config/config';
import PageLayout from '../components/PageLayout';

import WebAuth from './WebAuth';
import FacebookAuth from './FacebookAuth';
import GoogleOAuth from './GoogleAuth';

const Login = () => {
	return (
		<PageLayout title={config.login.name}>
			<div className="login-container center-container">
				<p className="mb-2 mt-5 text-muted">
					To view or manage your profile <br></br>you will need to login.
				</p>
				<div className="social-login">
					<FacebookAuth />
					<GoogleOAuth />
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
