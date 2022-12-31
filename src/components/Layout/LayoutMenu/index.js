import { IonContent, IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonMenu, IonMenuToggle } from '@ionic/react';
import { useLocation } from 'react-router-dom';
import { MENU } from '../../../config/config';
import ProfileLogout from '../../Profiles/ProfileLogout';
import ProfileStatus from '../../Profiles/ProfileStatus';

import './index.css';

const LayoutMenu = () => {
	const location = useLocation();

	return (
		<IonMenu contentId="main" type="overlay">
			<IonContent>
				<div className="mb-5">
					<IonList id="inbox-list">
						<IonMenuToggle autoHide={false}>
							<ProfileStatus />
						</IonMenuToggle>
					</IonList>
				</div>

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
								<IonIcon slot="start" ios={item.iosIcon} color="primary" />
								<IonLabel>{item.title}</IonLabel>
							</IonItem>
						</IonMenuToggle>
					);
				})}

				<IonList>
					<IonMenuToggle autoHide={false}>
						<ProfileLogout />
					</IonMenuToggle>
				</IonList>
			</IonContent>
		</IonMenu>
	);
};
export default LayoutMenu;
