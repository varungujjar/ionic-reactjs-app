import { useState } from 'react';
import { IonInput, IonTextarea, IonItem, IonModal, IonIcon } from '@ionic/react';
import { useForm, Controller } from 'react-hook-form';
import { pencil } from 'ionicons/icons';
import Button from '../../components/Form/Button';

const ProfileBio = ({ biography, name, allowEdit, onChange }) => {
	const [openModal, setOpenModal] = useState(false);
	const [eventData, setEventData] = useState(null);
	let i = 0;

	const onSubmitHandler = (formObject) => {
		setEventData((prev) => ({ ...prev, ...formObject }));
		setOpenModal(false);
	};

	const onDidDismiss = () => {
		if (eventData && i === 0) {
			//Bug in ionic makes it trigger twice so we make sure its only done once
			onChange(eventData);
			setEventData(null);
		}
		i++;
		setOpenModal(false);
	};

	const {
		control,
		// register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({
		defaultValues: {
			name: name ? name : '',
			biography: biography.rawvalue ? biography.rawvalue : '',
		},
		mode: 'onChange',
		reValidateMode: 'onChange',
	});

	return (
		<>
			<h6>Biography</h6>
			<div
				dangerouslySetInnerHTML={{
					__html: biography.rawvalue ? biography.rawvalue : 'No Biography',
				}}
			/>
			{allowEdit && (
				<button
					className="btn btn-primary btn-bio-edit"
					onClick={() => {
						setOpenModal(true);
					}}
				>
					<IonIcon icon={pencil} />
				</button>
			)}
			<div className="mt-4">
				<h6>Games</h6>
				<div className="text-muted mb-4">No Games Selected</div>
			</div>

			<IonModal isOpen={openModal} onDidDismiss={onDidDismiss}>
				<div className="container" style={{ padding: '20px 20px' }}>
					<h6 className="text-bold">Edit Profile Details</h6>

					<form onSubmit={handleSubmit(onSubmitHandler)}>
						<IonItem>
							<Controller
								control={control}
								name="name"
								rules={{ required: true }}
								defaultValue={name}
								render={({ field: { value, onBlur, onChange } }) => (
									<IonInput
										type="text"
										value={value}
										onIonBlur={onBlur}
										onInput={onChange}
										onIonChange={onChange}
										placeholder="Full Name"
										name="name"
									/>
								)}
							/>
							{errors.name && <div className="input-error">Name is required</div>}
						</IonItem>
						<IonItem>
							<Controller
								control={control}
								name="biography"
								rules={{ required: true }}
								defaultValue={biography.rawvalue}
								render={({ field: { value, onBlur, onChange } }) => (
									<IonTextarea value={value} onIonBlur={onBlur} onInput={onChange} onIonChange={onChange} placeholder="Biography" name="biography" />
								)}
							/>
							{errors.biography && <div className="input-error">Biography is required</div>}
						</IonItem>

						<div className="mt-3">
							<Button type="submit">Save</Button>
						</div>
					</form>
				</div>
			</IonModal>
		</>
	);
};

export default ProfileBio;
