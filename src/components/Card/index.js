import './index.css';

const Card = ({ children }) => {
	return (
		<div className="rounded-md mt-3 bg-slate-900 hover:bg-slate-800 overflow-hidden position-relative hover:ripple-effect">
			{children}
		</div>
	);
};

export default Card;
