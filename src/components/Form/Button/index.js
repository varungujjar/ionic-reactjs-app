import { IonButton } from '@ionic/react';
import { useEffect } from 'react';

const Button = ({ children, type }) => {
	return (
		<IonButton type={type} class="w-100 mt-3">
			{children}
		</IonButton>
	);
};

export default Button;
