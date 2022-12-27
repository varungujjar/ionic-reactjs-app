import OwlCarousel from 'react-owl-carousel';
import { CAROUSEL_OPTIONS } from '../../config/config';

import ProfileCard from './ProfileCard';

const ProfileCarousel = ({ items }) => {
	const { data } = items;

	return (
		<OwlCarousel className="owl-theme" {...CAROUSEL_OPTIONS}>
			{data.length > 0 ? data.map((user) => <ProfileCard key={user.id} data={user} />) : <>No users to display</>}
		</OwlCarousel>
	);
};
export default ProfileCarousel;
