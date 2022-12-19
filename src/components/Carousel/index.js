import OwlCarousel from 'react-owl-carousel';
import './index.css';

const Carousel = ({ config, children }) => {
	return (
		<OwlCarousel key={0} className="owl-theme" {...config}>
			{children}
		</OwlCarousel>
	);
};

export default Carousel;
