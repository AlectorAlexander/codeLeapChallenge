import React from 'react';
import PropTypes from 'prop-types';
import '../styles/main.css';

const MainPage = ({ children }) => {
	return (
		<div className='MainPage'>
			<h1>Welcome to MainPage Component!</h1>
			{children}
			<p>This is a functional component in React.</p>
		</div>
	);
};

MainPage.propTypes = {
	children: PropTypes.node,
};

export default MainPage;
