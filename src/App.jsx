import React from 'react';
import './App.css';
import MainPage from './pages/MainPage';
import YourName from './components/YourName';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector } from 'react-redux';
import YourPosts from './components/YourPosts';


function App() {
	const username = useSelector(({userReducer}) => userReducer.username);
	

 
	return (
		<MainPage className='App'>
			{username === '' && <YourName />}
			{username !== '' ? <YourPosts /> : ''}
		</MainPage>
	);
}

export default App;
