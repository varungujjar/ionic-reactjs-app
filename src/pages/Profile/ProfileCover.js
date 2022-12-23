import { useState, useRef } from 'react';
import { IonButton, IonModal, IonIcon } from '@ionic/react';
import { camera } from 'ionicons/icons';
import { config } from '../../config/config';

const ProfileCover = ({ src, alt, allowEdit, onChange }) => {
	const inputField = useRef();
	const [openModal, setOpenModal] = useState(false);
	const [eventData, setEventData] = useState(null);
	let i = 0;

	const coverImageDecode = JSON.parse(src.rawvalue);
	const coverImageSrc = coverImageDecode.imagefile && config.baseUrl + coverImageDecode.imagefile;

	const onChangeHandler = (event) => {
		setEventData(event);
		setOpenModal(false);
	};

	const onDidDismiss = () => {
		if (eventData && i === 0) {
			//Bug in ionic makes it trigger twice so we make sure its only done once
			onChange({ [eventData.target.name]: eventData.target.files[0] });
			setEventData(null);
		}
		i++;
		setOpenModal(false);
	};

	return (
		<>
			<div className="article-image-full">
				<img src={coverImageSrc} alt={alt} className="articleImage" style={{ height: '250px', width: '100%', objectFit: 'cover' }} />
				{allowEdit && (
					<button
						className="btn btn-primary btn-image-edit"
						onClick={() => {
							setOpenModal(true);
						}}
					>
						<IonIcon icon={camera} />
					</button>
				)}
			</div>

			<IonModal isOpen={openModal} onDidDismiss={onDidDismiss}>
				<div className="container" style={{ padding: '20px 20px' }}>
					<IonButton expand="block" class="w-100 fixed-button" onClick={() => inputField.current.click()}>
						Upload Cover Picture
					</IonButton>
				</div>
				<input type="file" name="cover_image" onChange={onChangeHandler} ref={inputField} hidden />
			</IonModal>
		</>
	);
};

export default ProfileCover;
