import { useState, useRef } from 'react';
import { IonButton, IonModal, IonIcon } from '@ionic/react';
import { camera } from 'ionicons/icons';

const ProfileCover = ({ src, alt, allowEdit, onChange }) => {
	const inputField = useRef();
	const [openModal, setOpenModal] = useState(false);
	const [eventData, setEventData] = useState(null);
	let i = 0;

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
				<img
					src={src ? src : './assets/images/article-no-image.png'}
					alt={alt}
					className="articleImage"
					style={{ height: '250px', width: '100%', objectFit: 'cover' }}
				/>
				{allowEdit && (
					<button
						className="w-10 h-10 bg-amber-400 rounded-full hover:bg-amber-500 position-absolute top-20 right-10 text-slate-800"
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

ProfileCover.defaultProps = {
	src: './assets/images/article-no-image.png',
	alt: '',
	allowEdit: false,
};

export default ProfileCover;
