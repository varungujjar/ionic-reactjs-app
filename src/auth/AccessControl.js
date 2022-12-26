import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PageLayout from '../components/Layout/PageLayout';

const AccessControl = ({ children }) => {
	let history = useHistory();
	const { storeAuth } = useSelector((state) => {
		return state;
	});

	useEffect(() => {
		if (!storeAuth) {
			history.push('/page/login');
		}
	}, [storeAuth]);

	if (storeAuth) {
		return children;
	}
};

export default AccessControl;
