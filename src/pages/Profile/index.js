import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { config } from '../../config/config';
import { useParams } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { IonInput, IonTextarea, IonButton, IonItem, IonModal } from '@ionic/react';
import api from '../../config/axios';
import { setToast } from '../../components/Toast';

import { IonIcon } from '@ionic/react';
import { camera, pencil } from 'ionicons/icons';

import PageLayout from '../../components/PageLayout';
import ProfileSkeleton from './ProfileSkeleton';

import { refreshSessionAction } from '../../redux/actions';

import './Profile.css';

const Profile = () => {
	const { id } = useParams();

	const [profileData, setProfileData] = useState({ data: {}, loading: true });
	const { loading, data } = profileData;

	const [editData, setEditData] = useState({ biography: false, profile_image: false, cover_image: false });
	const [profileFormData, setProfileFormData] = useState({});
	const [profileFormAutoSubmit, setProfileFormAutoSubmit] = useState(false);

	const reduxDispatch = useDispatch();
	const { storeAuth } = useSelector((state) => {
		return state;
	});

	const {
		control,
		// register,
		// handleSubmit,
		// reset,
		// formState: { errors },
	} = useForm({
		mode: 'onChange',
		reValidateMode: 'onChange',
	});

	const onChangeInputHandler = (event) => {
		setProfileFormData((prev) => ({ ...prev, [event.target.name]: event.target.value }));
	};

	const onChangeImageHandler = (event) => {
		setProfileFormData((prev) => ({ ...prev, [event.target.name]: event.target.files[0] }));
		setProfileFormAutoSubmit(true);
	};

	const onPageRefresh = (event) => {
		reduxDispatch(refreshSessionAction(profileData.data));
		event.detail.complete();
	};

	const submitForm = async (event) => {
		let formData = new FormData();

		for (let key in profileFormData) {
			formData.append(key, profileFormData[key]);
			console.log(key + ', ' + profileFormData[key]);
		}

		await api
			.post(null, formData, {
				params: {
					type: config.profile.type,
					uid: data.id,
					session: data.session,
				},
			})
			.then((response) => {
				setToast(reduxDispatch, response.data);
				reduxDispatch(refreshSessionAction(profileData.data));
				setEditData((prev) => ({ ...prev, biography: false, profile_image: false, cover_image: false }));
			})
			.catch((error) => {
				setToast(reduxDispatch, {
					message: error.toJSON().message,
					type: 'danger',
				});
			});
		setProfileFormData({});
	};

	useEffect(() => {
		if (profileFormAutoSubmit) {
			submitForm();
			setProfileFormAutoSubmit(false);
		}

		const fetchProfile = () => {
			setTimeout(async () => {
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
							data: { ...response.data.data },
							loading: false,
						}));
					})
					.catch((error) => {
						setToast(reduxDispatch, {
							message: error.toJSON().message,
							type: 'danger',
						});
					});
			}, config.timeOutDelay);
		};
		if (id) {
			fetchProfile();
		} else {
			setTimeout(() => {
				setProfileData((prev) => ({ ...prev, data: storeAuth.userSession, loading: false }));
			}, config.timeOutDelay);
		}
	}, [id, JSON.stringify(storeAuth.userSession), profileFormAutoSubmit]);

	if (loading)
		return (
			<PageLayout title="Profile">
				<ProfileSkeleton />
			</PageLayout>
		);

	const { name, username, email, biography, cover_image, profile_image, articles, news, videos, games } = data;

	const coverImageDecode = JSON.parse(cover_image.rawvalue);
	const coverImageSrc = coverImageDecode.imagefile && config.baseUrl + coverImageDecode.imagefile;

	const profileImageDecode = JSON.parse(profile_image.rawvalue);
	const profileImageSrc = profileImageDecode.imagefile && config.baseUrl + profileImageDecode.imagefile;

	return (
		<PageLayout title="Profile" showPageRefresh={true} onPageRefresh={onPageRefresh}>
			<div className="article-image-full">
				<img src={coverImageSrc} alt={username} className="articleImage" style={{ height: '250px', width: '100%', objectFit: 'cover' }} />{' '}
				{data.session && (
					<button className="btn btn-primary btn-image-edit" onClick={() => setEditData((prev) => ({ ...prev, cover_image: true }))}>
						<IonIcon icon={camera} />
					</button>
				)}
			</div>

			<div className="profile-image">
				<div className="profile-image-wrapper">
					<img src={profileImageSrc} alt={username} className="articleImage" />
					{data.session && (
						<button className="btn-profile-image-edit btn btn-primary" onClick={() => setEditData((prev) => ({ ...prev, profile_image: true }))}>
							<IonIcon icon={camera} />
						</button>
					)}
				</div>

				<div className="profile-details-wrapper">
					<h5>{username}</h5>
					<span className="profile-name">{name}</span>
				</div>
			</div>

			<h6>Biography</h6>
			<div
				dangerouslySetInnerHTML={{
					__html: biography.rawvalue ? biography.rawvalue : 'No Biography',
				}}
			/>
			{data.session && (
				<button className="btn btn-primary btn-bio-edit" onClick={() => setEditData((prev) => ({ ...prev, biography: true }))}>
					<IonIcon icon={pencil} />
				</button>
			)}

			<div className="mt-4">
				<h6>Games</h6>
				<div className="text-muted mb-4">No Games Selected</div>
			</div>

			<IonModal
				isOpen={editData.biography}
				onDidDismiss={() => {
					setEditData((prev) => ({ ...prev, biography: false }));
				}}
			>
				<div className="container" style={{ padding: '20px 20px' }}>
					<h6 className="text-bold">Edit Profile Details</h6>

					<IonItem>
						<Controller
							control={control}
							name="name"
							rules={{ required: false }}
							defaultValue={name}
							render={({ field: { value, onBlur, onChange } }) => (
								<IonInput
									type="text"
									value={value}
									onIonBlur={onBlur}
									onInput={(e) => {
										onChange(e);
										onChangeInputHandler(e);
									}}
									onIonChange={onChange}
									placeholder="Full Name"
									name="name"
								/>
							)}
						/>
					</IonItem>
					<IonItem>
						<Controller
							control={control}
							name="biography"
							rules={{ required: false }}
							defaultValue={biography.rawvalue}
							render={({ field: { value, onBlur, onChange } }) => (
								<IonTextarea
									value={value}
									onIonBlur={onBlur}
									onInput={(e) => {
										onChange(e);
										onChangeInputHandler(e);
									}}
									onIonChange={onChangeInputHandler}
									placeholder="Biography"
									name="biography"
								/>
							)}
						/>
					</IonItem>

					<div className="mt-3">
						<IonButton expand="block" type="submit" class="w-100 fixed-button" onClick={submitForm}>
							Save
						</IonButton>
					</div>
				</div>
			</IonModal>

			<IonModal
				isOpen={editData.profile_image}
				onDidDismiss={() => {
					setEditData((prev) => ({ ...prev, profile_image: false }));
				}}
			>
				<div className="container" style={{ padding: '20px 20px' }}>
					<IonButton expand="block" type="submit" class="w-100 fixed-button">
						Upload Profile Picture
						<input type="file" name="profile_image" onChange={onChangeImageHandler} />
					</IonButton>
				</div>
			</IonModal>

			<IonModal
				isOpen={editData.cover_image}
				onDidDismiss={() => {
					setEditData((prev) => ({ ...prev, cover_image: false }));
				}}
			>
				<div className="container" style={{ padding: '20px 20px' }}>
					<IonButton expand="block" type="submit" class="w-100 fixed-button">
						Upload Cover Picture
						<input type="file" name="cover_image" onChange={onChangeImageHandler} />
					</IonButton>
				</div>
			</IonModal>
		</PageLayout>
	);
};

export default Profile;
