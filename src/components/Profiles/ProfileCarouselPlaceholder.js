import OwlCarousel from 'react-owl-carousel';
import ProfileCardPlaceholder from './ProfileCardPlaceholder';
import { CAROUSEL_OPTIONS } from '../../config/config';

const ProfileCarouselPlaceholder = () => {
	return (
		<OwlCarousel className="owl-theme" {...CAROUSEL_OPTIONS}>
			<ProfileCardPlaceholder />
			<ProfileCardPlaceholder />
		</OwlCarousel>
	);
};

export default ProfileCarouselPlaceholder;
