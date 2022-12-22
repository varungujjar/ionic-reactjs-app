import { useEffect, useState } from 'react';
import { config } from '../config/config';
import api from '../config/axios';
import { setToast } from '../components/Toast';
import { useSelector, useDispatch } from 'react-redux';

export const useProfile = (id = null) => {
	const [profileData, setProfileData] = useState({ loading: true });

	const reduxDispatch = useDispatch();
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
					setToast(reduxDispatch, response.data);
					setProfileData((prev) => ({
						...prev,
						...response.data.data,
						loading: false,
					}));
				})
				.catch((error) => {
					setToast(reduxDispatch, {
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
				console.log('process this');
				setProfileData((prev) => ({ ...prev, ...storeAuth.userSession, loading: false }));
			}, config.timeOutDelay);
		}

		return () => {
			setProfileData((prev) => ({ ...prev, loading: true }));
		};
	}, [id, storeAuth.userSession]);

	return profileData;
};

// export const postProfile = (profileFormData, id, session) => {
// 	const [] = useState(profileFormData);

// 	const reduxDispatch = useDispatch();
// 	const { storeAuth } = useSelector((state) => {
// 		return state;
// 	});

// 	let formData = new FormData();

// 	for (let key in profileFormData) {
// 		formData.append(key, profileFormData[key]);
// 	}

// 	useEffect(() => {
// 		async () =>
// 			await api
// 				.post(null, formData, {
// 					params: {
// 						type: config.profile.type,
// 						uid: id,
// 						session: session,
// 					},
// 				})
// 				.then((response) => {
// 					setToast(reduxDispatch, response.data);
// 					reduxDispatch(refreshSessionAction({ session: session, id: id }));
// 				})
// 				.catch((error) => {
// 					setToast(reduxDispatch, {
// 						message: error.toJSON().message,
// 						type: 'danger',
// 					});
// 				});
// 	}, []);
// };
