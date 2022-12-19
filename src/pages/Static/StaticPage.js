export const StaticPage = ({ data }) => {
	const { title, introtext } = data.data;

	return (
		<>
			<h2 className="mt-3">{title}</h2>

			<div
				className="content-wrapper"
				dangerouslySetInnerHTML={{
					__html: introtext ? introtext : null,
				}}
			/>
		</>
	);
};

export const StaticPagePlaceHolder = () => {
	return (
		<>
			<div className="article-image-full"></div>
			<h2 className="mt-3 placeholder-glow">
				<span className="placeholder col-6"></span>
			</h2>

			<div className="placeholder-glow">
				<span className="placeholder col-7"></span>
				<span className="placeholder col-4"></span>
				<span className="placeholder col-4"></span>
				<span className="placeholder col-6"></span>

				<span className="placeholder col-7"></span>
				<span className="placeholder col-4"></span>
				<span className="placeholder col-4"></span>
				<span className="placeholder col-6"></span>
			</div>
		</>
	);
};
