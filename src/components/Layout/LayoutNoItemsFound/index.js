import { IonButton, IonModal, IonIcon } from '@ionic/react';
import { planet } from 'ionicons/icons';

const LayoutNoItemsFound = ({ message }) => {
	return (
		<div className="flex h-full">
			<div className="m-auto text-center font-bold opacity-30 text-slate-200">
				<div className="text-2xl">
					<IonIcon icon={planet} size="large" />
				</div>
				{message}
			</div>
		</div>
	);
};

export default LayoutNoItemsFound;
