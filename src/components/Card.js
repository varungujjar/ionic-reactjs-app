import PropTypes from 'prop-types';
import './Card.css';

const Card = ({ onClickData, onClick, children }) => {
	return (
		<div className="card rounded mt-3" onClick={() => onClick(onClickData)}>
			{children}
		</div>
	);
};

Card.defaultProps = {};

Card.propTypes = {
	onClickData: PropTypes.number,
	onClick: PropTypes.func,
	children: PropTypes.array,
};

export default Card;
