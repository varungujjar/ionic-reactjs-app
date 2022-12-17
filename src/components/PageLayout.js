import './OwlCarousel.css';
import PageSubTabs from './PageSubTabs';
import PropTypes from 'prop-types';

import {
	IonButtons,
	IonRefresherContent,
	IonRefresher,
	IonContent,
	IonHeader,
	IonMenuButton,
	IonPage,
	IonTitle,
	IonToolbar,
} from '@ionic/react';

const PageLayout = ({
	title,
	tabShow,
	tabItems,
	tabDefaultTitle,
	tabDefaultTitleValue,
	tabActiveValue,
	tabIsLoading,
	tabOnChange,
	showPageRefresh,
	onPageRefresh,
	children,
}) => {
	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonButtons slot="start">
						<IonMenuButton />
					</IonButtons>
					{/* <IonIcon icon={documentText}></IonIcon> */}
					<IonTitle>{title}</IonTitle>
				</IonToolbar>
				{tabShow && (
					<PageSubTabs
						tabItems={tabItems}
						tabDefaultTitle={tabDefaultTitle}
						tabDefaultTitleValue={tabDefaultTitleValue}
						tabActiveValue={tabActiveValue}
						tabIsLoading={tabIsLoading}
						tabOnChange={(value) => tabOnChange(value)}
					/>
				)}
			</IonHeader>
			<IonContent fullscreen>
				{showPageRefresh && (
					<IonRefresher slot="fixed" onIonRefresh={onPageRefresh}>
						<IonRefresherContent></IonRefresherContent>
					</IonRefresher>
				)}
				<div className="container" style={{ padding: '0px 20px' }}>
					{children ? children : null}
				</div>
			</IonContent>
		</IonPage>
	);
};

PageLayout.propTypes = {
	title: PropTypes.string,
	icon: PropTypes.string,
	tabShow: PropTypes.bool,
	tabItems: PropTypes.object,
	tabDefaultTitle: PropTypes.string,
	tabDefaultTitleValue: PropTypes.string,
	tabActiveValue: PropTypes.string,
	tabIsLoading: PropTypes.bool,
	showPageRefresh: PropTypes.bool,
	authEnabled: PropTypes.bool,
	authState: PropTypes.bool,
	tabOnChange: PropTypes.func,
	onPageRefresh: PropTypes.func,
	children: PropTypes.element,
};

PageLayout.defaultProps = {
	title: '',
	icon: '',
	tabShow: false,
	tabItems: {},
	tabDefaultTitle: '',
	tabDefaultTitleValue: null,
	tabActiveValue: null,
	tabIsLoading: false,
	showPageRefresh: false,
	authEnabled: false,
	authState: false,
};

export default PageLayout;
