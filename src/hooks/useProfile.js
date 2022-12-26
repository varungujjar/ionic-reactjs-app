import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { API } from '../config/config';

import { useToast } from '../hooks/useToast';
import serviceApi from '../config/axios';

export const useProfile = (id = null) => {
	const [setToast] = useToast();
	const [profileData, setProfileData] = useState({ loading: true });

	const { storeAuth } = useSelector((state) => {
		return state;
	});

	useEffect(() => {
		const fetchProfile = async () => {
			await serviceApi
				.get(null, {
					params: {
						type: API.profiles.type,
						id: id,
					},
				})
				.then((response) => {
					setToast(response.data);
					setProfileData((prev) => ({
						...prev,
						...response.data.data,
						loading: false,
					}));
				})
				.catch((error) => {
					setToast({
						message: error.toJSON().message,
						type: 'danger',
					});
				});
		};

		if (id) {
			setTimeout(() => {
				fetchProfile();
			}, API.timeOutDelay);
		} else {
			setTimeout(() => {
				setProfileData((prev) => ({ ...prev, ...storeAuth.userSession, loading: false }));
			}, API.timeOutDelay);
		}

		return () => {
			setProfileData((prev) => ({ ...prev, loading: true }));
		};
	}, [id, storeAuth.userSession]);

	return profileData;
};
