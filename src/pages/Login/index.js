import { API } from '../../config/config';
import PageLayout from '../../components/Layout/PageLayout';

import WebAuth from '../../auth/WebAuth';
import FacebookAuth from '../../auth/FacebookAuth';
import GoogleOAuth from '../../auth/GoogleAuth';

const Login = () => {
	return (
		<PageLayout title={API.login.title}>
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
