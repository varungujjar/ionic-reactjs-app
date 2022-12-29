import { IonButton } from '@ionic/react';

const ButtonLink = ({ children, link, type }) => {
	return (
		<IonButton type={type} routerLink={link} class="w-100 mt-3">
			{children}
		</IonButton>
	);
};

ButtonLink.defaultProps = {
	link: undefined,
	type: 'button',
};

export default ButtonLink;
