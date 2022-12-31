import ButtonLink from '../Form/ButtonLink';

const PageSection = ({ title, link }) => {
	return (
		<div className="d-flex align-items-center mt-3">
			<div>
				<h5 className="text-xl text-cyan-300 text-uppercase">{title}</h5>
			</div>

			{link && (
				<div className="ms-auto">
					<ButtonLink link={link}>View All</ButtonLink>
				</div>
			)}
		</div>
	);
};

export default PageSection;
