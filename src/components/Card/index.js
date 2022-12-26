import PropTypes from 'prop-types';
import './index.css';

const Card = ({ onClickData, onClick, children }) => {
	return (
		<div className="card rounded mt-3" onClick={() => onClick(onClickData)}>
			{children}
		</div>
	);
};

Card.defaultProps = {};

Card.propTypes = {
	onClick: PropTypes.func,
};

export default Card;
