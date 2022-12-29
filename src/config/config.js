import {
	bookmarkOutline,
	documentTextOutline,
	personOutline,
	newspaperOutline,
	homeOutline,
	documentOutline,
	filmOutline,
} from 'ionicons/icons';

export const API = {
	timeOutDelay: 500,
	baseUrl: 'https://www.bigbangsports.gg/beta/',
	home: {
		title: 'Home',
		url: '/page/home',
	},
	articles: {
		title: 'Articles',
		type: 'articles',
		alias: 'articles',
		url: '/page/articles',
		id: 11,
	},
	news: {
		title: 'News',
		type: 'articles',
		alias: 'news',
		url: '/page/news',
		id: 8,
	},
	aboutus: {
		title: 'About Us',
		type: 'articles',
		url: '/page/aboutus',
		id: 1,
	},
	community: {
		title: 'Community',
		type: 'articles',
		url: '/page/community',
		id: 3,
	},
	privacy: {
		title: 'Privacy Policy',
		type: 'articles',
		url: '/page/privacy-policy',
		id: 19,
	},
	terms: {
		title: 'Terms & Conditions',
		type: 'articles',
		url: '/page/terms-conditions',
		id: 20,
	},
	videos: {
		title: 'Videos',
		type: 'videos',
		url: '/page/videos',
	},
	profiles: {
		title: 'Profiles',
		type: 'users',
	},
	profile: {
		title: 'Profile',
		type: 'profile',
		url: '/page/profile',
	},
	contact: {
		title: 'Contact Us',
		type: 'contact',
		url: '/page/contact-us',
	},
	login: {
		title: 'Sign-In',
		type: 'login',
		url: '/page/login',
		afterLogin: '/page/profile',
		afterLogout: '/page/home',
	},
	register: {
		title: 'Create an Account',
		type: 'register',
		url: '/page/register',
		afterRegister: '/page/login',
	},
	bookmarks: {
		title: 'Bookmarks',
		type: 'bookmark',
		url: '/page/bookmarks',
	},
};

export const MENU = [
	{
		title: API.home.title,
		url: API.home.url,
		iosIcon: homeOutline,
	},

	{
		title: 'Community',
		break: true,
	},

	{
		title: API.community.title,
		url: API.community.url,
		iosIcon: newspaperOutline,
	},

	{
		title: API.articles.title,
		url: API.articles.url,
		iosIcon: documentOutline,
	},

	{
		title: API.videos.title,
		url: API.videos.url,
		iosIcon: filmOutline,
	},

	{
		title: API.news.title,
		url: API.news.url,
		iosIcon: newspaperOutline,
	},

	{
		title: 'Information',
		break: true,
	},

	{
		title: API.aboutus.title,
		url: API.aboutus.url,
		iosIcon: newspaperOutline,
	},

	{
		title: API.contact.title,
		url: API.contact.url,
		iosIcon: documentTextOutline,
	},

	{
		title: API.privacy.title,
		url: API.privacy.url,
		iosIcon: newspaperOutline,
	},

	{
		title: API.terms.title,
		url: API.terms.url,
		iosIcon: newspaperOutline,
	},
];

export const TABS = [
	{
		name: 'Home',
		path: API.home.url,
		icon: homeOutline,
	},

	{
		name: 'Bookmarks',
		path: API.bookmarks.url,
		icon: bookmarkOutline,
	},

	{
		name: 'Profile',
		path: API.profile.url,
		icon: personOutline,
	},
];

export const REDUX_ACTIONS = {
	showNotification: 'SHOW_NOTIFICATION',
	clearNotification: 'CLEAR_NOTIFICATION',
};

export const CAROUSEL_OPTIONS = {
	items: 1,
	stagePadding: 50,
	margin: 20,
	autoplay: false,
	slideBy: 1,
	dots: true,
	//   navText:["<div className='nav-btn prev-slide'></div>","<div className='nav-btn next-slide'></div>"],
	//   rewind: false,
	//   dotsEach: true,
	//   dotData: true
	responsive: {
		0: {
			items: 1,
		},
		480: {
			items: 1,
		},
		768: {
			items: 2,
		},
	},
};

export const LOADER_OPTIONS = {
	translucent: true,
	spinner: 'crescent',
	showBackdrop: true,
};

// Storage Example
// https://github.com/alanmontgomery/ionic-storage-example
