import { useEffect, useState } from 'react';
import { IonButton, IonIcon } from '@ionic/react';
import { starOutline } from 'ionicons/icons';
import { useProfile } from '../../hooks/useProfile';
import { useDispatch, useSelector } from 'react-redux';
import { showNotificationAction, refreshSessionAction } from '../../redux/actions';
import { API } from '../../config/config';
import serviceApi from '../../config/axios';
import './BookmarkButton.css';

const BookmarkButton = ({ item }) => {
	const reduxDispatch = useDispatch();
	// const { type, id } = item;
	const { articles, news, videos, session, id, loading } = useProfile();
	const [active, setActive] = useState(false);

	const onClickHandler = () => {
		submitBookmark(item.type, item.id);
	};

	const { userSession } = useSelector((state) => {
		return state;
	});

	const submitBookmark = async (contentType, contentId) => {
		await serviceApi
			.post(null, null, {
				params: {
					type: API.bookmarks.type,
					uid: id,
					session: session,
					content: contentType,
					id: contentId,
				},
			})
			.then((response) => {
				reduxDispatch(showNotificationAction(response.data));
				session && reduxDispatch(refreshSessionAction({ session: session, id: id }));
				session && setActive(!active);
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

	useEffect(() => {
		setActive(false);
		switch (item.type) {
			case 'articles':
				if (articles && articles.filter((_item) => _item.id === item.id).length) {
					setActive(true);
				}

			case 'news':
				if (news && news.filter((_item) => _item.id === item.id).length) {
					setActive(true);
				}
			case 'videos':
				if (videos && videos.filter((_item) => _item.id === item.id).length) {
					setActive(true);
				}
		}
	}, [item.type, active, userSession, loading]);

	return (
		<button
			size="small"
			type="button"
			className={`h-8 w-8 rounded-full font-bold position-absolute top-4 right-4 ${
				active ? 'bg-amber-400 text-slate-800' : 'bg-slate-600'
			}`}
			onClick={onClickHandler}
		>
			<IonIcon icon={starOutline} />
		</button>
	);
};

BookmarkButton.defaultProps = {
	type: '',
	id: null,
};

export default BookmarkButton;
