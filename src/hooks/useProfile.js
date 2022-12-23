import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { config } from '../config/config';

import { useToast } from '../hooks/useToast';
import api from '../config/axios';

export const useProfile = (id = null) => {
	const [setToast] = useToast();
	const [profileData, setProfileData] = useState({ loading: true });

	const { storeAuth } = useSelector((state) => {
		return state;
	});

	useEffect(() => {
		const fetchProfile = async () => {
			await api
				.get(null, {
					params: {
						type: config.users.type,
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
			}, config.timeOutDelay);
		} else {
			setTimeout(() => {
				setProfileData((prev) => ({ ...prev, ...storeAuth.userSession, loading: false }));
			}, config.timeOutDelay);
		}

		return () => {
			setProfileData((prev) => ({ ...prev, loading: true }));
		};
	}, [id, storeAuth.userSession]);

	return profileData;
};
