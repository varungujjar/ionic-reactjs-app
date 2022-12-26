import { useEffect, useState, useRef } from 'react';
import { IonButton, IonModal, IonIcon } from '@ionic/react';
import { camera } from 'ionicons/icons';
import { API } from '../../config/config';

const ProfilePicture = ({ src, alt, username, name, allowEdit, onChange }) => {
	const inputField = useRef();
	const [openModal, setOpenModal] = useState(false);
	const [eventData, setEventData] = useState(null);

	const profileImageDecode = JSON.parse(src.rawvalue);
	const profileImageSrc = profileImageDecode.imagefile && API.baseUrl + profileImageDecode.imagefile;

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

	useEffect(() => {}, [src]);

	return (
		<>
			<div className="profile-image">
				<div className="profile-image-wrapper">
					<img src={profileImageSrc} alt={alt} className="articleImage" />
					{allowEdit && (
						<button
							className="btn-profile-image-edit btn btn-primary"
							onClick={() => {
								setOpenModal(true);
							}}
						>
							<IonIcon icon={camera} />
						</button>
					)}
				</div>

				<div className="profile-details-wrapper">
					<h5>{username}</h5>
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
