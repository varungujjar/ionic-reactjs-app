import { useState, useRef } from 'react';
import { IonButton, IonModal, IonIcon } from '@ionic/react';
import { camera } from 'ionicons/icons';

const ProfilePicture = ({ src, alt, username, name, allowEdit, onChange }) => {
	const inputField = useRef();
	const [openModal, setOpenModal] = useState(false);
	const [eventData, setEventData] = useState(null);

	const onChangeHandler = (event) => {
		setEventData(event);
		setOpenModal(false);
	};

	const onDidDismiss = () => {
		if (eventData) {
			onChange({ [eventData.target.name]: eventData.target.files[0] });
			setEventData(null);
		}
		setOpenModal(false);
	};

	return (
		<>
			<div className="profile-image">
				<div className="profile-image-wrapper">
					<img
						src={src ? src : './assets/images/article-no-image.png'}
						alt={alt}
						className="border-gray-900 border-8 bg-slate-900 rounded-full w-32 h-32"
					/>
					{allowEdit && (
						<button
							className="w-10 h-10 bg-amber-400 rounded-full hover:bg-amber-500 position-absolute top-0 right-0 text-slate-800"
							onClick={() => {
								setOpenModal(true);
							}}
						>
							<IonIcon icon={camera} />
						</button>
					)}
				</div>

				<div className="profile-details-wrapper">
					<h5 className="text-2xl font-bold">{username}</h5>
					<span className="profile-name">{name}</span>
				</div>
			</div>

			<IonModal isOpen={openModal} onDidDismiss={onDidDismiss}>
				<div className="container" style={{ padding: '20px 20px' }}>
					<IonButton expand="block" type="submit" class="w-100 fixed-button" onClick={() => inputField.current.click()}>
						Upload Profile Picture
					</IonButton>
				</div>
				<input type="file" name="profile_image" onChange={onChangeHandler} ref={inputField} hidden />
			</IonModal>
		</>
	);
};

export default ProfilePicture;
