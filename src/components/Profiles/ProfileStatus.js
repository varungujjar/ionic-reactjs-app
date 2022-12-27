import { IonItem, IonAvatar, IonListHeader, IonNote } from '@ionic/react';
import { useSelector } from 'react-redux';

const ProfileStatus = () => {
	const { storeAuth } = useSelector((state) => {
		return state;
	});

	return (
		<div className="profile-container">
			{storeAuth.isLoggedin ? (
				<IonItem routerLink="/page/profile" routerDirection="forward" lines="none" detail={false} animated="true">
					<IonAvatar>
						<img src="./assets/images/article-no-image.png" alt="not-loggedin" />
					</IonAvatar>
					<div>
						<IonListHeader>Hi, {storeAuth.userSession.name}</IonListHeader>
						<IonNote>{storeAuth.userSession.username}</IonNote>
					</div>
				</IonItem>
			) : (
				<IonItem routerLink="/page/login" routerDirection="forward" lines="none" detail={false} animated="true">
					<IonAvatar>
						<img src="./assets/images/article-no-image.png" alt="not-loggedin" />
					</IonAvatar>
					<div>
						<IonListHeader>Hi, Guest</IonListHeader>
						<IonNote>Login</IonNote>
					</div>
				</IonItem>
			)}
		</div>
	);
};

export default ProfileStatus;
