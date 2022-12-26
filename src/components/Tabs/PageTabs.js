import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { IonIcon, IonLabel, IonTabs, IonTabBar, IonTabButton } from '@ionic/react';
import { TABS } from '../../config/config';

const PageTabs = ({ children }) => {
	const history = useHistory();
	const [selectTab, setSelectTab] = useState(null);

	useEffect(() => {
		setSelectTab(history.location.pathname);
	}, [history.location.pathname]);

	const setTab = (tabPath) => {
		setSelectTab(tabPath);
		history.push(tabPath);
	};

	const handleClick = (event) => {
		setTab(event.detail['tab']);
	};

	return (
		<IonTabs>
			{children}
			<IonTabBar slot="bottom" onIonTabsDidChange={handleClick} select="bookmarks">
				{TABS.map((tab) => {
					return (
						<IonTabButton tab={tab.path} selected={selectTab === tab.path ? true : false} key={tab.name}>
							<IonIcon icon={tab.icon} />
							<IonLabel>{tab.name}</IonLabel>
						</IonTabButton>
					);
				})}
			</IonTabBar>
		</IonTabs>
	);
};

export default PageTabs;
