import { useEffect, useState } from 'react';
import {
	IonButtons,
	useIonToast,
	IonTextarea,
	IonButton,
	IonInput,
	IonItem,
	IonContent,
	IonHeader,
	IonBackButton,
	IonPage,
	IonToolbar,
} from '@ionic/react';
import { Loading } from '../../helpers/Util';
import { useHistory } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';

const Contact = () => {
	const [showLoader, setshowLoader] = useState(false);
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

	// const handleLogin = () => {};

	const onSubmit = (data) => {
		setshowLoader(true);
		presentToast('Thankyou for submiting.We will get in touch with you as soon as possible', 'success');

		setshowLoader(false);
		history.push('/page/home');

		// ApiAuth('register', data, resultData => {

		//     if (resultData["message"]) {
		//         console.log(resultData);
		//         presentToast(resultData["message"]);
		//     }

		//     if (resultData["messages"]) {
		//        for (const [key, value] of Object.entries(resultData["messages"])) {
		//         value.forEach(message => {
		//             presentToast(message, key);
		//         });

		//       }
		//     }

		//     if (resultData["success"]) {
		//         history.push("/page/home");
		//     }

		//     setshowLoader(false);
		// })
	};

	const {
		control,
		register,
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

	useEffect(() => {
		reset();
	}, []);

	return (
		<IonPage className="ion-page">
			<IonHeader>
				<IonToolbar>
					<IonButtons slot="start">
						<IonBackButton defaultHref="/page/home" />
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen>
				<Loading show={showLoader} />
				<div className="contact-container center-container">
					<h2>Contact Us</h2>
					<p className="mb-2 text-muted">
						Do you have a question or wanna join our team? Send us an email or a message and we’ll answer you as fast as we can!
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

						<IonButton expand="block" type="submit" class="w-100">
							Submit
						</IonButton>
					</form>
				</div>
			</IonContent>
		</IonPage>
	);
};

export default Contact;
