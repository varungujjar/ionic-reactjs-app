import { Fancybox } from '@fancyapps/ui';
import { Truncate } from '../../helpers/Util';
import Card from '../Card';
import BookmarkButton from '../Bookmarks/BookmarkButton';

const VideoCard = ({ data, list }) => {
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
				<img src={thumbnail} alt={alias} className="h-32  object-cover w-full" />

				<div className="p-4">
					<h5 className="text-xl font-bold">{list ? title : Truncate(title, 28)}</h5>
					<p>{duration}</p>
					<p className="text-slate-400">Some quick example text to build on the card title and make up the</p>
				</div>
			</div>
		</Card>
	);
};

VideoCard.defaultProps = {
	data: [],
	list: false,
};

export default VideoCard;
