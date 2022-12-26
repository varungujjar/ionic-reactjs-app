import { useHistory } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useIonToast, IonButton, IonInput, IonItem } from '@ionic/react';

import { API } from '../../config/config';
import { ApiAuth } from '../../helpers/Api';
import PageLayout from '../../components/Layout/PageLayout';

const Register = () => {
	let history = useHistory();
	const [present] = useIonToast();

	const presentToast = (message, type = null) => {
		present({
			message: message,
			duration: 2000,
			position: 'bottom',
			color: type ? type : 'primary',
		});
	};

	const onSubmit = (data) => {
		ApiAuth('register', data, (resultData) => {
			if (resultData['message']) {
				console.log(resultData);
				presentToast(resultData['message']);
			}

			if (resultData['messages']) {
				for (const [key, value] of Object.entries(resultData['messages'])) {
					value.forEach((message) => {
						presentToast(message, key);
					});
				}
			}

			if (resultData['success']) {
				history.push('/page/home');
			}
		});
	};

	const {
		control,
		// register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			username: '',
			name: '',
			email: '',
			password: '',
		},
		mode: 'onChange',
		reValidateMode: 'onChange',
	});

	return (
		<PageLayout title={API.register.title}>
			<div className="login-container center-container">
				<div className="logo">
					<img src="./assets/images/about-weare.png" alt="logo" />
				</div>
				<h2>Create an Account</h2>
				<p className="mb-2 text-muted">
					To view or manage your profile <br></br>you will need to create an account.
				</p>
				<form onSubmit={handleSubmit(onSubmit)}>
					<IonItem>
						<Controller
							control={control}
							name="name"
							rules={{ required: true }}
							render={({ field: { value, onBlur, onChange } }) => (
								<IonInput type="text" onIonBlur={onBlur} value={value} onInput={onChange} onIonChange={onChange} placeholder="Full Name" />
							)}
						/>
						{errors.name && <div className="input-error">Full Name is required</div>}
					</IonItem>

					<IonItem>
						<Controller
							control={control}
							name="username"
							rules={{ required: true }}
							render={({ field: { value, onBlur, onChange } }) => (
								<IonInput type="text" onIonBlur={onBlur} value={value} onInput={onChange} onIonChange={onChange} placeholder="Username" />
							)}
						/>
						{errors.username && <div className="input-error">Username is required</div>}
					</IonItem>

					<IonItem>
						<Controller
							control={control}
							name="email"
							rules={{ required: true }}
							render={({ field: { value, onBlur, onChange } }) => (
								<IonInput type="email" onIonBlur={onBlur} value={value} onInput={onChange} onIonChange={onChange} placeholder="Email" />
							)}
						/>
						{errors.email && <div className="input-error">Email is required</div>}
					</IonItem>

					<IonItem>
						<Controller
							control={control}
							name="password"
							rules={{ required: true }}
							render={({ field: { value, onBlur, onChange } }) => (
								<IonInput type="password" onIonBlur={onBlur} value={value} onInput={onChange} onIonChange={onChange} placeholder="Password" />
							)}
						/>
						{errors.password && <div className="input-error">Password is required</div>}
					</IonItem>

					<IonButton expand="block" type="submit" class="w-100">
						Register
					</IonButton>
					<p style={{ fontSize: 'medium' }}>
						Already have an account?
						<Link to="/page/login" className="text-highlight">
							Login
						</Link>
					</p>
				</form>
			</div>
		</PageLayout>
	);
};

export default Register;
