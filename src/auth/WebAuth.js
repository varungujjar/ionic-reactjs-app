import React, { useEffect } from 'react';
import { IonButton, IonInput, IonItem } from '@ionic/react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { setToast } from '../components/Toast';
import { loginAction } from '../redux/actions';
import { useForm, Controller } from 'react-hook-form';
import { config } from '../config/config';

import api from '../config/axios';

const WebAuth = () => {
	let history = useHistory();
	const reduxDispatch = useDispatch();
	const { storeAuth } = useSelector((state) => {
		return state;
	});

	const onSubmit = async (data) => {
		// showLoader(LoaderOptions);
		await api
			.get(null, {
				params: {
					type: config.login.type,
					username: data.username,
					password: data.password,
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
	};

	const {
		control,
		// register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			username: '',
			password: '',
		},
		mode: 'onChange',
		reValidateMode: 'onChange',
	});

	useEffect(() => {
		if (storeAuth.isLoggedin) {
			history.push('/page/profile');
		}
	}, [storeAuth.isLoggedin]);

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<IonItem>
				<Controller
					control={control}
					name="username"
					rules={{ required: true }}
					render={({ field: { value, onBlur, onChange } }) => (
						<IonInput
							type="text"
							onIonBlur={onBlur}
							value={value}
							onInput={onChange}
							onIonChange={onChange}
							placeholder="Username"
						/>
					)}
				/>
				{errors.username && <div className="input-error">Username is required</div>}
			</IonItem>
			<IonItem>
				<Controller
					control={control}
					name="password"
					rules={{ required: true }}
					render={({ field: { value, onBlur, onChange } }) => (
						<IonInput
							type="password"
							onIonBlur={onBlur}
							value={value}
							onInput={onChange}
							onIonChange={onChange}
							placeholder="Password"
						/>
					)}
				/>
				{errors.password && <div className="input-error">Password is required</div>}
			</IonItem>
			<IonButton expand="block" type="submit" class="w-100 mt-3">
				Sign In
			</IonButton>
			<p style={{ fontSize: 'medium' }} className="mt-3">
				{"Don't have an account yet?"}
				<Link to="/page/register" className="text-highlight">
					Create an Account
				</Link>
			</p>
		</form>
	);
};

export default WebAuth;
