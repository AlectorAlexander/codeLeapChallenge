import React from 'react';
import './App.css';
import MainPage from './pages/MainPage';
import YourName from './components/YourName';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {

	return (
		<MainPage className='App'>
			<YourName />
		</MainPage>
	);
}

export default App;
