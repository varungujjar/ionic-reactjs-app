import { IonButton } from '@ionic/react';
import { useEffect } from 'react';

const Button = ({ children, type }) => {
	return (
		<IonButton type={type} class="w-full bg-yellow-300">
			{children}
		</IonButton>
	);
};

Button.defaultProps = {
	link: undefined,
	type: 'button',
};

export default Button;
