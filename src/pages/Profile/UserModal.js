import { IonModal } from '@ionic/react';

const UserModal = ({ children, isOpen = false, onDidDismiss }) => {
	return (
		<IonModal isOpen={isOpen} onDidDismiss={onDidDismiss}>
			<div className="container" style={{ padding: '20px 20px' }}>
				{children}
			</div>
		</IonModal>
	);
};

export default UserModal;
