import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { API } from '../../config/config';
import { useParams } from 'react-router-dom';
import { useProfile } from '../../hooks/useProfile';
import { refreshSessionAction, showNotificationAction } from '../../redux/actions';
import serviceApi from '../../config/axios';
import PageLayout from '../../components/Layout/PageLayout';
import ProfilePlaceholder from './ProfilePlaceholder';
import ProfileCover from './ProfileCover';
import ProfilePicture from './ProfilePicture';
import ProfileBio from './ProfileBio';

import './index.css';

const Profile = () => {
	const userId = useParams();
	const reduxDispatch = useDispatch();
	const [pageLoading, setPageLoading] = useState(true);
	const { name, username, biography, cover_image, profile_image, loading, session, id } = useProfile(userId.id);

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
		let cover_image_src = null;
		if (cover_image.rawvalue) {
			const coverImageParse = JSON.parse(cover_image.rawvalue);
			cover_image_src = coverImageParse.imagefile && API.baseUrl + coverImageParse.imagefile;
		}

		let profile_image_src = null;
		if (profile_image.rawvalue) {
			const profileImageParse = JSON.parse(profile_image.rawvalue);
			profile_image_src = profileImageParse.imagefile && API.baseUrl + profileImageParse.imagefile;
		}

		return (
			<>
				<ProfileCover src={cover_image_src} alt={username} allowEdit={session} onChange={onChangeHandler} />
				<ProfilePicture src={profile_image_src} alt={username} username={username} name={name} allowEdit={session} onChange={onChangeHandler} />
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
			{pageLoading ? <ProfilePlaceholder /> : <RenderProfile />}
		</PageLayout>
	);
};

export default Profile;
