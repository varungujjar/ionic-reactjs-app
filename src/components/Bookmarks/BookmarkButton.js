import { useEffect, useState } from 'react';
import { IonButton } from '@ionic/react';
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
	}, [item.type, active, userSession]);

	return (
		<IonButton size="small" type="button" class={`bookmark-button ${active ? 'active' : ''}`} onClick={onClickHandler}>
			Star
		</IonButton>
	);
};

BookmarkButton.defaultProps = {
	type: '',
	id: null,
};

export default BookmarkButton;
