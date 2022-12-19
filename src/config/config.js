import { documentText } from 'ionicons/icons';

export const config = {
	home: {
		name: 'Welcome',
		icon: documentText,
		path: '/page/home',
	},
	news: {
		type: 'articles',
		catid: 8,
		name: 'News',
		icon: documentText,
		path: '/page/news',
	},
	videos: {
		type: 'videos',
		name: 'Videos',
		icon: documentText,
		path: '/page/videos',
	},
	articles: {
		type: 'articles',
		catid: 11,
		name: 'Articles',
		icon: documentText,
		path: '/page/articles',
	},
	users: {
		type: 'users',
		name: 'Users',
		icon: documentText,
		path: '/page/users',
	},
	bookmarks: {
		type: 'bookmarks',
		name: 'Bookmarks',
		icon: documentText,
		path: '/page/bookmarks',
	},
	profile: {
		type: 'profile',
		name: 'Profile',
		icon: documentText,
		path: '/page/profile',
	},
	login: {
		type: 'login',
		name: 'Login',
		icon: documentText,
		path: '/page/login',
	},
	register: {
		type: 'register',
		name: 'Register',
		icon: documentText,
		path: '/page/register',
	},
	aboutus: { type: 'articles', id: 1 },
	leadership: { type: 'articles', id: 49 },
	community: { type: 'articles', id: 3 },
	privacy: { type: 'articles', id: 19 },
	terms: { type: 'articles', id: 20 },
	baseUrl: 'https://www.bigbangsports.gg/beta/',
	// baseUrl: "http://localhost:8888/esports_web/",
	LoaderOptions: {
		translucent: true,
		spinner: 'crescent',
		showBackdrop: true,
	},
	videocarousel: {
		items: 1,
		stagePadding: 50,
		margin: 20,
		autoplay: false,
		slideBy: 1,
		dots: true,
	},
	timeOutDelay: 500,
	showNotification: 'SHOW_NOTIFICATION',
	clearNotification: 'CLEAR_NOTIFICATION',
};

// Storage Example
// https://github.com/alanmontgomery/ionic-storage-example

//Owl Options Template
// const options = {
//   items: 1,
//   stagePadding:50,
//   nav: true,
//   margin:10,
//   navText:["<div className='nav-btn prev-slide'></div>","<div className='nav-btn next-slide'></div>"],
//   rewind: false,
//   autoplay: false,
//   slideBy: 1,
//   dots: true,
//   dotsEach: true,
//   dotData: true
// };
