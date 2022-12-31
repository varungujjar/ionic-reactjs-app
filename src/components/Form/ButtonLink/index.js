import { IonButton } from '@ionic/react';
import { Link } from 'react-router-dom';

const ButtonLink = ({ children, link, type }) => {
	return (
		<Link to={link}>
			<button
				type={type}
				className="w-full bg-amber-400 rounded-full text-gray-900 font-bold hover:ripple-effect px-3 py-1.5 transition-all"
			>
				{children}
			</button>
		</Link>
	);
};

ButtonLink.defaultProps = {
	link: undefined,
	type: 'button',
};

export default ButtonLink;
