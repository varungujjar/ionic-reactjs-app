import { IonContent, IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonMenu, IonMenuToggle, IonNote, IonAvatar } from '@ionic/react';
import { useSelector } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutAction } from '../../redux/actions';
import { MENU } from '../../config/config';

import './PageMenu.css';

const PageMenu = () => {
	const location = useLocation();
	let history = useHistory();

	const reduxDispatch = useDispatch();
	const { storeAuth } = useSelector((state) => {
		return state;
	});

	const handleLogout = () => {
		reduxDispatch(logoutAction());
		history.push('/');
	};

	return (
		<IonMenu contentId="main" type="overlay">
			<IonContent>
				<IonList id="inbox-list">
					<div className="profile-container">
						<IonMenuToggle key={0} autoHide={false}>
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
						</IonMenuToggle>
					</div>
				</IonList>

				{MENU.map((item, index) => {
					return item.break ? (
						<IonListHeader key={index}>{item.title}</IonListHeader>
					) : (
						<IonMenuToggle key={index} autoHide={false} class="mt-5">
							<IonItem
								className={location.pathname === item.url ? 'selected' : ''}
								routerLink={item.url}
								routerDirection="forward"
								lines="none"
								detail={false}
								animated="true"
							>
								<IonIcon slot="start" ios={item.iosIcon} />
								<IonLabel>{item.title}</IonLabel>
							</IonItem>
						</IonMenuToggle>
					);
				})}

				{storeAuth.isLoggedin && (
					<IonList>
						<IonListHeader>Account</IonListHeader>
						<IonMenuToggle key={0} autoHide={false}>
							<IonItem routerDirection="forward" lines="none" detail={false} onClick={handleLogout}>
								<IonLabel>Logout</IonLabel>
							</IonItem>
						</IonMenuToggle>
					</IonList>
				)}
			</IonContent>
		</IonMenu>
	);
};
export default PageMenu;
