import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { Provider as Redux } from 'react-redux';
import store from './redux';

ReactDOM.render(
	<Redux store={ store } >
		<App />
	</Redux>,
	document.getElementById('root')
);
