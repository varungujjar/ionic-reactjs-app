import { IonItem, IonLabel, IonListHeader } from '@ionic/react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { logoutAction } from '../../redux/actions';
import { API } from '../../config/config';

const ProfileLogout = () => {
	const history = useHistory();
	const reduxDispatch = useDispatch();

	const { storeAuth } = useSelector((state) => {
		return state;
	});

	const handleLogout = () => {
		reduxDispatch(logoutAction());
		history.push(API.login.afterLogout);
	};

	return (
		storeAuth.isLoggedin && (
			<>
				<IonListHeader>Account</IonListHeader>
				<IonItem routerDirection="forward" lines="none" detail={false} onClick={handleLogout}>
					<IonLabel>Logout</IonLabel>
				</IonItem>
			</>
		)
	);
};

export default ProfileLogout;
