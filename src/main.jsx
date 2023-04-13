import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { Provider as Redux } from 'react-redux';
import store from './redux';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);
root.render(
	<Redux store={ store } >
		<App />
	</Redux>,
);
