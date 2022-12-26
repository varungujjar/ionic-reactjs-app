import { useEffect } from 'react';
import { CAROUSEL_OPTIONS } from '../../config/config';

import Carousel from '../../components/Carousel';
import { UserCardCarousel, UsersCardPlaceholder } from './UserCard';

const UsersSlider = ({ data }) => {
	useEffect(() => {}, [data.loading]);

	return !data.loading ? (
		<Carousel key={0} className="owl-theme" config={CAROUSEL_OPTIONS}>
			{Object.keys(data.data).length > 0 ? (
				data.data.map((user) => (
					<UserCardCarousel
						key={user.id}
						userFullName={user.name}
						userId={user.id}
						userName={user.username}
						userProfileImage={user['profile_image']}
					/>
				))
			) : (
				<>No users to display</>
			)}
		</Carousel>
	) : (
		<Carousel config={CAROUSEL_OPTIONS} key={1}>
			<UsersCardPlaceholder />
			<UsersCardPlaceholder />
		</Carousel>
	);
};
export default UsersSlider;
