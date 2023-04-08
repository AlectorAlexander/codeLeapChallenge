import React from 'react';
import PropTypes from 'prop-types';
import '../styles/main.css';

const MainPage = ({ children }) => {
	return (
		<div className='MainPage'>
			{children}
		</div>
	);
};

MainPage.propTypes = {
	children: PropTypes.node,
};

export default MainPage;
