import { IonReactRouter } from '@ionic/react-router';
import { IonRouterOutlet, IonSplitPane } from '@ionic/react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { API } from '../config/config';

import PageMenu from '../components/Menu/PageMenu';
import PageTabs from '../components/Tabs/PageTabs';

import Home from '../pages/Home';
import Static from '../pages/Static';
import Article from '../pages/Article';
import Articles from '../pages/Articles';
import Videos from '../pages/Videos';
import Contact from '../pages/Contact';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Profile from '../pages/Profile';
import Bookmarks from '../pages/Bookmarks';

const Routes = () => {
	const { storeAuth } = useSelector((state) => {
		return state;
	});

	return (
		<IonReactRouter>
			<IonSplitPane>
				<PageMenu />
				<PageTabs>
					<IonRouterOutlet id="main" ionPage>
						{/* Using of <Switch> to fix proper unmount when transitioning between pages.Known Bug since Ionic V5 */}
						<Switch>
							<Route path="/" exact>
								<Redirect to={API.home.url} />
							</Route>
							<Route path={API.home.url} exact>
								<Home />
							</Route>
							<Route path={API.aboutus.url} exact>
								<Static id={API.aboutus.id} />
							</Route>

							<Route path={API.community.url} exact>
								<Static id={API.community.id} />
							</Route>
							<Route path={API.privacy.url} exact>
								<Static id={API.privacy.id} />
							</Route>
							<Route path={API.terms.url} exact>
								<Static id={API.terms.id} />
							</Route>
							<Route path={API.contact.url} exact component={Contact} />

							<Route path={API.news.url} exact>
								<Articles id={API.news.id} title={API.news.title} />
							</Route>

							<Route path={`${API.news.url}/:id`} exact component={Article} />

							<Route path={API.articles.url} exact>
								<Articles id={API.articles.id} title={API.articles.title} />
							</Route>

							<Route path={`${API.articles.url}/:id`} exact component={Article} />

							<Route path={API.videos.url} exact component={Videos} />

							<Route path={API.register.url} exact component={Register} />
							<Route path={API.login.url} exact component={Login} />
							<Route
								exact
								path={API.bookmarks.url}
								render={() => {
									return storeAuth.isLoggedin ? <Bookmarks /> : <Redirect exact to={API.login.url} />;
								}}
							/>
							<Route path={`${API.home.url}/:id`} exact component={Profile} />

							<Route
								exact
								path={API.profile.url}
								render={() => {
									return storeAuth.isLoggedin ? <Profile /> : <Redirect exact to={API.login.url} />;
								}}
							/>
						</Switch>
					</IonRouterOutlet>
				</PageTabs>
			</IonSplitPane>
		</IonReactRouter>
	);
};

export default Routes;
