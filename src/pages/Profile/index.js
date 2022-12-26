import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { API } from '../../config/config';
import { useParams } from 'react-router-dom';
import serviceApi from '../../config/axios';

import PageLayout from '../../components/Layout/PageLayout';
import ProfileSkeleton from './ProfileSkeleton';
import ProfileCover from './ProfileCover';
import ProfilePicture from './ProfilePicture';
import ProfileBio from './ProfileBio';

import { useProfile } from '../../hooks/useProfile';
import { refreshSessionAction, showNotificationAction } from '../../redux/actions';

import './index.css';

const Profile = () => {
	const userId = useParams();
	const reduxDispatch = useDispatch();
	const { name, username, biography, cover_image, profile_image, loading, session, id } = useProfile(userId.id);

	const [pageLoading, setPageLoading] = useState(true);

	const onPageRefresh = (event) => {
		session && reduxDispatch(refreshSessionAction({ session: session, id: id }));
		event.detail.complete();
	};

	const onChangeHandler = (formDataObject) => {
		submitForm(formDataObject);
	};

	const submitForm = async (formDataObject) => {
		setPageLoading(true);

		let formData = new FormData();
		for (let key in formDataObject) {
			formData.append(key, formDataObject[key]);
		}

		await serviceApi
			.post(null, formData, {
				params: {
					type: API.profile.type,
					uid: id,
					session: session,
				},
			})
			.then((response) => {
				reduxDispatch(showNotificationAction(response.data));
				reduxDispatch(refreshSessionAction({ session: session, id: id }));
			})
			.catch((error) => {
				reduxDispatch(
					showNotificationAction({
						message: error.toJSON().message,
						type: 'danger',
					})
				);
			});
	};

	const RenderProfile = () => {
		return (
			<>
				<ProfileCover src={cover_image} alt={username} allowEdit={session} onChange={onChangeHandler} />
				<ProfilePicture src={profile_image} alt={username} username={username} name={name} allowEdit={session} onChange={onChangeHandler} />
				<ProfileBio biography={biography} name={name} allowEdit={session} onChange={onChangeHandler} />
			</>
		);
	};

	useEffect(() => {
		setPageLoading(loading);
		return () => {
			setPageLoading(true);
		};
	}, [id, loading]);

	return (
		<PageLayout title="Profile" showPageRefresh={true} onPageRefresh={onPageRefresh}>
			{pageLoading ? <ProfileSkeleton /> : <RenderProfile />}
		</PageLayout>
	);
};

export default Profile;
