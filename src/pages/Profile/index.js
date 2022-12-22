import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { config } from '../../config/config';
import { useParams } from 'react-router-dom';
import { setToast } from '../../components/Toast';
import api from '../../config/axios';

import PageLayout from '../../components/PageLayout';
import ProfileSkeleton from './ProfileSkeleton';
import ProfileCover from './ProfileCover';
import ProfilePicture from './ProfilePicture';
import ProfileBio from './ProfileBio';

import { useProfile } from '../../hooks/useProfile';
import { refreshSessionAction } from '../../redux/actions';

import './index.css';

const Profile = () => {
	const userId = useParams();
	const { name, username, biography, cover_image, profile_image, loading, session, id } = useProfile(userId.id);
	const [_loading, setLoading] = useState(true);
	const reduxDispatch = useDispatch();

	const onPageRefresh = (event) => {
		session && reduxDispatch(refreshSessionAction({ session: session, id: id }));
		event.detail.complete();
	};

	const onChangeImageHandler = (formDataObject) => {
		console.log(formDataObject);
		submitForm(formDataObject);
	};

	const submitForm = async (formDataObject) => {
		setLoading(true);

		let formData = new FormData();
		for (let key in formDataObject) {
			formData.append(key, formDataObject[key]);
		}

		await api
			.post(null, formData, {
				params: {
					type: config.profile.type,
					uid: id,
					session: session,
				},
			})
			.then((response) => {
				setToast(reduxDispatch, response.data);
				reduxDispatch(refreshSessionAction({ session: session, id: id }));
			})
			.catch((error) => {
				setToast(reduxDispatch, {
					message: error.toJSON().message,
					type: 'danger',
				});
			});
	};

	const RenderProfile = () => {
		return (
			<>
				<ProfileCover src={cover_image} alt={username} allowEdit={session} onChange={onChangeImageHandler} />
				<ProfilePicture src={profile_image} alt={username} username={username} name={name} allowEdit={session} onChange={onChangeImageHandler} />
				<ProfileBio biography={biography} allowEdit={session} />
			</>
		);
	};

	useEffect(() => {
		setLoading(loading);
		return () => {
			setLoading(true);
		};
	}, [id, loading]);

	return (
		<PageLayout title="Profile" showPageRefresh={true} onPageRefresh={onPageRefresh}>
			{_loading ? <ProfileSkeleton /> : <RenderProfile />}
		</PageLayout>
	);
};

export default Profile;
