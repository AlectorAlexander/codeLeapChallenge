import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { delete_post, insert_post } from '../redux/actions';
import { getPosts } from '../services/BDrequests';

function use404() {
	const [response, setResponse] = useState('');
	const posts = useSelector(({userReducer}) => userReducer.posts);
	const dispatch = useDispatch();

	useEffect(() => {
		async function fetchData() {
			posts.forEach(p => {
				dispatch(delete_post(p.id));
			});
			try {
				const { results } = await getPosts();
				results.forEach((post) => {
					dispatch(insert_post(post));
				});
				setResponse('Success');
			} catch (error) {
				setResponse('Error');
			}
		}
		fetchData();
	}, []);

	return { response };
}

export default use404;
