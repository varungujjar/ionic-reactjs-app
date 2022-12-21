import { useEffect } from 'react';
import { config } from '../../config/config';

import Carousel from '../../components/Carousel';
import { UserCardCarousel, UsersCardPlaceholder } from './UserCard';

const UsersSlider = ({ data }) => {
	useEffect(() => {}, [data.loading]);

	return !data.loading ? (
		<Carousel key={0} className="owl-theme" config={config.videocarousel}>
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
		<Carousel config={config.videocarousel} key={1}>
			<UsersCardPlaceholder />
			<UsersCardPlaceholder />
		</Carousel>
	);
};
export default UsersSlider;
