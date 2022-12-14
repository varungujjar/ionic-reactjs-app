import {
	IonButtons,
	IonBackButton,
	IonRefresherContent,
	IonRefresher,
	IonContent,
	IonHeader,
	IonMenuButton,
	IonPage,
	IonTitle,
	IonToolbar,
} from '@ionic/react';
import LayoutSegment from './LayoutSegment';

const Layout = ({
	menuButton,
	title,
	tabEnable,
	tabItems,
	tabOnChange,
	enablePageRefresh,
	onPageRefresh,
	children,
}) => {
	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonButtons slot="start">{menuButton ? <IonMenuButton /> : <IonBackButton />}</IonButtons>
					<IonTitle>{title}</IonTitle>
				</IonToolbar>
				{tabEnable && <LayoutSegment items={tabItems} onChange={(id) => tabOnChange(id)} />}
			</IonHeader>
			<IonContent fullscreen>
				{enablePageRefresh && (
					<IonRefresher slot="fixed" onIonRefresh={onPageRefresh}>
						<IonRefresherContent></IonRefresherContent>
					</IonRefresher>
				)}
				<div className="container text-base h-full" style={{ padding: '0px 20px' }}>
					{children && children}
				</div>
			</IonContent>
		</IonPage>
	);
};

Layout.defaultProps = {
	menuButton: false,
	title: '',
	icon: '',
	tabEnable: false,
	tabItems: [],
	enablePageRefresh: false,
	authEnabled: false,
	authState: false,
};

export default Layout;
