import './index.css';

const Card = ({ onClickData, onClick, children }) => {
	return (
		<div className="card rounded mt-3" onClick={() => onClick(onClickData)}>
			{children}
		</div>
	);
};

export default Card;
