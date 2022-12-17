import { useEffect } from 'react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route, Switch } from 'react-router-dom';

import { IonApp, IonRouterOutlet, IonSplitPane, setupIonicReact } from '@ionic/react';
import { RenderToast } from './components/Toast';
// import { Storage, Drivers } from "@ionic/storage";
import { useSelector, useDispatch } from 'react-redux';
import { clearNotificationAction } from './redux/actions';

import PageMenu from './components/PageMenu';
import PageTabs from './components/PageTabs';

import Home from './pages/Home';
import Static from './pages/Static';
import Article from './pages/Article';
import Articles from './pages/Articles';
import Videos from './pages/Videos';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './auth/Register';
import Profile from './pages/Profile';
import Bookmarks from './pages/Bookmarks';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Plugins CSS  */
import './boostrap/bootstrap.css';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import '@fancyapps/ui/dist/fancybox.css';

setupIonicReact();

const App = () => {
	const reduxDispatch = useDispatch();
	const { storeNotifications, storeAuth } = useSelector((state) => {
		return state;
	});

	useEffect(() => {}, [storeAuth.isLoggedin]);

	return (
		<>
			{storeNotifications && (
				<RenderToast
					message={storeNotifications.message}
					type={storeNotifications.type}
					onDismiss={() => {
						reduxDispatch(clearNotificationAction());
					}}
				/>
			)}
			<IonApp>
				<IonReactRouter>
					<IonSplitPane>
						<PageMenu />
						<PageTabs>
							<IonRouterOutlet id="main" ionPage>
								{/* Using of <Switch> to fix proper unmount when transitioning between pages.Known Bug since Ionic V5 */}
								<Switch>
									<Route path="/" exact>
										<Redirect to="/page/home" />
									</Route>
									<Route path="/page/home" exact>
										<Home />
									</Route>
									<Route path="/page/aboutus" exact>
										<Static id="1" />
									</Route>
									<Route path="/page/leadership" exact>
										<Static id="49" />
									</Route>
									<Route path="/page/community" exact>
										<Static id="3" />
									</Route>
									<Route path="/page/privacy" exact>
										<Static id="19" />
									</Route>
									<Route path="/page/terms" exact>
										<Static id="20" />
									</Route>
									<Route path="/page/contact" exact component={Contact} />
									<Route path="/page/news" exact>
										<Articles catRef="news" />
									</Route>
									<Route path="/page/news/:id" exact component={Article} />
									<Route path="/page/articles" exact>
										<Articles catRef="articles" />
									</Route>
									<Route path="/page/articles/:id" exact component={Article} />
									<Route path="/page/videos" exact component={Videos} />
									{/* <Route path="/page/gamer/:id" exact component={Gamer} /> */}
									<Route path="/page/register" exact component={Register} />
									<Route path="/page/login" exact component={Login} />
									<Route path="/page/gamer/:id" exact component={Profile} />
									<Route
										exact
										path="/page/bookmarks"
										render={() => {
											return storeAuth.isLoggedin ? (
												<Bookmarks />
											) : (
												<Redirect exact to="/page/login" />
											);
										}}
									/>

									<Route
										exact
										path="/page/profile"
										render={() => {
											return storeAuth.isLoggedin ? (
												<Profile />
											) : (
												<Redirect exact to="/page/login" />
											);
										}}
									/>
								</Switch>
							</IonRouterOutlet>
						</PageTabs>
					</IonSplitPane>
				</IonReactRouter>
			</IonApp>
		</>
	);
};

export default App;
