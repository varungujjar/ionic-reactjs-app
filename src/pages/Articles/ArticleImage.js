import { config } from '../../config/config';

const ArticleImage = ({ images, alt }) => {
	const imagesDecode = JSON.parse(images);
	const image_src = imagesDecode.image_intro ? config.baseUrl + imagesDecode.image_intro : './assets/images/article-no-image.png';
	return <img src={image_src} alt={alt} className="articleImage" />;
};

export default ArticleImage;
