import { useState } from 'react';
import { IonInput, IonTextarea, IonButton, IonItem, IonModal, IonIcon } from '@ionic/react';
import { useForm, Controller } from 'react-hook-form';
import { pencil } from 'ionicons/icons';

const ProfileBio = ({ biography, name, allowEdit, onChange }) => {
	const [openModal, setOpenModal] = useState(false);
	const [eventData, setEventData] = useState(null);
	let i = 0;

	const onChangeHandler = (event) => {
		setEventData((prev) => ({ ...prev, [event.target.name]: event.target.value }));
	};

	const onSubmitHandler = () => {
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
		// handleSubmit,
		// reset,
		// formState: { errors },
	} = useForm({
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

					<IonItem>
						<Controller
							control={control}
							name="name"
							rules={{ required: false }}
							defaultValue={name}
							render={({ field: { value, onBlur, onChange } }) => (
								<IonInput
									type="text"
									value={value}
									onIonBlur={onBlur}
									onInput={(e) => {
										onChange(e);
										onChangeHandler(e);
									}}
									onIonChange={onChange}
									placeholder="Full Name"
									name="name"
								/>
							)}
						/>
					</IonItem>
					<IonItem>
						<Controller
							control={control}
							name="biography"
							rules={{ required: false }}
							defaultValue={biography.rawvalue}
							render={({ field: { value, onBlur, onChange } }) => (
								<IonTextarea
									value={value}
									onIonBlur={onBlur}
									onInput={(e) => {
										onChange(e);
										onChangeHandler(e);
									}}
									onIonChange={onChange}
									placeholder="Biography"
									name="biography"
								/>
							)}
						/>
					</IonItem>

					<div className="mt-3">
						<IonButton expand="block" type="submit" class="w-100 fixed-button" onClick={onSubmitHandler}>
							Save
						</IonButton>
					</div>
				</div>
			</IonModal>
		</>
	);
};

export default ProfileBio;
