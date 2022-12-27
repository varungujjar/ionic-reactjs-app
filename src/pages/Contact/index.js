import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { showNotificationAction } from '../../redux/actions';
import { useForm, Controller } from 'react-hook-form';
import { IonTextarea, IonInput, IonItem } from '@ionic/react';
import { API } from '../../config/config';
import serviceApi from '../../config/axios';
import Button from '../../components/Form/Button';
import PageLayout from '../../components/Layout/PageLayout';

const Contact = () => {
	let history = useHistory();
	const reduxDispatch = useDispatch();
	const {
		control,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({
		defaultValues: {
			name: '',
			email: '',
			phone: '',
			subject: '',
			message: '',
		},
		mode: 'onChange',
		reValidateMode: 'onChange',
	});

	useEffect(() => {}, []);

	const onSubmitHandler = async (formDataObject) => {
		let formData = new FormData();
		for (let key in formDataObject) {
			formData.append(key, formDataObject[key]);
		}

		await serviceApi
			.post(null, formData, {
				params: {
					type: API.contact.type,
				},
			})
			.then((response) => {
				reduxDispatch(
					showNotificationAction({
						message: 'Thankyou for contacting us.Someone from our team will get back to you as soon as possible',
						type: 'success',
					})
				);
				reset();
				history.push('/page/home');
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

	return (
		<PageLayout title={API.contact.title}>
			<div className="login-container center-container">
				<br></br>
				<h2>Contact Us</h2>
				<p className="mb-2 text-muted">
					Do you have a question or wanna join our team? Send us an email or a message and we’ll answer you as fast as we can!
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
							name="phone"
							rules={{ required: true }}
							render={({ field: { value, onBlur, onChange } }) => (
								<IonInput type="text" onIonBlur={onBlur} value={value} onInput={onChange} onIonChange={onChange} placeholder="Phone Number" />
							)}
						/>
						{errors.phone && <div className="input-error">Phone is required</div>}
					</IonItem>

					<IonItem>
						<Controller
							control={control}
							name="subject"
							rules={{ required: true }}
							render={({ field: { value, onBlur, onChange } }) => (
								<IonInput type="text" onIonBlur={onBlur} value={value} onInput={onChange} onIonChange={onChange} placeholder="Subject" />
							)}
						/>
						{errors.subject && <div className="input-error">Subject is required</div>}
					</IonItem>

					<IonItem>
						<Controller
							control={control}
							name="message"
							rules={{ required: false }}
							render={({ field: { value, onBlur, onChange } }) => (
								<IonTextarea value={value} onIonBlur={onBlur} onInput={onChange} onIonChange={onChange} placeholder="Message" />
							)}
						/>
						{errors.message && <div className="input-error">Please write a message</div>}
					</IonItem>

					<Button type="submit">Submit</Button>
				</form>
			</div>
		</PageLayout>
	);
};

export default Contact;
