import { Fancybox } from '@fancyapps/ui';
import Card from '../Card';
import BookmarkButton from '../Bookmarks/BookmarkButton';

const VideoCard = ({ data }) => {
	const { id, title, alias, youtubelink, duration } = data;

	const PlayVideo = (youtubelink) => {
		const videoSrc = `https://www.youtube.com/watch?v=${youtubelink}&autoplay=1&color=white&modestbranding=1`;
		Fancybox.show([
			{
				src: videoSrc,
				type: 'youtube',
			},
		]);
	};

	const thumbnail = `https://i3.ytimg.com/vi/${youtubelink}/hqdefault.jpg`;

	return (
		<Card>
			<BookmarkButton item={{ type: 'videos', id: id }} />
			<div onClick={() => PlayVideo(youtubelink)}>
				<img src={thumbnail} alt={alias} />

				<div className="card-body">
					<h5 className="card-title">{title}</h5>
					<p className="card-text">{duration}</p>
					<p className="card-text">Some quick example text to build on the card title and make up the</p>
				</div>
			</div>
		</Card>
	);
};

export default VideoCard;
