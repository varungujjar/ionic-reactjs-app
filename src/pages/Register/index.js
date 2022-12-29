import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { showNotificationAction } from '../../redux/actions';
import { IonInput, IonItem } from '@ionic/react';
import { API } from '../../config/config';
import serviceApi from '../../config/axios';
import Button from '../../components/Form/Button';
import Layout from '../../components/Layout';

const Register = () => {
	let history = useHistory();
	const reduxDispatch = useDispatch();
	const {
		control,
		handleSubmit,
		reset,
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
	// reset();

	const onSubmitHandler = async (formDataObject) => {
		let formData = new FormData();
		for (let key in formDataObject) {
			formData.append(key, formDataObject[key]);
		}

		await serviceApi
			.post(null, formData, {
				params: {
					type: API.register.type,
				},
			})
			.then((response) => {
				reduxDispatch(showNotificationAction(response.data));
				if (response.data.success) {
					reset();
					history.push(API.register.afterRegister);
				}
			})
			.catch((error) => {
				reduxDispatch(
					showNotificationAction({
						message: error.toJSON().message,
						type: 'danger',
					})
				);
			});
	};

	useEffect(() => {}, []);

	return (
		<Layout title={API.register.title}>
			<div className="login-container center-container">
				<div className="logo">
					<img src="./assets/images/about-weare.png" alt="logo" />
				</div>
				<h2>Create an Account</h2>
				<p className="mb-2 text-muted">
					To view or manage your profile <br></br>you will need to create an account.
				</p>
				<form onSubmit={handleSubmit(onSubmitHandler)}>
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

					<Button type="submit">Register</Button>
					<p style={{ fontSize: 'medium' }}>
						Already have an account?
						<Link to="/page/login" className="text-highlight">
							Login
						</Link>
					</p>
				</form>
			</div>
		</Layout>
	);
};

export default Register;
