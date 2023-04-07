import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { Provider as Redux } from 'react-redux';
import store from './redux';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<Redux store={ store } >
			<App />
		</Redux>
	</React.StrictMode>,
);
