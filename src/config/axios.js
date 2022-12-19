import axios from 'axios';
import { config } from './config';
// const axios = require('axios').default;

let api = axios.create({
	baseURL: config.baseUrl,
	params: {
		option: 'com_ajax',
		group: 'system',
		plugin: 'ajax',
		format: 'json',
	},
});

//Reserved for future to catch all errors in one placec
// api.interceptors.response.use(
// 	(response) => response,
// 	(error) => {
// 		// console.log(error);
// 		// whatever you want to do with the error
// 		throw error;
// 	}
// );

export default api;
